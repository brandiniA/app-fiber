import React, { useEffect, useRef } from "react";
import { Plane, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { SoccerFieldSegments } from "./SoccerFieldSegments";
import { SoccerFieldCoordinates } from "./SoccerFieldCoordinates";

export const SoccerField = ({ width = 120, height = 80 }) => {
	const planeRef = useRef();
	const texture = useTexture("textures/soccer_field_mini_02.jpg");

	useEffect(() => {
		const map = planeRef.current.material.map;

		map.minFilter = THREE.NearestFilter;
		map.needsUpdate = true;
	}, []);

	return (
		<React.Fragment>
			<Plane ref={planeRef} args={[width, height]} position={[0, 0, -0.01]}>
				<meshBasicMaterial map={texture} />
			</Plane>
			<Plane args={[width + 10, height + 10]} position={[0, 0, -0.03]}>
				<meshBasicMaterial color="green" />
			</Plane>
			<SoccerFieldSegments width={width} height={height} />
			<SoccerFieldCoordinates width={width} height={height} />
		</React.Fragment>
	);
};
