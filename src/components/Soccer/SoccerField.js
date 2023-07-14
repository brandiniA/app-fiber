import React, { useRef } from "react";
import { Plane } from "@react-three/drei";
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
export const SoccerField = () => {
	const planeRef = useRef();
	const width = 120;
	const height = 80;

	return (
		<Plane
			ref={planeRef}
			args={[width, height]}
			rotation={[-Math.PI / 2, 0, 0]}
			position={[width / 2, 0, height / 2]}
			receiveShadow
			isMesh
		>
			<planeBufferGeometry attach="geometry" args={[width, height, 4, 4]} />
			<meshStandardMaterial color="green" wireframe side={THREE.DoubleSide} />º
		</Plane>
	);
};
