import React, { useMemo, useRef } from "react";
import { Sphere } from "@react-three/drei";
import { usePlayers } from "../../store";

export const PlayersPositions = () => {
	const players = usePlayers((state) => state.players);
	const playersRef = useRef();
	const $players = useMemo(() => {
		return players.map((player) => {
			return {
				position: player.position,
				player: player.player.split(" ")[0] + " " + player.player.split(" ")[1],
				time: player.minute + ":" + player.second,
			};
		});
	}, [players]);

	return (
		<group ref={playersRef}>
			{$players.map((player, index) => {
				return (
					<Sphere key={index} position={player.position} args={[0.5, 32, 32]}>
						<meshStandardMaterial color="yellow" />
						{/* <Html>
                            <div
                                style={{
                                    width: "100px",
                                    zIndex: 999,
                                    opacity: 0.3,
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: "aqua",
                                        // width: "50px",
                                        textAlign: "center",
                                    }}
                                >
                                    X:<span style={{}}>{player.position.x}</span>/Y:
                                    <span>{player.position.z}</span>
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
                            </div>
                        </Html> */}
					</Sphere>
				);
			})}
		</group>
	);
};
