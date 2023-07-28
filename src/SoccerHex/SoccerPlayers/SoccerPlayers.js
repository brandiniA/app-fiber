import React, { useEffect } from "react";
import { Html, Cone, Plane, useTexture } from "@react-three/drei";
import { useSoccerPlayers } from "../store";
import { shallow } from "zustand/shallow";

export const SoccerPlayers = () => {
	const cursorRef = React.useRef();
	const { players, visiblePlayers } = useSoccerPlayers(
		(state) => ({
			players: state.players,
			visiblePlayers: state.visiblePlayers,
		}),
		shallow
	);
	// Set players based on the current event index
	const texture = useTexture("textures/player_cursor.jpg");

	useEffect(() => {
		const map = cursorRef.current?.material.alphaMap;
	}, []);

	return (
		<group>
			{players.map((player) => {
				return (
					<group key={player.uuid}>
						<Cone
							key={player.uuid}
							position={[player.position.x, player.position.y, 3]}
							args={[2, 5, 32, 32]}
							rotation={[-Math.PI / 2, 0, 0]}
						>
							<meshBasicMaterial
								color={player.color}
								visible={visiblePlayers}
							/>{" "}
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
						</Cone>
						<Plane
							ref={cursorRef}
							position={[player.position.x, player.position.y, 0.1]}
							args={[4, 4]}
						>
							<meshBasicMaterial
								color={player.actor ? "aqua" : player.color}
								visible={visiblePlayers}
								alphaMap={texture}
								transparent
							/>
						</Plane>
					</group>
				);
			})}
		</group>
	);
};
