import React, { useMemo } from "react";
import { Vector3 } from "three";
import { Sphere, Html } from "@react-three/drei";

export const FieldPositions = () => {
	const positions = useMemo(() => {
		const $positions = [];

		// Y is not going to change
		const position = new Vector3(0, 0, 0);

		const xLength = 120 / 2;
		const yLength = 80 / 2;
		for (let x = 0; x < 3; x++) {
			for (let y = 0; y < 3; y++) {
				$positions.push(
					new Vector3(
						position.x + xLength * x,
						position.y,
						position.z + yLength * y
					)
				);
			}
		}
		return $positions;
		//
	}, []);
	return (
		<group>
			{positions.map((position, index) => (
				<Sphere key={index} position={position} args={[0.5, 32, 32]}>
					<meshStandardMaterial color="red" />
					<Html>
						<div
							style={{
								backgroundColor: "yellow",
								width: "50px",
								textAlign: "center",
								opacity: 0.2,
							}}
						>
							{position.x}, {position.z}
						</div>
					</Html>
				</Sphere>
			))}
		</group>
	);
};
