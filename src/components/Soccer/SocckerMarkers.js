import React from "react";
import { SegmentMarker } from "./SegmentMarker";
import { useMarkers } from "../../store";

export const SocckerMarkers = () => {
	const markers = useMarkers((state) => state.markers);

	return (
		<>
			{markers.map((marker) => {
				return <SegmentMarker key={marker.uuid} {...marker} />;
			})}
		</>
	);
};
