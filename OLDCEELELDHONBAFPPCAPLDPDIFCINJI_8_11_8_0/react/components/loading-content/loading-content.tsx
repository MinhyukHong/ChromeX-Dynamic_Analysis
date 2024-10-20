import React, { useEffect } from "react";
import { Div } from "../../index";
import { useBaseCardContext } from "../card-base/hooks";
import CardContent from "../card-content/card-content";

const LoadingContent: React.FC = () => {
	const { updateCardPosition } = useBaseCardContext();

	useEffect(updateCardPosition, [updateCardPosition]);

	return (
		<CardContent>
			<Div className="lt-comp-loading-content">
				<Div className="lt-comp-loading-content__spinner lt-icon__loading" />
			</Div>
		</CardContent>
	);
};

export default LoadingContent;
