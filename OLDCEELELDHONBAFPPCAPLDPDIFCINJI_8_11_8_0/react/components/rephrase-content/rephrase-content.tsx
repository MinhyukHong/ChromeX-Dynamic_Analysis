import React from "react";
import { elementFactory } from "../../index";
import ParaphrasingContent from "../paraphrasing-content/paraphrasing-content";
import type { ParaphrasingContentData } from "../paraphrasing-content/types";
import SynonymsContent, { type Props as SynonymsContentProps } from "../synonyms-content/synonyms-content";
import type { SentenceRange } from "../../../core/Checker";
import { PhrasalContentData } from "../../../content/cardController";

export type Props = {
	sentenceRanges: SentenceRange[] | undefined;
	synonymsData: SynonymsContentProps | undefined;
	paraphrasingsData: ParaphrasingContentData | undefined;
	phrasalData?: PhrasalContentData | undefined;
};

const LTCompRephraseContent = elementFactory("comp-rephrase-content");

const RephraseContent: React.FC<Props> = ({ synonymsData, paraphrasingsData }) => {
	return (
		<LTCompRephraseContent>
			{synonymsData && <SynonymsContent {...synonymsData} />}
			{paraphrasingsData && (
				<ParaphrasingContent noDistanceTop={typeof synonymsData === "undefined"} {...paraphrasingsData} />
			)}
		</LTCompRephraseContent>
	);
};

export default RephraseContent;
