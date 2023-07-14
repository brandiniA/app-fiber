import React, { useEffect } from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import { useStatsBomb } from "./api";
import "./App.css";
import { SocckerMarkers } from "./components/Soccer/SocckerMarkers";
import { SoccerSegments } from "./components/Soccer/SoccerSegments";
import { SoccerField } from "./components/Soccer/SoccerField";
import { CameraInteractor } from "./components/Soccer/CameraInteractor";
import { FieldPositions } from "./components/Soccer/FieldPositions";
import { PlayersPositions } from "./components/Soccer/PlayersPositions";
import { OrthographicCamera } from "@react-three/drei";
import GUI from "lil-gui";

const CameraManager = () => {
	// const clock = useRef(new THREE.Clock());
	const cameraRef = React.useRef();

	useEffect(() => {
		const gui = new GUI();

		// Initial
		cameraRef.current.lookAt(60, 0, 40);
		cameraRef.current.rotation.set(-Math.PI * 0.5, 0, -Math.PI * 0.5);
		cameraRef.current.updateProjectionMatrix(); // This means that the camera has changed and the projection matrix needs to be updated

		// Position
		gui
			.add(cameraRef.current.position, "x", -100, 100)
			.name("position.x")
			.onChange(() => {
				// cameraRef.current.updateProjectionMatrix();
			});
		gui
			.add(cameraRef.current.position, "y", -100, 100)
			.name("position.y")
			.onChange(() => {
				// cameraRef.current.updateProjectionMatrix();
			});
		gui
			.add(cameraRef.current.position, "z", -100, 100)
			.name("position.z")
			.onChange(() => {
				// cameraRef.current.updateProjectionMatrix();
			});

		// Rotation
		gui
			.add(cameraRef.current.rotation, "x", -Math.PI * 2, Math.PI * 2)
			.step(Math.PI / 2)
			.name("rotation.x")
			.onChange(() => {
				// cameraRef.current.updateProjectionMatrix();
			});
		gui
			.add(cameraRef.current.rotation, "y", -Math.PI * 2, Math.PI * 2)
			.step(Math.PI / 2)
			.name("rotation.y")
			.onChange(() => {
				// cameraRef.current.updateProjectionMatrix();
			});
		gui
			.add(cameraRef.current.rotation, "z", -Math.PI * 2, Math.PI * 2)
			.step(Math.PI / 2)
			.name("rotation.z")
			.onChange(() => {
				// cameraRef.current.updateProjectionMatrix();
			});

		// Zoom
		gui
			.add(cameraRef.current, "zoom", 0.1, 10)
			.name("zoom")
			.onChange(() => {
				cameraRef.current.updateProjectionMatrix();
			});

		// Near
		gui
			.add(cameraRef.current, "near", 0.1, 1000)
			.name("near")
			.onChange(() => {
				// cameraRef.current.updateProjectionMatrix();
			});

		// Far
		gui
			.add(cameraRef.current, "far", 0.1, 1000)
			.name("far")
			.onChange(() => {
				// cameraRef.current.updateProjectionMatrix();
			});
	}, []);

	// useFrame(() => {
	// 	// Look at the center of the field
	// 	cameraRef.current.lookAt(60, 0, 40);
	// });

	return (
		<OrthographicCamera
			makeDefault
			ref={cameraRef}
			near={0.1}
			far={1000}
			position={[60, 40, 40]}
			zoom={6}
		/>
	);
};

function App() {
	useStatsBomb();
	return (
		<div style={{ height: "100vh", width: "100vw", backgroundColor: "black" }}>
			<Canvas>
				<React.Suspense fallback={null}>
					<ambientLight intensity={0.5} />
					<spotLight
						position={[10, 10, 10]}
						angle={0.15}
						penumbra={1}
						castShadow
					/>
					{/* <Stadium /> */}
					<axesHelper args={[5]} />
					<SoccerField />
					<SoccerSegments width={120} height={80} />
					{/* <SocckerMarkers /> */}
					{/* <FieldPositions />
					<PlayersPositions /> */}
					<CameraManager />
					{/* <CameraInteractor /> */}
				</React.Suspense>
				{/* <CameraInteractor /> */}
			</Canvas>
		</div>
	);
}

export default App;
