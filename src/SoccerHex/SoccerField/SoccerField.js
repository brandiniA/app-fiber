import React, {
	useEffect,
	useRef,
	useState,
	createRef,
	useCallback,
} from "react";
import { Clone, Plane, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useGui } from "../../store";
import { useFrame, useThree } from "@react-three/fiber";

const Goal = ({ position, rotation }) => {
	const initMaterial = useRef();
	const {
		nodes: { Scene, ...objects },
	} = useGLTF("/models/SoccerField/goal2.glb");

	const [objectsRef] = useState(() =>
		Object.keys(objects).reduce((acc, key) => {
			acc[key] = createRef();
			return acc;
		}, {})
	);

	const setupObjects = () => {
		if (initMaterial.current) return;
		initMaterial.current = true;
		Object.keys(objects).forEach((key) => {
			const objectRef = objectsRef[key].current;

			// Check if is a plane and set the texture to repeat
			if (key.includes("Plane")) {
				const texture = new THREE.TextureLoader().load(
					"models/SoccerField/mesh.jpg"
				);
				texture.wrapS = THREE.RepeatWrapping;
				texture.wrapT = THREE.RepeatWrapping;
				texture.repeat.set(20, 20);

				// Set the material
				objectRef.material = new THREE.MeshBasicMaterial({
					alphaMap: texture,
					transparent: true,
					opacity: 0.5,
				});
				objectRef.material.needsUpdate = true;
				objectRef.material.side = THREE.DoubleSide;
			} else {
				const material = new THREE.MeshBasicMaterial({
					color: "white",
					// transparent: true,
					// opacity: 0.5,
				});
				// Set the material
				objectRef.material = material;
				objectRef.material.needsUpdate = true;
			}
		});
	};

	useEffect(() => {
		setupObjects();
	}, []);

	const scale = 1.4;

	return (
		<group
			position={position}
			scale={[scale, scale, scale]}
			rotation={rotation}
		>
			{/* <Clone object={Scene} scale={[10, 10, 10]} /> */}
			{Object.keys(objects).map((key) => {
				const object = objects[key];
				return (
					<Clone
						ref={objectsRef[key]}
						object={object}
						key={key}
						// material={materials[key]}
					/>
				);
			})}
		</group>
	);
};

export const SoccerField = ({ width = 120, height = 80 }) => {
	const initDebug = useRef(false);
	const camera = useThree((state) => state.camera);
	const {
		size: { width: viewportWidth, height: viewportHeight },
	} = useThree();

	const planeRef = useRef();
	const stadiumRef = useRef();
	const [fieldTexture, stadiumTexture] = useTexture([
		"models/SoccerField/soccer1jpg.jpg",
		"textures/stadium.jpg",
	]);

	// Debug
	const gui = useGui((state) => state.gui);
	const setupGui = () => {
		if (initDebug.current) return;
		initDebug.current = true;
		const $plane = planeRef.current;

		const planeFolder = gui.addFolder("Plane");
		// Position
	};

	useEffect(() => {
		const planeMap = planeRef.current.material.map;
		// Rotate the texture
		planeMap.rotation = Math.PI * 0.5;
		planeMap.center = new THREE.Vector2(0.5, 0.5);
		// planeMap.repeat.set(0.5, 0.5);
		// planeMap.wrapS = THREE.RepeatWrapping;
	}, []);

	const { nodes, materials } = useGLTF("/models/SoccerField/goal.glb");

	const setupStadium = useCallback(() => {
		const stadiumMap = stadiumRef.current;
		const cameraQuaternion = camera.quaternion.clone();

		// Set group rotation to face camera
		stadiumMap.quaternion.copy(cameraQuaternion);
		// stadiumMap.rotateZ(Math.PI * 0.5);
	}, [camera]);

	useFrame(() => {
		setupStadium();
	});

	const scaleStadium = 0.142;
	return (
		<group name="SoccerField">
			<Plane
				ref={stadiumRef}
				args={[stadiumTexture.image.width, stadiumTexture.image.height]}
				scale={[scaleStadium, scaleStadium, scaleStadium]}
				position={[54, -2, -100]}
				rotation={[0, 0, -Math.PI * 0.5]}
			>
				<meshBasicMaterial map={stadiumTexture} />
			</Plane>
			<group position={[-2.5, 0, -0.01]}>
				<Plane
					ref={planeRef}
					args={[width + 6, height + 7]}
					position={[0, 0, -0.01]}
				>
					<meshBasicMaterial
						color={0xd3d3d3}
						transparent
						map={fieldTexture}
						minFilter={THREE.NearestFilter}
					/>
				</Plane>
				<React.Suspense fallback={null}>
					<Goal position={[-61.2, 0, 0]} rotation={[Math.PI * 0.5, 0, 0]} />
					<Goal
						position={[61.2, 0, 0]}
						rotation={[Math.PI * 0.5, Math.PI, 0]}
					/>
				</React.Suspense>
			</group>
			{/* <Plane args={[width + 10, height + 10]} position={[0, 0, -0.03]}>
				<meshBasicMaterial color="green" />
			</Plane> */}
		</group>
	);
};
