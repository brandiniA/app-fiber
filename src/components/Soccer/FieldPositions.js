import React, { useMemo } from "react";
import { Vector3 } from "three";
import { Sphere, Html } from "@react-three/drei";
import { positionToRelative } from "../../utils";

export const FieldPositions = ({ 
	width = 120,
	height = 80,
}) => {
	const positions = useMemo(() => {
		const halfWidth = width / 2;
		const halfHeight = height / 2;
		const $positions = [];

		const position = new Vector3(-halfWidth, halfHeight, 0);

		for (let x = 0; x < 3; x++) {
			for (let y = 0; y < 3; y++) {
				const posX = position.x + halfWidth * x;
				const posY = position.y - halfHeight * y;
				const $position = new Vector3(posX, posY, 0);
				const relativePosition = positionToRelative(
					$position,
					width,
					height
				);
				$positions.push(
					{
						position: $position,
						relativePosition: relativePosition						
					}
				);
			}
		}
		return $positions;
		//
	}, [width, height]);

	return positions.map(({ position, relativePosition }, index) => (
			<Sphere key={index} position={position} args={[0.5, 32, 32]}>
				<meshBasicMaterial color="red" opacity={0.9} />
				<Html>
					<div
						style={{
							backgroundColor: "yellow",
							width: "50px",
							textAlign: "center",
							// opacity: 0.2,
						}}
					>
						{relativePosition.x}, {relativePosition.y}
					</div>
				</Html>
			</Sphere>
		))
	
};
