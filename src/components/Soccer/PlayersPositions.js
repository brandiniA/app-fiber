import React, { useCallback, useRef, useEffect } from "react";
import { Sphere, Html, Cone } from "@react-three/drei";
import {
	useApp,
	usePlayers,
	useStatsBombData,
	useHexagons,
	useMarkers,
	useEvents,
} from "../../store";
import useDeepCompareEffect from "../../hooks/useDeepCompareEffect";
import { generateRandomUUID, sleepAsync } from "../../utils";
import { Vector3 } from "three";
import { shallow } from "zustand/shallow";

const EVENTS_EXCLUDED = ["Pass", "Ball Receipt*", "Carry", "Pressure"];

export const PlayersPositions = () => {
	const { statsBombData, teams } = useStatsBombData(
		(state) => ({
			statsBombData: state.statsBombData,
			teams: state.teams,
		}),
		shallow
	);

	const { players, setPlayers } = usePlayers(
		(state) => ({
			players: state.players,
			setPlayers: state.setPlayers,
		}),
		shallow
	);

	const setMarkers = useMarkers((state) => state.setMarkers);
	const updateHexagon = useHexagons((state) => state.updateHexagon);
	const addEvent = useEvents((state) => state.addEvent);

	const playersRef = useRef();

	// Method to start capturing the players positions
	const startCapturing = useCallback(
		async ({ eventIndex = 0, hexagonMode = 0 }) => {
			const play = useApp.getState().play;
			const speed = useApp.getState().speed;
			// const hexagons = useHexagons.getState().hexagons;

			if (
				statsBombData.length === 0 ||
				eventIndex === statsBombData.length - 1 ||
				!play
			) {
				console.log("Stopped");
				return;
			}
			const nextEvent = statsBombData[eventIndex + 1];
			const event = statsBombData[eventIndex];

			if (!EVENTS_EXCLUDED.includes(event.type)) {
				addEvent({
					type: event.type,
					minute: event.minute,
					second: event.second,
					player: event.players.find((player) => player.actor === true),
				});
			}
			let ms = 0;
			if (nextEvent) {
				const nextPlayerTime =
					Number(nextEvent?.minute) * 60 + Number(nextEvent?.second);
				const currentPlayerTime =
					Number(event?.minute) * 60 + Number(event?.second);
				ms = ((nextPlayerTime - currentPlayerTime) * 1000) / speed;
				if (ms < 0) ms = 0;
			}

			const defaultPlayerState = {
				minute: event.minute,
				second: event.second,
				time: `${event.minute}:${event.second}`,
			};

			const playersList = [];

			for (let i = 0; i < event.players.length; i++) {
				const $player = event.players[i];
				const teamIndex = teams.findIndex((team) => team === $player.team);
				playersList.push({
					uuid: generateRandomUUID(),
					color: teamIndex === 0 ? "red" : "blue",
					...$player,
					...defaultPlayerState,
				});
			}
			if (playersList.length === 0) {
				await sleepAsync(ms / speed);
				return startCapturing({ eventIndex: eventIndex + 1 });
			}
			setPlayers(playersList);

			const markersList = [];
			for (let i = 0; i < playersList.length; i++) {
				const $player = playersList[i];
				const teamIndex = teams.findIndex((team) => team === $player.team);
				const hexagon = useHexagons
					.getState()
					.hexagons.find(
						(hex) =>
							hex.relativePosition.distanceTo($player.relativePosition) <=
							hex.radius
					);
				const selectedHexagons = useHexagons.getState().selectedHexagons;

				if (!hexagon) {
					console.log("No hexagon found for player", $player);
					continue;
				}
				// Update hexagon with player
				if (
					selectedHexagons?.[hexagon.uuid] &&
					$player.actor &&
					!EVENTS_EXCLUDED.includes(event.type)
				) {
					updateHexagon(hexagon.uuid, {
						playersInHexagonCount: hexagon.playersInHexagonCount + 1,
						playersInHexagon: {
							...hexagon.playersInHexagon,
							[$player.player]: {
								...(hexagon.playersInHexagon[$player.uuid] || {}),
								name: $player.player,
								position: $player.position,
								team: $player.team,
								count: (hexagon.playersInHexagon[$player.uuid]?.count ?? 0) + 1,
								events: [
									...(hexagon.playersInHexagon[$player.uuid]?.events ?? []),
									{
										type: event.type,
										minute: event.minute,
										second: event.second,
									},
								],
							},
						},
					});
				}

				const markerIndex = markersList.findIndex(
					(marker) => marker.hexagonUUID === hexagon.uuid
				);
				if (markerIndex === -1) {
					let color = teamIndex === 0 ? "blue" : "red";
					if ($player.actor) color = "aqua";
					if ($player.keeper) color = "yellow";

					markersList.push({
						uuid: generateRandomUUID(),
						position: new Vector3(
							hexagon.position.x,
							hexagon.position.y,
							hexagon.position.z + 0.5
						),
						playerData: $player,
						relativePosition: hexagon.relativePosition,
						color,
						radius: hexagon.radius,
						hexagonUUID: hexagon.uuid,
						isPlayer: true,
						opacity: 1,
						actor: $player.actor,
					});
				} else if (markerIndex !== -1 && $player.actor) {
					markersList[markerIndex] = {
						...markersList[markerIndex],
						color: "aqua",
						isPlayer: true,
						playerData: $player,
						actor: $player.actor,
					};
				}
			}
			setMarkers(markersList);
			if (!useApp.getState().play) {
				console.log("Stopped");
				return;
			}
			await sleepAsync(ms / speed);

			return startCapturing({ eventIndex: eventIndex + 1 });
		},
		[
			statsBombData,
			teams,
			setPlayers,
			setMarkers,
			updateHexagon,
			addEvent,
			useApp,
			useHexagons,
		]
	);

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
					<Cone
						key={player.uuid}
						position={player.position}
						args={[0.5, 2, 32, 32]}
					>
						<meshBasicMaterial color={player.color} />
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
				);
			})}
		</group>
	);
};
