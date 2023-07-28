import React, { useState } from "react";
import { useSoccerHexagons, useSoccerInfo } from "../SoccerHex/store";
import { EVENTS_TO_SHOW } from "../SoccerHex/SoccerManagers/SoccerInfoManager";

export const HexagonsInfo = () => {
	const [tabSelected, setTabSelected] = useState("hexagons");
	const hexagons = useSoccerHexagons((state) => state.hexagons);
	const hexagonsInfo = useSoccerInfo((state) =>
		Object.keys(state.hexagonsInfo).map((key) => ({
			hexagonUUID: key,
			...state.hexagonsInfo[key],
		}))
	);

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
				<div style={{ marginRight: "6px" }}>{hexagonsInfo.length}</div>
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
										{EVENTS_TO_SHOW.map((event) => (
											<th key={event}>{event.slice(0, 4)}</th>
										))}
										<th>Total</th>
									</tr>
								</thead>
								<tbody>
									{hexagonsInfo.map((hexagonWithPlayer) => (
										<tr
											key={hexagonWithPlayer.hexagonUUID}
											style={{ border: "1px solid black" }}
										>
											<td
												style={tdStyle}
											>{`${hexagonWithPlayer.hexagonUUID.slice(
												0,
												8
											)}...${hexagonWithPlayer.hexagonUUID.slice(-4)}`}</td>
											{EVENTS_TO_SHOW.map((event) => (
												<td key={event} style={tdStyle}>
													{hexagonWithPlayer[event]}
												</td>
											))}
											<td style={tdStyle}>{hexagonWithPlayer.total}</td>
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
									{/* {players.map((hexagonWithPlayer) => (
										<tr
											key={hexagonWithPlayer.key}
											style={{ border: "1px solid black" }}
										>
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
									))} */}
								</tbody>
							</table>
						),
					}[tabSelected]
				}
			</div>
		</div>
	);
};
