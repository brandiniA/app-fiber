import React from "react";
import { Sphere, Html } from "@react-three/drei";
import { useSoccerHex } from "../SoccerHex";

export const SoccerPlayers = () => {
	const { players, visiblePlayers } = useSoccerHex((state) => ({
		players: state.players,
		visiblePlayers: state.visiblePlayers,
	}));
	// Set players based on the current event index

	return (
		<group>
			{players.map((player) => {
				return (
					<Sphere
						key={player.uuid}
						position={player.position}
						args={[0.5, 32, 32]}
					>
						<meshBasicMaterial color={player.color} visible={visiblePlayers} />
						{player.actor && (
							<Html>
								<div
									style={{
										width: "100px",
										zIndex: 999,
										opacity: 0.7,
									}}
								>
									<div
										style={{
											backgroundColor: "aqua",
											// width: "50px",
											textAlign: "center",
										}}
									>
										X:<span style={{}}>{player.relativePosition.x}</span>/Y:
										<span>{player.relativePosition.y}</span>
									</div>
									<div
										style={{
											backgroundColor: "orange",
											textAlign: "center",
										}}
									>
										{player.player}
									</div>
									<div
										style={{
											backgroundColor: "green",
											textAlign: "center",
										}}
									>
										{player.time}
									</div>
									<div
										style={{
											backgroundColor: "white",
											textAlign: "center",
										}}
									>
										{player.team}
									</div>
								</div>
							</Html>
						)}
					</Sphere>
				);
			})}
		</group>
	);
};
