import React, { useEffect, useRef } from "react";
import { Cylinder, Html } from "@react-three/drei";
import GUI from "lil-gui";

export const SegmentMarker = ({
	radius,
	position,
	color = "red",
	playerData,
}) => {
	const mesh = useRef();

	const initialSetup = () => {
		mesh.current.position.set(...position);
		// Update the instance's matrix
		mesh.current.updateMatrix(); // This 
		// // Then update the mesh's position based on the matrix
	}

	useEffect(() => {
		initialSetup()
	}, []);

	return (
		<Cylinder
			ref={mesh}
			rotation={[Math.PI / 2, Math.PI / 2, 0]}
			args={[radius, radius, 1, 6, 1]}
		>
			<cylinderBufferGeometry attach="geometry" args={[radius, radius, 1, 6]} />
			<meshBasicMaterial attach="material" color={color}  />
			{playerData && (
				<Html>
					<div
						style={{
							width: "100px",
							zIndex: 999,
							opacity: 0.6,
						}}
					>
						{/* <div
                        style={{
                            backgroundColor: "aqua",
                            // width: "50px",
                            textAlign: "center",
                        }}
                    >
                        X:<span style={{}}>{player.position.x}</span>/Y:
                        <span>{player.position.z}</span>
                    </div> */}
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
			)}
		</Cylinder>
	);
};
