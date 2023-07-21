import React, { useEffect, useRef } from "react";
import {
	CameraControls,
	OrbitControls,
	OrthographicCamera,
	PerspectiveCamera,
	Sphere,
	useCamera,
} from "@react-three/drei";
import { useGui } from "../store";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const CameraManager = () => {
	const init = useRef(false);
	// const clock = useRef(new THREE.Clock());
	const cameraRef = React.useRef();

	const gui = useGui((state) => state.gui);

	useEffect(() => {
		if (init.current || !gui) return;
		init.current = true;

		console.log("gui", gui);

		// const folder = gui.addFolder("Camera");
		// // Position
		// folder.add(cameraRef.current.position, "x", -1000, 1000).name("position.x");

		// folder.add(cameraRef.current.position, "y", -1000, 1000).name("position.y");
		// folder.add(cameraRef.current.position, "z", -1000, 1000).name("position.z");

		// // Rotation
		// folder
		// 	.add(cameraRef.current.rotation, "x", -Math.PI * 2, Math.PI * 2)
		// 	.step(Math.PI * 0.1)
		// 	.name("rotation.x");
		// folder
		// 	.add(cameraRef.current.rotation, "y", -Math.PI * 2, Math.PI * 2)
		// 	.step(Math.PI * 0.1)
		// 	.name("rotation.y");
		// folder
		// 	.add(cameraRef.current.rotation, "z", -Math.PI * 2, Math.PI * 2)
		// 	.step(Math.PI * 0.1)
		// 	.name("rotation.z");

		// folder
		// 	.add(cameraRef.current, "zoom", 1, 20, 1)
		// 	.name("zoom")
		// 	.onChange((value) => {
		// 		console.log(value);
		// 		cameraRef.current.zoom = value;
		// 		cameraRef.current.updateProjectionMatrix();
		// 	});

		// folder.add(cameraRef.current, "near", 0.1, 1000).name("near");

		// folder.add(cameraRef.current, "far", 0.1, 1000).name("far");
		// folder.close();
	}, [gui]);

	// useEffect(() => {
	// 	console.log("cameraRef", cameraRef);
	// 	const camera = cameraRef.current;

	// 	camera.setPosition(0, 0, 80);
	// }, [cameraRef.current]);

	// useFrame((render) => {
	// 	//
	// 	// render.camera.lookAt(0, 0, 0);
	// 	// Never below 1
	// 	// sphereRef.current.position.z = Math.min(
	// 	// 	Math.abs(Math.sin(elapsedTime) * 10),
	// 	// 	1
	// 	// );
	// });

	// Soccer ball radius is 0.11m
	return (
		<React.Fragment>
			{/* <OrthographicCamera
				makeDefault
				ref={cameraRef}
				near={0.1}
				far={1000}
				position={[0, 0, 10]}
				// rotation={[0,0, -Math.PI / 2]}
				zoom={6}
			/> */}
			<CameraControls
				ref={cameraRef}
				// minPolarAngle={Math.PI / 4}
				// maxPolarAngle={Math.PI / 3}
				enableDamping
				minDistance={5}
				// maxDistance={110}
				draggingDampingFactor={0.9}
				azimuthRotateSpeed={0.4}
				polarRotateSpeed={0.4}

				// onStart={handleStart}
				// onEnd={handleEnd}
			/>

			{/* <PerspectiveCamera
				makeDefault
				ref={cameraRef}
				near={0.1}
				far={1000}
				fov={75}
				// position={[0, -250, 70]}
				// rotation={[0, 0, 0]}
				// rotation={[0,0, -Math.PI / 2]}
				zoom={6}
			/> */}
		</React.Fragment>
	);
};
