import React, { useEffect, useMemo, useRef } from "react";
import { Cylinder, Html } from "@react-three/drei";
import GUI from "lil-gui";

import { useSoccerHex } from "../SoccerHex";

export const SoccerMarker = ({
	radius,
	position,
	color = "red",
	playerData,
	isPlayer = false,
	opacity = 1,
}) => {
	const mesh = useRef();

	const visibleMarkers = useSoccerHex((state) => state.visibleMarkers);

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
