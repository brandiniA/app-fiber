import React, { useEffect, useRef } from "react";
import { Plane, useTexture } from "@react-three/drei";
import * as THREE from "three";

// const SoccerFieldSegments = ({
// 	width = 120,
// 	height = 80,
// 	// Segment is a hexagon with 6 sides and 6 vertices
// 	// radius = 2
// }) => {
// 	const [markers, setMarkers] = useState([]);
// 	return (
// 		<group
// 			rotation={[-Math.PI / 2, 0, 0]}
// 			position={[width / 2, 0, height / 2]}
// 		>
// 			<SoccerSegments width={width} height={height} />
// 			<SocckerMarkers />
// 		</group>
// 	);
// };

export const SoccerField = ({ width = 120, height = 80 }) => {
	const planeRef = useRef();
	const texture = useTexture("textures/soccer_field_mini_02.jpg");

	useEffect(() => {
		console.log("planeRef", planeRef);
		const map = planeRef.current.material.map;
		console.log("map", map);
		map.minFilter = THREE.NearestFilter;
		// map.magFilter = THREE.NearestFilter;
		map.needsUpdate = true;
	}, []);

	return (
		<Plane ref={planeRef} args={[width, height]}>
			<meshBasicMaterial map={texture} />
		</Plane>
	);
};
