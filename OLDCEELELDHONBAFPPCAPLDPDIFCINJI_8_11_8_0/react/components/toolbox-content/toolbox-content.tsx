import React, { useEffect, useState, useMemo, useRef } from "react";
import { AdvancedToolbox } from "@advanced-toolbox/toolbox";
import { ToolboxPluginEmojiPicker, ToolboxPluginEmojiPickerAdapter } from "@advanced-toolbox/plugin-emoji-picker";
import { ToolboxPluginGiphy, ToolboxPluginGiphyAdapter } from "@advanced-toolbox/plugin-giphy";
import { ToolboxPluginSnippetManager } from "@advanced-toolbox/plugin-snippet-manager";
import {
	ToolboxPluginParaphraser,
	ToolboxPluginParaphraserAdapter,
	type ToolboxPluginParaphraserSuggestion,
	type ToolboxPluginParaphraserParaphraseFunction,
} from "@advanced-toolbox/plugin-paraphraser";
import type {
	ToolboxApplyEvent,
	ToolboxConfig,
	ToolboxFocusMode,
	ToolboxTextContext,
	ToolboxRequestResponse,
	ToolboxTextSelectionType,
	ToolboxKeyboardEventDetail,
	ToolboxCompositionEventDetail,
	ToolboxMouseEventDetail,
} from "@advanced-toolbox/types";
import { shouldPreventKeyboardEventDefault, bindCompositionFlow } from "@advanced-toolbox/utils";
import { elementFactory } from "../../index";
import { EnvironmentAdapter } from "../../../common/environmentAdapter";
import { classes } from "../../../common/utils";
import type { SynonymSet } from "../../../background/synonyms";
import type { RephraseObject } from "../../../core/Checker";

export interface Props {
	config: ToolboxConfig;
	textContext: ToolboxTextContext;
	showRuleId: boolean;
	textfieldElement: HTMLElement;
	isIdle: boolean;
	hasDarkBackground: boolean;
	focusMode: ToolboxFocusMode | undefined;
	close: () => void;
	onApply: (event: ToolboxApplyEvent) => void;
	setTextHighlight: (type: ToolboxTextSelectionType, range: [number, number]) => void;
	removeTextHighlight: () => void;
	loadSentenceParaphrasings: (
		subject: string,
		mode: string | undefined
	) => Promise<Array<Pick<RephraseObject, "uuid" | "text">>>;
	loadSubSentenceParaphrasings: (subject: string, start: number, end: number) => Promise<SynonymSet[]>;
}

const LTCompToolboxContent = elementFactory("comp-toolbox-content");

const createParaphraserAdapterConfig = (
	options: Pick<Props, "loadSentenceParaphrasings" | "loadSubSentenceParaphrasings">
) => {
	const sentence: ToolboxPluginParaphraserParaphraseFunction = (config) => {
		const request = options.loadSentenceParaphrasings(config.subject, config.context.mode);

		return {
			getData: async () => {
				const result: ToolboxRequestResponse<ToolboxPluginParaphraserSuggestion[]> = {
					status: "error",
					data: [],
				};

				try {
					const rephrases = await request;
					result.data = rephrases.map(({ uuid, text: to }) => ({ uuid, to }));
					result.status = "success";
				} catch (err) {
					console.error("Failed to load sentence rewritings for the Toolbox.", err);
				}

				return result;
			},
			abort: () => EnvironmentAdapter.abortPhraseRequests("rewrite"),
		};
	};
	const subSentence: ToolboxPluginParaphraserParaphraseFunction = (config) => {
		const [start, end] = config.context.range;
		const request = options.loadSubSentenceParaphrasings(config.subject, start, end);

		return {
			getData: async () => {
				const result: ToolboxRequestResponse<ToolboxPluginParaphraserSuggestion[]> = {
					status: "error",
					data: [],
				};

				try {
					const rephrases = await request;
					result.data = rephrases.flatMap(({ synonyms }) =>
						synonyms.map(({ word }, i) => ({
							uuid: `${word}-${i}`,
							to: word,
						}))
					);
					result.status = "success";
				} catch (err) {
					console.error("Failed to load sub-sentence paraphrasings for the Toolbox.", err);
				}

				return result;
			},
			abort: () => EnvironmentAdapter.abortSynonymsRequest(),
		};
	};
	const customSentenceModes = [
		{
			order: 1,
			sentenceParaphraseMode: "casual",
		},
		{
			order: 2,
			sentenceParaphraseMode: "formal",
		},
	];

	return { phrase: subSentence, word: subSentence, sentence, customSentenceModes };
};

const usePropagateKeyboardEvents = (toolbox: AdvancedToolbox | null, textField: HTMLElement) => {
	useEffect(() => {
		if (!toolbox) {
			return;
		}

		let timeoutId: number | undefined;
		const handleKeyUpOnce = (e: KeyboardEvent) => {
			e.stopImmediatePropagation();
			clearTimeout(timeoutId);
			timeoutId = undefined;
		};
		const unbindKeyUpOnceListener = () => {
			textField.ownerDocument.removeEventListener("keyup", handleKeyUp, { capture: true });
			timeoutId = undefined;
		};
		const handleKeyDown = (e: KeyboardEvent) => {
			// https://bugzil.la/354358
			if (e.isComposing || e.keyCode === 229) {
				return;
			}

			e.stopImmediatePropagation();
			if (shouldPreventKeyboardEventDefault(e)) {
				e.preventDefault();
			}

			const detail: ToolboxKeyboardEventDetail = {
				isTrusted: e.isTrusted,
				key: e.key,
				metaKey: e.metaKey,
				shiftKey: e.shiftKey,
				ctrlKey: e.ctrlKey,
				view: e.view,
			};
			toolbox.emitKeyboardEvent(detail);

			if (e.key === "Escape") {
				textField.ownerDocument.addEventListener("keyup", handleKeyUpOnce, { once: true, capture: true });
				timeoutId = self.setTimeout(() => unbindKeyUpOnceListener());
			}
		};
		const handleKeyUp = (e: KeyboardEvent) => {
			e.stopImmediatePropagation();
			e.preventDefault();
		};
		const unbindCompositionFlow = bindCompositionFlow(textField, (partialChar) => {
			const detail: ToolboxCompositionEventDetail = { partialChar };

			toolbox.emitCompositionEvent(detail);
		});
		textField.ownerDocument.addEventListener("keydown", handleKeyDown, true);
		textField.ownerDocument.addEventListener("keyup", handleKeyUp, true);

		return () => {
			unbindCompositionFlow();
			textField.ownerDocument.removeEventListener("keydown", handleKeyDown, true);
			textField.ownerDocument.removeEventListener("keyup", handleKeyUp, true);
		};
	}, [toolbox, textField]);
};

const collectMouseEventDetail = (e: MouseEvent) => {
	const detail: ToolboxMouseEventDetail = {
		button: e.button,
		target: e.target,
		x: e.x,
		y: e.y,
	};
	return detail;
};

const useFencePropagateAndMouseEvents = (
	toolbox: AdvancedToolbox | null,
	toolboxContent: React.RefObject<HTMLElement>
) => {
	useEffect(() => {
		if (!toolbox || !toolboxContent.current) {
			return;
		}

		const mount = toolboxContent.current;
		const doc = mount.ownerDocument;
		const fenceEvent = (e: Event) => {
			const target = e.target as HTMLElement | null;

			if (mount.contains(target)) {
				e.preventDefault();
				e.stopImmediatePropagation();
				return true;
			}
			return false;
		};
		const handleMouseDown = (e: MouseEvent) => {
			if (fenceEvent(e)) {
				toolbox.emitMouseEvent("mousedown", collectMouseEventDetail(e));
			}
		};
		const handleMouseMove = (e: MouseEvent) => {
			if (fenceEvent(e)) {
				toolbox.emitMouseEvent("mousemove", collectMouseEventDetail(e));
			}
		};
		const handleMouseUp = (e: MouseEvent) => {
			if (fenceEvent(e)) {
				toolbox.emitMouseEvent("mouseup", collectMouseEventDetail(e));
			}
		};

		doc.addEventListener("mousedown", handleMouseDown, true);
		doc.addEventListener("mousemove", handleMouseMove, true);
		doc.addEventListener("mouseup", handleMouseUp, true);
		doc.addEventListener("click", fenceEvent, true);

		return () => {
			doc.removeEventListener("mousedown", handleMouseDown, true);
			doc.removeEventListener("mousemove", handleMouseMove, true);
			doc.removeEventListener("mouseup", handleMouseUp, true);
			doc.removeEventListener("click", fenceEvent, true);
		};
	}, [toolbox, toolboxContent]);
};

const ToolboxContent: React.FC<Props> = ({
	config,
	textContext,
	textfieldElement,
	hasDarkBackground,
	focusMode,
	isIdle,
	close,
	onApply,
	setTextHighlight,
	removeTextHighlight,
	loadSentenceParaphrasings,
	loadSubSentenceParaphrasings,
}) => {
	const toolboxContent = useRef<HTMLElement>(null);
	const [toolbox, setToolbox] = useState<AdvancedToolbox | null>(null);
	const [view, setView] = useState<React.FunctionComponentElement<unknown> | null>(null);
	const paraphraserAdapterConfig = useMemo(
		() =>
			createParaphraserAdapterConfig({
				loadSentenceParaphrasings,
				loadSubSentenceParaphrasings,
			}),
		[loadSentenceParaphrasings, loadSubSentenceParaphrasings]
	);

	useEffect(() => {
		const emojiDataBaseUrl = EnvironmentAdapter.getURL(process.env.EMOJI_DATA_BASE_PATH ?? "/");
		const emojiLocales = (() => {
			try {
				const locales = process.env.EMOJI_LOCALES ?? [];

				if (!Array.isArray(locales)) {
					throw new Error(
						`Expected 'EMOJI_LOCALES' to be an array; retrieved ${typeof process.env.EMOJI_LOCALES}.`
					);
				}

				return locales;
			} catch (e) {
				console.error("Failed to retrieve emoji locales.", e);

				return [];
			}
		})();

		ToolboxPluginEmojiPicker.addAdapter(
			new ToolboxPluginEmojiPickerAdapter({
				emojiDataBaseUrl,
				emojiLocales,
			})
		);
		ToolboxPluginParaphraser.addAdapter(new ToolboxPluginParaphraserAdapter(paraphraserAdapterConfig));
		ToolboxPluginGiphy.addAdapter(new ToolboxPluginGiphyAdapter({ apiKey: "sXGNsG8jHYVfhNuNZ0L5oUqUKTPpqgHd" }));
		const instance = AdvancedToolbox.instantiate({
			...config,
			plugins: [
				ToolboxPluginEmojiPicker,
				ToolboxPluginParaphraser,
				ToolboxPluginGiphy,
				ToolboxPluginSnippetManager,
			],
		});
		const toolboxView = instance.createView({
			context: textContext,
			colorScheme: hasDarkBackground ? "dark" : "light",
			focusMode,
			close,
			onApply,
			setTextHighlight,
			removeTextHighlight,
		});
		setView(toolboxView);
		setToolbox(instance);

		return () => {
			removeTextHighlight();
			setToolbox(null);
			setView(null);
		};
	}, [
		config,
		close,
		onApply,
		setTextHighlight,
		removeTextHighlight,
		paraphraserAdapterConfig,
		textfieldElement,
		hasDarkBackground,
		textContext,
		focusMode,
	]);

	usePropagateKeyboardEvents(toolbox, textfieldElement);
	useFencePropagateAndMouseEvents(toolbox, toolboxContent);

	return (
		<LTCompToolboxContent className={classes(isIdle && "lt-toolbox-content--is-idle")} ref={toolboxContent}>
			{view}
		</LTCompToolboxContent>
	);
};

export default ToolboxContent;
