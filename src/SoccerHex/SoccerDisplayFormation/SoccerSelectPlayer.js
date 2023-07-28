import React, { useCallback, useEffect, useRef, useState } from "react";
import { Plane, Text, useCamera } from "@react-three/drei";
import * as THREE from "three";
import { useSoccerFormation } from "./../store";
import { shallow } from "zustand/shallow";
import { animated, useSpring } from "@react-spring/three";
import { useFrame, useThree } from "@react-three/fiber";

const AnimatedPlane = animated(Plane);

const SoccerSelectPlayer = ({
	shirtTexture,
	addTexture,
	crestTexture,
	tagTexture,
	color,
	position,
	id,
}) => {
	const camera = useThree((state) => state.camera);
	const groupRef = useRef();
	const [hover, setHover] = useState(false);
	const {
		players,
		selectedPositionIndex,
		setSelectedPositionIndex,
		removePlayer,
	} = useSoccerFormation(
		(state) => ({
			players: state.players,
			selectedPositionIndex: state.selectedPositionIndex,
			setSelectedPositionIndex: state.setSelectedPositionIndex,
			removePlayer: state.removePlayer,
		}),
		shallow
	);
	const playerAssigned = players[id];

	// Handle pointer over
	const handlePointerOver = (e) => {
		e.stopPropagation();
		// Change cursos to pointer when hover
		document.body.style.cursor = "pointer";
		setHover(true);
	};
	// Handle pointer out
	const handlePointerOut = (e) => {
		e.stopPropagation();
		// Change cursos to pointer when hover
		document.body.style.cursor = "default";
		setHover(false);
	};

	const handlePointerDown = useCallback(
		(e) => {
			e.stopPropagation();
			if (
				selectedPositionIndex &&
				!playerAssigned &&
				id === selectedPositionIndex
			) {
				setSelectedPositionIndex(null);
			} else if (!playerAssigned) setSelectedPositionIndex(id);
			else removePlayer(id);
		},
		[
			playerAssigned,
			id,
			selectedPositionIndex,
			setSelectedPositionIndex,
			removePlayer,
		]
	);

	const calculateLabelWidth = (name) => {
		const canvas = document.createElement("canvas");
		const context = canvas.getContext("2d");
		context.font = "2px Arial";
		const width = context.measureText(name).width;

		return width * 1.4;
	};

	const getFirstName = (name) => {
		return name.slice(0, name.indexOf(" "));
	};

	const spring = useSpring({
		scale: hover ? [1.4, 1.4, 1.4] : [1, 1, 1],
		// color: hover ? "black" : "white",
		opacity: hover ? 1 : 0.7,
		config: { mass: 1, tension: 500, friction: 50 },
	});

	// console.log("SoccerSelectPlayer", spring);

	const setupGroup = useCallback(() => {
		const group = groupRef.current;
		/**
		 * Rotate group to face camera direction (only y axis) and
		 * keep it always facing the camera
		 * https://discourse.threejs.org/t/camera-facing-sprite/1658/2
		 */
		const cameraQuaternion = camera.quaternion.clone();

		// Set group rotation to face camera
		group.quaternion.copy(cameraQuaternion);
		group.rotateZ(Math.PI * 0.5);
		// group.position.z += 2;
	}, [camera]);

	useFrame(() => {
		setupGroup();
	});

	return (
		<group position={position} ref={groupRef}>
			<Plane
				position={[0, 0, 0]}
				rotation={[0, 0, -Math.PI * 0.5]}
				args={[13.5, 18]}
			>
				<meshBasicMaterial
					map={shirtTexture}
					transparent
					side={THREE.DoubleSide}
				/>
			</Plane>
			{!playerAssigned && (
				<AnimatedPlane
					name={`assignPlayer ${id}`}
					args={[5, 5]}
					position={[7.5, 0, 0.1]}
					onPointerOver={handlePointerOver}
					onPointerOut={handlePointerOut}
					onPointerDown={handlePointerDown}
					scale={spring.scale}
				>
					{/* ADD */}
					<animated.meshBasicMaterial
						map={addTexture}
						transparent
						opacity={spring.opacity}
					/>
				</AnimatedPlane>
			)}

			<React.Suspense fallback={null}>
				{playerAssigned && (
					<animated.group
						position={[7.5, 0, 0.1]}
						rotation={[0, 0, -Math.PI * 0.5]}
					>
						{/* Remove */}
						<AnimatedPlane
							name={`removePlayer ${id}`}
							position={[0, 0, 0.2]}
							rotation={[0, 0, -Math.PI * 0.25]}
							args={[4, 4]}
							// scale={hover ? [1.4, 1.4, 1.4] : [1, 1, 1]}
							onPointerOver={handlePointerOver}
							onPointerOut={handlePointerOut}
							onPointerDown={handlePointerDown}
							scale={spring.scale}
						>
							<animated.meshBasicMaterial
								map={addTexture}
								transparent
								opacity={spring.opacity}
								// color={spring.color}
							/>
						</AnimatedPlane>
						{/* Crest */}
						<Plane
							position={[0, -5.5, 0.1]}
							args={[
								crestTexture.image.height * 0.01,
								crestTexture.image.width * 0.01,
								1,
							]}
						>
							<meshBasicMaterial map={crestTexture} />
						</Plane>
						{/* Player Name */}
						<Plane
							position={[0, -14.8, 0.2]}
							args={[calculateLabelWidth(getFirstName(playerAssigned.name)), 3]}
						>
							<meshBasicMaterial
								// map={tagTexture}
								transparent
								// minFilter={THREE.NearestFilter}
								// magFilter={THREE.NearestFilter}
								// generateMipmaps={false}
								opacity={0.8}
								color={0x00253f}
							/>
							<Text
								args={[13.5, 18]}
								position={[0, 0, 0.1]}
								fontSize={2}
								color="white"
								anchorX="center"
								anchorY="middle"
							>
								{getFirstName(playerAssigned.name)}
							</Text>
						</Plane>
					</animated.group>
				)}
			</React.Suspense>
		</group>
	);
};

export default SoccerSelectPlayer;
