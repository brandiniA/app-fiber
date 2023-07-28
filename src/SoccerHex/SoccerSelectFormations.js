import { Canvas, useFrame } from "@react-three/fiber";
import React, { forwardRef, useEffect, useRef } from "react";
import SoccerField from "./SoccerField";
import {
	OrbitControls,
	OrthographicCamera,
	PerspectiveCamera,
} from "@react-three/drei";
import SoccerDisplayFormation from "./SoccerDisplayFormation";
import { useGui } from "../store";
import { SOCCER_FORMATIONS } from "./soccerHexConstants";
import GUI from "lil-gui";
import { useSoccerFormation } from "./store";

import { shallow } from "zustand/shallow";
import AssignPlayer from "../components/AssignPlayer";

const Camera = () => {
	const initDebug = useRef(false);
	const camera = useRef();

	const gui = useGui((state) => state.gui);

	const setupGui = () => {
		if (initDebug.current) return;
		initDebug.current = true;
		const $camera = camera.current;

		const cameraFolder = gui.addFolder("Camera");
		// Position
		cameraFolder.add($camera.position, "x", -100, 100).name("x");
		cameraFolder.add($camera.position, "y", -100, 100).name("y");
		cameraFolder.add($camera.position, "z", -100, 100).name("z");
		// Zoom
		// cameraFolder
		// 	.add(camera.current, "zoom", 1, 20)
		// 	.name("zoom")
		// 	.onChange(() => {
		// 		$camera.updateProjectionMatrix();
		// 	});

		const rotations = {
			x: $camera.rotation.x,
			y: $camera.rotation.y,
			z: $camera.rotation.z,
		};
		// Rotation
		cameraFolder
			.add(rotations, "x", -Math.PI, Math.PI)
			.name("rotationX")
			.onChange((v) => {
				$camera.rotation.set(v, $camera.rotation.y, $camera.rotation.z);
				$camera.updateProjectionMatrix();
			});
		cameraFolder
			.add(rotations, "y", -Math.PI, Math.PI)
			.name("rotationY")
			.onChange((v) => {
				$camera.rotation.set($camera.rotation.x, v, $camera.rotation.z);
				$camera.updateProjectionMatrix();
			});

		cameraFolder
			.add(rotations, "z", -Math.PI, Math.PI)
			.name("rotationZ")
			.onChange((v) => {
				$camera.rotation.set($camera.rotation.x, $camera.rotation.y, v);
				$camera.updateProjectionMatrix();
			});

		// FOV
		cameraFolder
			.add($camera, "fov", 1, 180)
			.name("fov")
			.onChange(() => {
				$camera.updateProjectionMatrix();
			});

		// Look at 0,0,0
		cameraFolder
			.add(
				{
					lookAt() {
						$camera.lookAt(0, 0, 0);
						$camera.rotation.set(0, 0, -Math.PI * 0.5);
						$camera.updateProjectionMatrix();
					},
				},
				"lookAt"
			)
			.name("lookAt");
	};

	const setUpCamera = () => {
		const $camera = camera.current;
		// Rotation
		// Reorder
		// FOV
		// $camera.fov = 70;
		// // Position
		// $camera.position.set(-72, 0, 60);
		// // Look at
		// // $camera.lookAt(0, 0, 0);
		// $camera.rotation.set(0, -Math.PI * 0.25, -Math.PI * 0.5);
		// // Update projection matrix
		// $camera.updateProjectionMatrix();

		// LOOK AT ONLY FOR ORTHOGRAPHIC
		// $camera.lookAt(0, 0, 0);
	};

	useEffect(() => {
		setUpCamera();
		// setupGui();
	}, []);

	return (
		<PerspectiveCamera
			ref={camera}
			makeDefault
			near={0.1}
			far={1000}
			fov={45}
			position={[-94, 0, 115]}
			rotation={[0, -Math.PI * 0.2, -Math.PI * 0.5]}

			// position={[0, 0, 150]}
			// rotation={[0, 0, -Math.PI * 0.5]}
			// zoom={1}
			// fov={75}
		/>
		// <OrbitControls />
		// <OrthographicCamera
		// 	ref={camera}
		// 	makeDefault
		// 	zoom={5}
		// 	position={[0, 0, 100]}
		// />
	);
};

export const SoccerSelectFormations = forwardRef(function SoccerFormation(
	{ boundingWidth = 120, boundingHeight = 80, initialValues = {} },
	ref
) {
	const initDebug = useRef(false);
	const setGui = useGui((state) => state.setGui);
	const { selectedFormation, setFormation } = useSoccerFormation(
		(state) => ({
			selectedFormation: state.selectedFormation,
			setFormation: state.setFormation,
		}),
		shallow
	);

	const setupGui = () => {
		if (initDebug.current) return;
		initDebug.current = true;
		const gui = new GUI();
		setGui(gui);
		const soccerFormationObj = Object.keys(SOCCER_FORMATIONS).reduce(
			(acc, key) => {
				acc[SOCCER_FORMATIONS[key]] = key;
				return acc;
			},
			{}
		);
		const formation = gui.addFolder("Formation");
		formation
			.add(
				{
					selectedFormation,
				},
				"selectedFormation",
				soccerFormationObj
			)
			.name("Formation")
			.onChange((value) => {
				setFormation(value);
				console.log("value", value);
			});
	};

	useEffect(() => {
		setupGui();
	}, []);

	return (
		<div style={{ display: "flex", flexDirection: "column", width: "100vw" }}>
			<div
				style={{
					width: "100vw",
					overflow: "hidden",
					height: "700px",
					backgroundColor: "black",
				}}
			>
				<Canvas
					onCreated={({ gl }) => {
						gl.localClippingEnabled = true;
					}}
				>
					<React.Suspense fallback={null}>
						<SoccerDisplayFormation />
						<SoccerField width={120} height={80} />
						<Camera />
					</React.Suspense>
				</Canvas>
			</div>
			<div
				style={{
					backgroundColor: "black",
					paddingTop: "20px",
				}}
			>
				<AssignPlayer />
			</div>
		</div>
	);
});
