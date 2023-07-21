/* eslint-disable no-unused-vars */
import React, {
	useState,
	useEffect,
	useCallback,
	useMemo,
	useRef,
} from "react";
import { Matrix4, Vector2, Vector3, Frustum } from "three";
import { Plane, Cylinder, CameraControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { setPoligonVertices } from "./helpers/geometry";
import { create } from "zustand";
import { Stadium } from "./components/Soccer/Stadium";
import { useMatchDiary } from "./api";
import "./App.css";
/**
 * Create a hexagon segment for the soccer field
 * props:
 * 	radius: radius of the hexagon
 * 	color: color of the hexagon
 * 	position: position of the hexagon
 *  x: max value of x position of the hexagon based on the half width of the field
 *  y: max value of y position of the hexagon based on the half height of the field
 */

const SegmentMarker = ({ radius, position, color = "red" }) => {
	return (
		<Cylinder
			args={[radius, radius, 1, 6, 1]}
			position={position}
			rotation={[Math.PI / 2, Math.PI / 6, 0]}
			receiveShadow
		>
			<cylinderGeometry attach="geometry" args={[radius, radius, 1, 6]} />
			<meshBasicMaterial color={color} transparent opacity={0.6} />
		</Cylinder>
	);
};

const SoccerSegments = ({
	width,
	height,
	widthSegments = 1,
	heightSegments = 1,
}) => {
	const fieldData = useMemo(() => {
		const fieldArea = width * height;
		const boundX = width / 2;
		const boundY = height / 2;

		return {
			fieldArea,
			boundX,
			boundY,
		};
	}, [width, height]);

	const segmentData = useMemo(() => {
		const segmentArea = fieldData.fieldArea / (widthSegments * heightSegments);
		const totalSegments = widthSegments * heightSegments;
		const segmentWidth = width / widthSegments;
		const segmentHeight = height / heightSegments;

		return {
			segmentArea,
			totalSegments,
			segmentWidth,
			segmentHeight,
		};
	}, [width, height, widthSegments, heightSegments, fieldData.fieldArea]);

	// Creating segments inside the field area based on the width and height segments
	const segments = useMemo(() => {
		const segments = [];

		for (let i = 0; i < segmentData.totalSegments; i++) {
			const segment = {
				id: i,
				color: createRandomColor(),
				position: new Vector3(),
				rotation: new Vector3(),
				// vertices: [],
			};

			segments.push(segment);
		}

		return segments;
	}, [segmentData.totalSegments]);

	// Setting the position of each segment
};

const SoccerFieldSegments = ({ width = 1, height = 1 }) => {
	const [markers, setMarkers] = useState([]);

	return (
		<group rotation={[-Math.PI / 2, 0, 0]}>
			<SoccerSegments width={width} height={height} />
		</group>
	);
};

const SoccerField = () => {
	const width = 105;
	const height = 68;

	return (
		<Plane
			args={[width, height]}
			rotation={[-Math.PI / 2, 0, 0]}
			position={[0, 0, 0]}
			receiveShadow
			isMesh
		>
			<planeBufferGeometry attach="geometry" args={[width, height]} />
			<meshBasicMaterial color="green" wireframe />
		</Plane>
	);
};

const CameraInteractor = () => {
	const cameraControlsRef = useRef();
	const camera = useThree((state) => state.camera);

	return (
		<CameraControls
			ref={cameraControlsRef}
			minPolarAngle={Math.PI / 4}
			maxPolarAngle={Math.PI / 3}
			enableDamping
			minDistance={60}
			maxDistance={110}
			draggingDampingFactor={0.9}
			azimuthRotateSpeed={0.4}
			polarRotateSpeed={0.4}
		/>
	);
};

function App() {
	// useMatchDiary();
	return (
		<div style={{ height: "100vh", width: "100vw", backgroundColor: "black" }}>
			<Canvas shadows camera={{ position: [0, 60, 90], fov: 40 }}>
				<React.Suspense fallback={null}>
					<ambientLight intensity={0.5} />
					<spotLight
						position={[10, 10, 10]}
						angle={0.15}
						penumbra={1}
						castShadow
					/>
					{/* <Stadium /> */}
					<SoccerField />
					{/* <SoccerFieldSegments /> */}
					<CameraInteractor />
				</React.Suspense>
				<CameraInteractor />
			</Canvas>
		</div>
	);
}

export default App;
