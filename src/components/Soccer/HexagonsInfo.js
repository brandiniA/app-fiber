import React, { useMemo, useState } from "react";
import { useHexagons } from "../../store";

const FOUL_WON = "Foul Won";
const BALL_RECOVERY = "Ball Recovery";
const INTERCEPTION = "Interception";
const DRIBBLE = "Dribble";
const SHOT = "Shot";
const GOAL_KEEPER = "Goal Keeper";
const EVENTS_TO_SHOW = [
	FOUL_WON,
	BALL_RECOVERY,
	INTERCEPTION,
	DRIBBLE,
	SHOT,
	GOAL_KEEPER,
];

const EVENTS_POINTS = {
	[FOUL_WON]: 1,
	[BALL_RECOVERY]: 1,
	[INTERCEPTION]: 1,
	[DRIBBLE]: 1,
	[SHOT]: 1,
	[GOAL_KEEPER]: 1,
};

export const HexagonsInfo = () => {
	const [tabSelected, setTabSelected] = useState("hexagons");
	const hexagons = useHexagons((state) => state.hexagons);

	const hexagonsWithPlayers = useMemo(() => {
		const $hexagons = hexagons.filter(
			(hexagon) => hexagon.playersInHexagonCount > 0
		);

		const $hexagonsObj = $hexagons.reduce((acc, hexagon) => {
			Object.keys(hexagon.playersInHexagon).forEach((playerName) => {
				const player = hexagon.playersInHexagon[playerName];
				acc[`hexagon-${hexagon.uuid}-player-${playerName}`] = {
					...player,
					...player.events.reduce(
						(acc, event) => {
							if (EVENTS_TO_SHOW.includes(event.type)) {
								acc[event.type] += EVENTS_POINTS[event.type];
								acc.TotalPoints += EVENTS_POINTS[event.type];
							}
							return acc;
							// Sum total points
						},
						{
							...EVENTS_TO_SHOW.reduce(
								(acc, event) => ({ ...acc, [event]: 0 }),
								{}
							),
							TotalPoints: 0,
						}
					),
					hexagonUUID: hexagon.uuid,
					// playerUUID,
				};
			});
			return acc;
		}, {});

		return Object.keys($hexagonsObj)
			.map((key) => ({
				key,
				...$hexagonsObj[key],
			}))
			.sort((a, b) => b.name - a.name);
	}, [hexagons]);

	const players = useMemo(() => {
		return hexagons
			.filter((hexagon) => hexagon.playersInHexagonCount > 0)
			.reduce((acc, hexagon) => {
				Object.keys(hexagon.playersInHexagon).forEach((playerName) => {
					const { team, position, events } =
						hexagon.playersInHexagon[playerName];
					const playerIndex = acc.findIndex(
						(player) => player.name === playerName
					);
					const eventsPoints = events.reduce(
						(acc, event) => {
							if (EVENTS_TO_SHOW.includes(event.type)) {
								acc[event.type] += EVENTS_POINTS[event.type];
								acc.TotalPoints += EVENTS_POINTS[event.type];
							}
							return acc;
							// Sum total points
						},
						{
							...EVENTS_TO_SHOW.reduce(
								(acc, event) => ({ ...acc, [event]: 0 }),
								{}
							),
							TotalPoints: 0,
						}
					);
					if (playerIndex === -1) {
						acc.push({
							name: playerName,
							team,
							position,
							...eventsPoints,
						});
					} else {
						const {
							[FOUL_WON]: foulWon,
							[BALL_RECOVERY]: ballRecovery,
							[INTERCEPTION]: interception,
							[DRIBBLE]: dribble,
							[SHOT]: shot,
							[GOAL_KEEPER]: goalKeeper,
							TotalPoints,
							...rest
						} = acc[playerIndex];
						acc[playerIndex] = {
							...rest,

							[FOUL_WON]: foulWon + eventsPoints[FOUL_WON],
							[BALL_RECOVERY]: ballRecovery + eventsPoints[BALL_RECOVERY],
							[INTERCEPTION]: interception + eventsPoints[INTERCEPTION],
							[DRIBBLE]: dribble + eventsPoints[DRIBBLE],
							[SHOT]: shot + eventsPoints[SHOT],
							[GOAL_KEEPER]: goalKeeper + eventsPoints[GOAL_KEEPER],
							TotalPoints: TotalPoints + eventsPoints.TotalPoints,
						};
					}
				});
				return acc;
			}, []);
		// return Object.values($playersObj);
	}, [hexagons]);

	const tdStyle = {
		border: "1px solid black",
		padding: "5px",
		fontSize: "1.2rem",
		textAlign: "center",
	};

	return (
		<div style={{ width: "100%" }}>
			<div
				style={{
					display: "flex",
					fontSize: "1.5rem",
					fontWeight: "bold",
					justifyContent: "center",
					padding: "10px 0",
					backgroundColor: "rgba(0, 0, 0, 0.5)",
					color: "white",
				}}
			>
				<div>Total Hexagons: </div>
				<div style={{ marginRight: "6px" }}>{hexagons.length}</div>
				<div>Radius:</div>
				<div>{hexagons[0]?.radius}</div>
			</div>
			<div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
				<button
					onClick={() => setTabSelected("hexagons")}
					style={{
						padding: "10px 20px",
						fontSize: "1.2rem",
						fontWeight: "bold",
						marginRight: "10px",
						width: "100%",
					}}
				>
					Hexagons
				</button>
				<button
					onClick={() => setTabSelected("players")}
					style={{
						padding: "10px 20px",
						fontSize: "1.2rem",
						fontWeight: "bold",
						marginLeft: "10px",
						width: "100%",
					}}
				>
					Players
				</button>
			</div>
			<div>
				{
					{
						hexagons: (
							<table
								style={{
									width: "100%",
									borderCollapse: "collapse",
									border: "1px solid black",
								}}
							>
								<thead>
									<tr
										style={{
											backgroundColor: "rgba(0, 0, 0, 0.5)",
											color: "white",
										}}
									>
										<th>Hexagon UUID</th>
										{/* <th>Player UUID</th> */}
										<th>Player</th>
										<th>Team</th>
										{EVENTS_TO_SHOW.map((event) => (
											<th key={event}>{event.slice(0, 4)}</th>
										))}
										<th>Total</th>
									</tr>
								</thead>
								<tbody>
									{hexagonsWithPlayers.map((hexagonWithPlayer) => (
										<tr
											key={hexagonWithPlayer.key}
											style={{ border: "1px solid black" }}
										>
											<td
												style={tdStyle}
											>{`${hexagonWithPlayer.hexagonUUID.slice(
												0,
												8
											)}...${hexagonWithPlayer.hexagonUUID.slice(-4)}`}</td>
											{/* <td>{hexagonWithPlayer.playerUUID}</td> */}
											<td style={tdStyle}>
												{hexagonWithPlayer.name.slice(0, 8)}
											</td>
											<td style={tdStyle}>
												{hexagonWithPlayer.team.slice(0, 3)}
											</td>
											{EVENTS_TO_SHOW.map((event) => (
												<td key={event} style={tdStyle}>
													{hexagonWithPlayer[event]}
												</td>
											))}
											<td style={tdStyle}>{hexagonWithPlayer.TotalPoints}</td>
										</tr>
									))}
								</tbody>
							</table>
						),
						players: (
							<table
								style={{
									width: "100%",
									borderCollapse: "collapse",
									border: "1px solid black",
								}}
							>
								<thead>
									<tr
										style={{
											backgroundColor: "rgba(0, 0, 0, 0.5)",
											color: "white",
										}}
									>
										<th>Player</th>
										<th>Team</th>
										{EVENTS_TO_SHOW.map((event) => (
											<th key={event}>{event.slice(0, 4)}</th>
										))}
										<th>Total</th>
									</tr>
								</thead>
								<tbody>
									{players.map((hexagonWithPlayer) => (
										<tr
											key={hexagonWithPlayer.key}
											style={{ border: "1px solid black" }}
										>
											{/* <td>{hexagonWithPlayer.playerUUID}</td> */}
											<td style={tdStyle}>{hexagonWithPlayer.name}</td>
											<td style={tdStyle}>
												{hexagonWithPlayer.team.slice(0, 3)}
											</td>
											{EVENTS_TO_SHOW.map((event) => (
												<td key={event} style={tdStyle}>
													{hexagonWithPlayer[event]}
												</td>
											))}
											<td style={tdStyle}>{hexagonWithPlayer.TotalPoints}</td>
										</tr>
									))}
								</tbody>
							</table>
						),
					}[tabSelected]
				}
			</div>
		</div>
	);
};
