import React, { useEffect, useCallback } from "react";
import { SoccerSegment } from "./SoccerSegment";
import { calculateHexagonsInRound, positionToRelative } from "../../utils";
import { useApp, useHexagons, useMarkers } from "../../store";
import { generateHexagons } from "./../../utils";
import { Vector3 } from "three";
import { generateUUID } from "three/src/math/MathUtils";

const MODE_1 = 0
const MODE_2 = 1
const MODE_3 = 2

const HEX_MODE = {
	[MODE_1]: {
		radius: 2,
	},
	[MODE_2]: {
		radius: 3,
	},
	[MODE_3]: {
		radius: 4,
	},
}

export const SoccerSegments = ({ width = 120, height = 80 }) => {
	const hexagonMode = useApp((state) => state.hexagonMode);
	const { hexagons, setHexagons } = useHexagons((state) => ({
		hexagons: state.hexagons,
		setHexagons: state.setHexagons,
	}));
	
	const { radius } = HEX_MODE[hexagonMode];
	const loadHexagons = useCallback(() => {
		const hexagons = generateHexagons({
			radius,
			position: [0, 0, 0],
			totalHexagons: calculateHexagonsInRound(100),
			boundingHeight: height,
			boundingWidth: width,
		});
		setHexagons(hexagons);
	}, [radius, width, height, setHexagons]);

	useEffect(() => {
		loadHexagons();
	}, [hexagonMode]);

	const { addMarker } = useMarkers((state) => ({
		addMarker: state.addMarker,
		removeMarker: state.removeMarker,
	}));
	// const moved = useCameraInteractor((state) => state.controlsState.moved);

	const handlePointerUp = useCallback(
		(event) => {
			event.stopPropagation();
			// if (moved) return;
			const { eventObject } = event;
			const [x, y, z] = eventObject.position;
			addMarker({
				id: generateUUID(),
				position: new Vector3(x, y, z + 0.5),
				relativePosition: positionToRelative(
					new Vector3(x, y, z + 0.5),
					width,
					height
				),
				color: "red",
				radius,
			});
		},
		[radius, addMarker, width, height]
	);

	return hexagons.map((segment) => (
		<SoccerSegment
			key={`segment-${segment.uuid}`}
			uuid={segment.uuid}
			position={segment.position}
			radius={segment.radius}
			color={segment.color}
			onPointerUp={handlePointerUp}
		/>
	));
};
