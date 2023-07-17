import React from "react";
import { SegmentMarker } from "./SegmentMarker";
import { useMarkers } from "../../store";

export const SocckerMarkers = () => {
	const markers = useMarkers((state) => state.markers);

	return (
		<>
			{markers.map((marker) => {
				const [x, y, z] = marker.position;
				return (
					<SegmentMarker
						key={marker.uuid}
						radius={marker.radius}
						position={[x, y, z]}
						color={marker.color}
						playerData={marker?.playerData}
					/>
				);
			})}
		</>
	);
};
