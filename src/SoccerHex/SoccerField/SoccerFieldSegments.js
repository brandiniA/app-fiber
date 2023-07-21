import React, { useCallback, useMemo } from "react";
import { SoccerFieldSegment } from "./SoccerFieldSegment";
// import { positionToRelative } from "../../utils";
// import { useApp, useHexagons } from "../store";
import { useSoccerHex } from "../SoccerHex";
import StencilBox from "../../Scenes/StencilBox";
import { createHexagonGeometry } from "../../helpers/geometry";

export const SoccerFieldSegments = ({ width = 120, height = 80 }) => {
	const {
		hexagons,
		addSelectedHexagon,
		removeSelectedHexagon,
		selectedHexagons,
	} = useSoccerHex((state) => ({
		hexagons: state.hexagons,
		addSelectedHexagon: state.addSelectedHexagon,
		removeSelectedHexagon: state.removeSelectedHexagon,
		selectedHexagons: state.selectedHexagons,
	}));

	const handlePointerUp = useCallback(
		(event) => {
			event.stopPropagation();
			const { eventObject } = event;
			if (selectedHexagons?.[eventObject.uuid]) {
				removeSelectedHexagon(eventObject.uuid);
			} else {
				addSelectedHexagon(eventObject.uuid);
			}
		},
		[addSelectedHexagon, removeSelectedHexagon, selectedHexagons]
	);

	const childGeometry = useMemo(() => {
		const hexagon = hexagons[0];
		if (!hexagon) return null;

		return createHexagonGeometry(hexagon.radius);
	}, [hexagons]);

	return (
		<React.Fragment>
			<StencilBox geometry={childGeometry} offsetWidth={1} offsetHeight={2}>
				{hexagons.map((segment, index) => {
					return (
						<SoccerFieldSegment
							key={`segment-${segment.uuid}`}
							selected={selectedHexagons[segment.uuid]}
							uuid={segment.uuid}
							position={segment.position}
							radius={segment.radius}
							color={segment.color}
							onPointerUp={handlePointerUp}
						/>
					);
				})}
			</StencilBox>
		</React.Fragment>
	);
};
