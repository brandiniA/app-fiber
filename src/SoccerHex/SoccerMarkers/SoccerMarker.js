import React, { useEffect, useMemo, useRef } from "react";
import { Cylinder, Html } from "@react-three/drei";
import GUI from "lil-gui";

import { useSoccerMarkers } from "../store";
import { shallow } from "zustand/shallow";

export const SoccerMarker = ({
	radius,
	position,
	color = "red",
	playerData,
	isPlayer = false,
	opacity = 1,
	clippedMaterial,
}) => {
	const mesh = useRef();

	const { visibleMarkers } = useSoccerMarkers(
		(state) => ({
			visibleMarkers: state.visibleMarkers,
		}),
		shallow
	);

	const initialSetup = () => {
		mesh.current.position.set(...position);
		// Update the instance's matrix
		mesh.current.updateMatrix(); // This
		// // Then update the mesh's position based on the matrix
	};

	useEffect(() => {
		initialSetup();
	}, []);

	return (
		<Cylinder
			ref={mesh}
			rotation={[Math.PI / 2, Math.PI / 2, 0]}
			args={[radius, radius, 1, 6, 1]}
		>
			<cylinderGeometry attach="geometry" args={[radius, radius, 1, 6]} />
			<meshBasicMaterial
				attach="material"
				{...clippedMaterial}
				color={color}
				transparent
				visible={!isPlayer || (isPlayer && visibleMarkers)}
				opacity={opacity}
			/>
			{/* {playerData && (
				<Html>
					<div
						style={{
							width: "100px",
							zIndex: 999,
							opacity: 0.6,
						}}
					>
						<div
							style={{
								backgroundColor: "orange",
								textAlign: "center",
							}}
						>
							{playerData.player}
						</div>
						<div
							style={{
								backgroundColor: "white",
								textAlign: "center",
							}}
						>
							{playerData.type}
						</div>
					</div>
				</Html>
			)} */}
		</Cylinder>
	);
};
