import React, { useMemo } from "react";

import { useSoccerFormation } from "../SoccerHex/store";
import { shallow } from "zustand/shallow";
import { FORMATIONS_POSITIONS } from "../SoccerHex/soccerHexConstants";
import { players } from "../dummyData";

const AssignPlayer = (props) => {
	const { selectedFormation, selectedPositionIndex, addPlayer } =
		useSoccerFormation(
			(state) => ({
				selectedFormation: state.selectedFormation,
				selectedPositionIndex: state.selectedPositionIndex,
				setFormation: state.setFormation,
				addPlayer: state.addPlayer,
			}),
			shallow
		);
	const positionData = useMemo(() => {
		return FORMATIONS_POSITIONS?.[selectedFormation]?.players?.[
			selectedPositionIndex
		];
	}, [selectedFormation, selectedPositionIndex]);
	return (
		<React.Fragment>
			<button onClick={() => addPlayer(0, players[0])}>Add player</button>
			{positionData && (
				<div>
					<select
						// value={null}
						style={{
							width: "100%",
							backgroundColor: "white",
							height: "40px",
						}}
						onChange={(e) => {
							const playerId = Number(e.target.value);
							const player = players.find((p) => p.id === playerId);
							addPlayer(selectedPositionIndex, player);
						}}
					>
						<option value={null}>Select a player</option>
						{players.map((player) => (
							<option key={`player-${player.id}`} value={player.id}>
								{player.name}
							</option>
						))}
					</select>
				</div>
			)}
		</React.Fragment>
	);
};

export default AssignPlayer;
