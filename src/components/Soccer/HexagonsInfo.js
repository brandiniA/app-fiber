import React, { useMemo } from "react";
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
								acc.TotalPoins += EVENTS_POINTS[event.type];
							}
							return acc;
							// Sum total points
						},
						{
							...EVENTS_TO_SHOW.reduce(
								(acc, event) => ({ ...acc, [event]: 0 }),
								{}
							),
							TotalPoins: 0,
						}
					),
					hexagonUUID: hexagon.uuid,
					// playerUUID,
				};
			});
			return acc;
		}, {});

		return Object.keys($hexagonsObj).map((key) => ({
			key,
			...$hexagonsObj[key],
		}));
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
			<div>
				<table
					style={{
						width: "100%",
						borderCollapse: "collapse",
						border: "1px solid black",
					}}
				>
					<thead>
						<tr
							style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white" }}
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
								<td style={tdStyle}>{`${hexagonWithPlayer.hexagonUUID.slice(
									0,
									8
								)}...${hexagonWithPlayer.hexagonUUID.slice(-4)}`}</td>
								{/* <td>{hexagonWithPlayer.playerUUID}</td> */}
								<td style={tdStyle}>{hexagonWithPlayer.name.slice(0, 8)}</td>
								<td style={tdStyle}>{hexagonWithPlayer.team.slice(0, 3)}</td>
								{EVENTS_TO_SHOW.map((event) => (
									<td key={event} style={tdStyle}>
										{hexagonWithPlayer[event]}
									</td>
								))}
								<td style={tdStyle}>{hexagonWithPlayer.TotalPoins}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
