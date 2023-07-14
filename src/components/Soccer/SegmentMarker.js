import React from "react";
import { Cylinder, Html } from "@react-three/drei";

export const SegmentMarker = ({
	radius,
	position,
	color = "red",
	playerData,
}) => {
	return (
		<Cylinder
			args={[radius, radius, 1, 6, 1]}
			position={position}
			rotation={[0, Math.PI / 6, 0]}
			receiveShadow
		>
			<cylinderBufferGeometry attach="geometry" args={[radius, radius, 1, 6]} />
			<meshStandardMaterial color={color} transparent opacity={0.6} />
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
