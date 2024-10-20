import React, { forwardRef } from "react";
import { Props } from "./editor-card";
import CardBase, { CardBaseRef } from "../card-base/custom-card-base";

const CustomEditorCard = forwardRef<CardBaseRef, Props>(function EditorCard(
	{ initialContentProps, mode, root, forwardUpdateContentFn, customEditorCard, ...cardBaseProps },
	cardBaseRef
) {
	return (
		<CardBase {...cardBaseProps} ref={cardBaseRef}>
			{customEditorCard?.render?.({
				initialContentProps,
				mode,
				root,
				forwardUpdateContentFn,
				cardBaseProps,
				cardBaseRef,
			})}
		</CardBase>
	);
});

export default CustomEditorCard;
