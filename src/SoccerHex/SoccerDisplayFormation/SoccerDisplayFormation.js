import React from "react";
import { FORMATIONS_POSITIONS, SOCCER_POSITIONS } from "../soccerHexConstants";
import { useSoccerFormation } from "../store";
import { useTexture } from "@react-three/drei";
import SoccerSelectPlayer from "./SoccerSelectPlayer";
import * as THREE from "three";

export const SoccerDisplayFormation = () => {
	const selectedFormation = useSoccerFormation(
		(state) => state.selectedFormation
	);

	const [shirt, add, tag, crest] = useTexture([
		"textures/shirt.png",
		"textures/add5.png",
		"textures/tag.png",
		"textures/FC_BC_Tiny.png",
	]);

	return (
		<group position={[-13, 0, 0]} scale={[0.85, 0.85, 0.85]}>
			{FORMATIONS_POSITIONS[selectedFormation].players.map((player, index) => {
				const { position, positionType, id } = player;
				const color = SOCCER_POSITIONS[positionType].color;

				return (
					<SoccerSelectPlayer
						key={`player-${id}`}
						id={id}
						position={[position.x, position.y, 25]}
						shirtTexture={shirt}
						addTexture={add}
						tagTexture={tag}
						crestTexture={crest}
						color={color}
					/>
				);
			})}
		</group>
	);
};
