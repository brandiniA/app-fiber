import React from "react";
import { SoccerMarker } from "./SoccerMarker";
import { useSoccerMarkers } from "../store";
export const SoccerMarkers = () => {
	const markers = useSoccerMarkers((state) => state.markers);

	return (
		<>
			{markers.map((marker) => {
				return <SoccerMarker key={`marker-${marker.uuid}`} {...marker} />;
			})}
		</>
	);
};
