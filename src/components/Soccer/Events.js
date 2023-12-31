import React from "react";
import { useEvents } from "../../store";

const Events = () => {
	const events = useEvents((state) => state.events);

	const tdStyle = {
		border: "1px solid black",
		padding: "5px",
		fontSize: "1.2rem",
		textAlign: "center",
	};

	return (
		<div
			style={{
				width: "100%",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					fontSize: "1.5rem",
					fontWeight: "bold",
				}}
			>
				<div>Argentina</div>
				<div style={{ margin: "0 10px" }}>vs</div>
				<div>Mexico</div>
			</div>
			<table
				style={{
					width: "100%",
					borderCollapse: "collapse",
					border: "1px solid black",
				}}
			>
				<thead>
					<tr>
						<th>Event</th>
						<th>Team</th>
						<th>Player</th>
						<th>Minute</th>
						<th>Second</th>
					</tr>
				</thead>
				<tbody>
					{events.map((event, index) => (
						<tr key={index}>
							<td style={tdStyle}>{event.type}</td>
							<td style={tdStyle}>{event?.player?.team}</td>
							<td style={tdStyle}>{event?.player?.player}</td>
							<td style={tdStyle}>{event.minute}</td>
							<td style={tdStyle}>{event.second}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Events;
