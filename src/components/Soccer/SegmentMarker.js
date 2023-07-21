import React, { useEffect, useMemo, useRef } from "react";
import { Cylinder, Html } from "@react-three/drei";
import GUI from "lil-gui";
import { useApp } from "../../store";

export const SegmentMarker = ({
	radius,
	position,
	color = "red",
	playerData,
	isPlayer = false,
	opacity = 1,
}) => {
	const mesh = useRef();

	const visibleAllPlayers = useApp((state) => state.visibleAllPlayers);

	const initialSetup = () => {
		mesh.current.position.set(...position);
		// Update the instance's matrix
		mesh.current.updateMatrix(); // This
		// // Then update the mesh's position based on the matrix
	};

	useEffect(() => {
		initialSetup();
	}, []);

	const $opacity = useMemo(() => {
		if (!isPlayer || visibleAllPlayers) return opacity;
		return 0;
	}, [visibleAllPlayers, isPlayer, opacity]);

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
				opacity={$opacity}
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
