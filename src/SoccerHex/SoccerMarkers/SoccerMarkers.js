import React from "react";
import { SoccerMarker } from "./SoccerMarker";
import { useSoccerHex } from "../SoccerHex";
export const SoccerMarkers = () => {
	const markers = useSoccerHex((state) => state.markers);

	return (
		<>
			{markers.map((marker) => {
				return <SoccerMarker key={`marker-${marker.uuid}`} {...marker} />;
			})}
		</>
	);
};
