import React, { useCallback, useRef, useEffect } from "react";
import { Sphere, Html } from "@react-three/drei";
import { useApp, usePlayers, useStatsBombData, useHexagons, useMarkers, useEvents } from "../../store";
import useDeepCompareEffect from "../../hooks/useDeepCompareEffect";
import { generateRandomUUID, sleepAsync } from "../../utils";
import { Vector3 } from "three";

export const PlayersPositions = () => {
	const statsBombData = useStatsBombData((state) => state.statsBombData);   

	const { players, setPlayers } = usePlayers((state) => ({
        players: state.players,
        setPlayers: state.setPlayers,
    }));

    const setMarkers = useMarkers((state) => state.setMarkers);
    const updateHexagon = useHexagons((state) => state.updateHexagon);
    const addEvent = useEvents((state) => state.addEvent);

	const playersRef = useRef();

    // Method to start capturing the players positions
    const startCapturing = useCallback(async({
        eventIndex = 0,
        hexagonMode = 0
    }) => {
        const play = useApp.getState().play;
        const speed = useApp.getState().speed;
        const hexagons = useHexagons.getState().hexagons;

        if (statsBombData.length === 0
            || eventIndex === statsBombData.length - 1
            || !play) {
            console.log("Stopped");
            return;
        }
        const nextEvent = statsBombData[eventIndex + 1];
        const event = statsBombData[eventIndex];
        console.log("event", event);
        addEvent({
            type: event.type,
            minute: event.minute,
            second: event.second,
            player: event.players.find((player) => player.actor === true)?.player,
        });

        let ms = 0
        if (nextEvent) {
            const nextPlayerTime = Number(nextEvent?.minute) * 60 + Number(nextEvent?.second);
            const currentPlayerTime = Number(event?.minute) * 60 + Number(event?.second);
            ms = (nextPlayerTime - currentPlayerTime) * 1000 / speed;
            if (ms < 0) ms = 0;
        }

        const defaultPlayerState = {
            minute: event.minute,
            second: event.second,
            time: `${event.minute}:${event.second}`,
        }

        const playersList = []

        for (let i = 0; i < event.players.length; i++) {
            const $player = event.players[i];
            playersList.push({
                uuid: generateRandomUUID(),
                ...$player, 
                ...defaultPlayerState,
            })
        }
        setPlayers(playersList);

        const markersList = []
        for (let i = 0; i < playersList.length; i++) {
            const $player = playersList[i];
            const hexagon = hexagons.find((hex) => hex.relativePosition.distanceTo($player.relativePosition) <= hex.radius);
            if (!hexagon) {
                console.log("No hexagon found for player", $player);
                continue;
            }
            // Update hexagon with player
            if (hexagon && $player.actor) {
                updateHexagon(hexagon.uuid, {
                    playersWithBall: hexagon.playersWithBall + 1,
                    playersWithBallList: [
                        ...hexagon.playersWithBallList,
                        {
                            uuid: $player.uuid,
                            player: $player.player,
                            minute: $player.minute,
                            second: $player.second,
                        }
                    ]
                })
            } else {
                updateHexagon(hexagon.uuid, {
                    players: hexagon.players + 1,
                    playersList: [
                        ...hexagon.playersList,
                        {
                            uuid: $player.uuid,
                            player: $player.player,
                            minute: $player.minute,
                            second: $player.second,
                        }
                    ]
                })
            }

            const markerIndex = markersList.findIndex((marker) => marker.hexagonUUID === hexagon.uuid);
            if (markerIndex === -1) {
                let color = $player.actor ? "red" : "blue";
                if ($player.keeper) color = "yellow";
                markersList.push({
                    uuid: generateRandomUUID(),
                    position: new Vector3(hexagon.position.x, hexagon.position.y, hexagon.position.z + 0.5),
                    relativePosition: hexagon.relativePosition,
                    color,
                    radius: hexagon.radius,
                    hexagonUUID: hexagon.uuid,
                }); 
            } else if (markerIndex !== -1 && $player.actor) {
                markersList[markerIndex].color = "red";
            }
            
        }
        setMarkers(markersList);
        if (!useApp.getState().play) {
            console.log("Stopped");
            return;
        }
        await sleepAsync(ms / speed);

        return startCapturing({ eventIndex: eventIndex + 1 });
    }, [statsBombData, setPlayers, setMarkers, updateHexagon, addEvent, useApp, useHexagons]);

    useDeepCompareEffect(() => {
        if (statsBombData.length > 0) {
            console.log("Starting capturing");
            startCapturing({
                eventIndex: 0,
            });
        }
    }, [statsBombData]);

	return (
		<group ref={playersRef}>
			{players.map((player, index) => {
				return (
					<Sphere key={player.uuid} position={player.position} args={[0.5, 32, 32]}>
						<meshBasicMaterial color="yellow" />
						{player.actor && <Html>
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
                            </div>
                        </Html>}
					</Sphere>
				);
			})}
		</group>
	);
};
