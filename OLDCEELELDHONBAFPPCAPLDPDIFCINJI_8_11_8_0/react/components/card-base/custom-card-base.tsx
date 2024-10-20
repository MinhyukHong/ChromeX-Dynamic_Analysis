import React, { useRef, useImperativeHandle, useCallback, forwardRef } from "react";
import { elementFactory } from "../../index";

export type CardType = "wide" | "narrow";

export interface Props {
	type: CardType;
	updatePosition?: (container: HTMLElement | null) => void;
}

export interface CardBaseRef {
	updatePosition: () => void;
	updateCardType: (cardType: CardType) => void;
}

const LtCompCardBase = elementFactory("comp-card-base");

const CardBase = forwardRef<CardBaseRef, React.PropsWithChildren<Props>>(function CardBase(
	{ updatePosition, children },
	ref
) {
	const cardBaseRef = useRef<HTMLElement>(null);

	const updateCardPosition = useCallback(() => {
		updatePosition?.(cardBaseRef.current);
	}, [updatePosition]);

	useImperativeHandle<object, CardBaseRef>(
		ref,
		() => ({
			updatePosition: updateCardPosition,
			updateCardType: () => undefined,
		}),
		[updateCardPosition]
	);

	return <LtCompCardBase ref={cardBaseRef}>{children}</LtCompCardBase>;
});

export default CardBase;
