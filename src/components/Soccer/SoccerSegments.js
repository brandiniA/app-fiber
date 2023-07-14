import React, { useEffect, useCallback } from "react";
import { SoccerSegment } from "./SoccerSegment";
import { calculateHexagonsInRound } from "../../utils";
import { useHexagons, useMarkers, useCameraInteractor } from "../../store";
import { generateHexagons } from "./../../utils";

export const SoccerSegments = ({ width = 120, height = 80, radius = 2 }) => {
	const { hexagons, setHexagons } = useHexagons((state) => ({
		hexagons: state.hexagons,
		setHexagons: state.setHexagons,
	}));

	const loadHexagons = () => {
		const hexagons = generateHexagons({
			radius,
			position: [60, 40, 0],
			totalHexagons: calculateHexagonsInRound(22),
		});
		setHexagons(hexagons);
	};

	useEffect(() => {
		loadHexagons();
	}, []);

	const { addMarker } = useMarkers((state) => ({
		addMarker: state.addMarker,
		removeMarker: state.removeMarker,
	}));
	const moved = useCameraInteractor((state) => state.controlsState.moved);

	const handlePointerUp = useCallback(
		(event) => {
			event.stopPropagation();
			if (moved) return;
			const { eventObject } = event;
			const [x, y, z] = eventObject.position;
			addMarker({
				id: eventObject.uuid,
				position: [x, y + 0.5, z],
				color: "red",
				radius,
			});
		},
		[radius, addMarker, moved]
	);

	return hexagons.map((segment, index) => (
		<SoccerSegment
			key={index}
			title={index}
			uuid={segment.uuid}
			position={segment.position}
			radius={segment.radius}
			color={segment.color}
			onPointerUp={handlePointerUp}
		/>
	));
};
