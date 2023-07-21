import React, { useEffect, useRef } from "react";
import { Plane, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { SoccerFieldSegments } from "./SoccerFieldSegments";
import { SoccerFieldCoordinates } from "./SoccerFieldCoordinates";

export const SoccerField = ({ width = 120, height = 80 }) => {
	const planeRef = useRef();
	const texture = useTexture("textures/soccer_field_mini_02.jpg");

	useEffect(() => {
		console.log("planeRef", planeRef);
		const map = planeRef.current.material.map;
		console.log("map", map);
		map.minFilter = THREE.NearestFilter;
		map.needsUpdate = true;
	}, []);

	return (
		<React.Fragment>
			<Plane ref={planeRef} args={[width, height]}>
				<meshBasicMaterial map={texture} />
			</Plane>
			<SoccerFieldSegments width={width} height={height} />
			<SoccerFieldCoordinates width={width} height={height} />
		</React.Fragment>
	);
};
