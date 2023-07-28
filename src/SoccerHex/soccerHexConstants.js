export const FORMATION_1 = 0;
export const FORMATION_2 = 1;
export const FORMATION_3 = 2;
export const FORMATION_4 = 3;
export const FORMATION_5 = 4;
export const FORMATION_6 = 5;
export const FORMATION_7 = 6;
export const FORMATION_8 = 7;
export const FORMATION_9 = 8;
export const FORMATION_10 = 9;
export const FORMATION_11 = 10;
export const FORMATION_12 = 11;
export const FORMATION_13 = 12;

export const SOCCER_FORMATIONS = {
	[FORMATION_1]: "3-4-3",
	[FORMATION_2]: "3-5-2",
	[FORMATION_3]: "4-2-4",
	[FORMATION_4]: "4-3-2-1",
	[FORMATION_5]: "4-3-3",
	[FORMATION_6]: "4-3-3 Attack",
	[FORMATION_7]: "4-4-2",
	[FORMATION_8]: "4-5-1",
	[FORMATION_9]: "5-2-3",
	[FORMATION_10]: "5-3-2",
	[FORMATION_11]: "5-4-1",
	[FORMATION_12]: "5-4-1 Diamond",
	[FORMATION_13]: "5-4-1 Flat",
};

const POSITION_KEEPER = "GK";
const POSITION_DEFENDER = "DEF";
const POSITION_MIDFIELDER = "MF";
const POSITION_FORWARD = "FW";

export const SOCCER_POSITIONS = {
	[POSITION_KEEPER]: {
		type: "Keeper",
		color: "gray",
	},
	[POSITION_DEFENDER]: {
		type: "Defender",
		color: "blue",
	},
	[POSITION_MIDFIELDER]: {
		type: "Midfielder",
		color: "yellow",
	},
	[POSITION_FORWARD]: {
		type: "Forward",
		color: "red",
	},
};

const KEEPER_POSITION = {
	id: 0,
	position: { x: -52, y: 0 },
	positionType: POSITION_KEEPER,
};

export const FORMATIONS_POSITIONS = {
	[FORMATION_1]: {
		name: "3-4-3",
		players: [
			KEEPER_POSITION,
			// Defenses
			{ id: 1, position: { x: -30, y: 20 }, positionType: POSITION_DEFENDER },
			{ id: 2, position: { x: -30, y: 0 }, positionType: POSITION_DEFENDER },
			{ id: 3, position: { x: -30, y: -20 }, positionType: POSITION_DEFENDER },
			// Midfielders
			{ id: 4, position: { x: -4, y: 30 }, positionType: POSITION_MIDFIELDER },
			{ id: 5, position: { x: -4, y: 10 }, positionType: POSITION_MIDFIELDER },
			{ id: 6, position: { x: -4, y: -10 }, positionType: POSITION_MIDFIELDER },
			{ id: 7, position: { x: -4, y: -30 }, positionType: POSITION_MIDFIELDER },
			// ...SOCCER_MIDFIELDERS_POSITIONS[MIDFIELDERS_4].players,
			// Forwards

			{ id: 8, position: { x: 24, y: 20 }, positionType: POSITION_FORWARD },
			{ id: 9, position: { x: 36, y: 0 }, positionType: POSITION_FORWARD },
			{ id: 10, position: { x: 24, y: -20 }, positionType: POSITION_FORWARD },
			// ...SOCCER_FORWARDS_POSITIONS[FORWARDS_3].players,
		],
	},
	[FORMATION_2]: {
		name: "3-5-2",
		players: [
			KEEPER_POSITION,
			// Defenses
			{ id: 1, position: { x: -30, y: 20 }, positionType: POSITION_DEFENDER },
			{ id: 2, position: { x: -30, y: 0 }, positionType: POSITION_DEFENDER },
			{ id: 3, position: { x: -30, y: -20 }, positionType: POSITION_DEFENDER },
			// Midfielders
			// ...SOCCER_MIDFIELDERS_POSITIONS[MIDFIELDERS_5].players,
			{ id: 4, position: { x: 14, y: 30 }, positionType: POSITION_MIDFIELDER },
			{ id: 5, position: { x: -8, y: 10 }, positionType: POSITION_MIDFIELDER },
			{ id: 6, position: { x: 14, y: 0 }, positionType: POSITION_MIDFIELDER },
			{ id: 7, position: { x: -8, y: -10 }, positionType: POSITION_MIDFIELDER },
			{ id: 8, position: { x: 14, y: -30 }, positionType: POSITION_MIDFIELDER },
			// Forwards
			{ id: 9, position: { x: 38, y: 10 }, positionType: POSITION_FORWARD },
			{ id: 10, position: { x: 38, y: -10 }, positionType: POSITION_FORWARD },
			// ...SOCCER_FORWARDS_POSITIONS[FORWARDS_2].players.map((player) => ({
			// 	...player,
			// 	position: {
			// 		...player.position,
			// 		x: player.position.x + 10,
			// 	},
			// })),
		],
	},
	[FORMATION_3]: {
		name: "4-2-4",
		players: [
			KEEPER_POSITION,
			// Defenses
			{ id: 1, position: { x: -30, y: 30 }, positionType: POSITION_DEFENDER },
			{ id: 2, position: { x: -30, y: 10 }, positionType: POSITION_DEFENDER },
			{ id: 3, position: { x: -30, y: -10 }, positionType: POSITION_DEFENDER },
			{ id: 4, position: { x: -30, y: -30 }, positionType: POSITION_DEFENDER },
			// ...SOCCER_DEFENSES_POSITIONS[DEFENSES_4].players,
			// Midfielders
			{ id: 5, position: { x: -4, y: 12 }, positionType: POSITION_MIDFIELDER },
			{ id: 6, position: { x: -4, y: -12 }, positionType: POSITION_MIDFIELDER },
			// ...SOCCER_MIDFIELDERS_POSITIONS[MIDFIELDERS_2].players,
			// Forwards
			{ id: 7, position: { x: 24, y: 28 }, positionType: POSITION_FORWARD },
			{ id: 8, position: { x: 36, y: 10 }, positionType: POSITION_FORWARD },
			{ id: 9, position: { x: 36, y: -10 }, positionType: POSITION_FORWARD },
			{ id: 10, position: { x: 24, y: -28 }, positionType: POSITION_FORWARD },
			// ...SOCCER_FORWARDS_POSITIONS[FORWARDS_4].players,
		],
	},
	[FORMATION_4]: {
		name: "4-3-2-1",
		players: [
			KEEPER_POSITION,
			// Defenses
			{ id: 1, position: { x: -30, y: 30 }, positionType: POSITION_DEFENDER },
			{ id: 2, position: { x: -30, y: 10 }, positionType: POSITION_DEFENDER },
			{ id: 3, position: { x: -30, y: -10 }, positionType: POSITION_DEFENDER },
			{ id: 4, position: { x: -30, y: -30 }, positionType: POSITION_DEFENDER },
			// ...SOCCER_DEFENSES_POSITIONS[DEFENSES_4].players,
			// Midfielders
			{ id: 5, position: { x: -4, y: 20 }, positionType: POSITION_MIDFIELDER },
			{ id: 6, position: { x: -4, y: 0 }, positionType: POSITION_MIDFIELDER },
			{ id: 7, position: { x: -4, y: -20 }, positionType: POSITION_MIDFIELDER },
			// ...SOCCER_MIDFIELDERS_POSITIONS[MIDFIELDERS_4].players,
			// Forwards
			{ id: 8, position: { x: 24, y: 20 }, positionType: POSITION_FORWARD },
			{ id: 9, position: { x: 36, y: 0 }, positionType: POSITION_FORWARD },
			{ id: 10, position: { x: 24, y: -20 }, positionType: POSITION_FORWARD },
			// ...SOCCER_FORWARDS_POSITIONS[FORWARDS_3].players,
		],
	},
	[FORMATION_5]: {
		name: "4-3-3",
		players: [
			KEEPER_POSITION,
			// Defenses
			{ id: 1, position: { x: -30, y: 30 }, positionType: POSITION_DEFENDER },
			{ id: 2, position: { x: -30, y: 10 }, positionType: POSITION_DEFENDER },
			{ id: 3, position: { x: -30, y: -10 }, positionType: POSITION_DEFENDER },
			{ id: 4, position: { x: -30, y: -30 }, positionType: POSITION_DEFENDER },
			// ...SOCCER_DEFENSES_POSITIONS[DEFENSES_4].players,
			// Midfielders
			{ id: 5, position: { x: -4, y: 20 }, positionType: POSITION_MIDFIELDER },
			{ id: 6, position: { x: -4, y: 0 }, positionType: POSITION_MIDFIELDER },
			{ id: 7, position: { x: -4, y: -20 }, positionType: POSITION_MIDFIELDER },
			// ...SOCCER_MIDFIELDERS_POSITIONS[MIDFIELDERS_4].players,
			// ...SOCCER_MIDFIELDERS_POSITIONS[MIDFIELDERS_3].players,
			// Forwards
			{ id: 8, position: { x: 24, y: 20 }, positionType: POSITION_FORWARD },
			{ id: 9, position: { x: 36, y: 0 }, positionType: POSITION_FORWARD },
			{ id: 10, position: { x: 24, y: -20 }, positionType: POSITION_FORWARD },
			// ...SOCCER_FORWARDS_POSITIONS[FORWARDS_3].players,
		],
	},
	[FORMATION_6]: {
		name: "4-3-3 Attack",
		players: [
			KEEPER_POSITION,
			// Defenses
			{ id: 1, position: { x: -30, y: 30 }, positionType: POSITION_DEFENDER },
			{ id: 2, position: { x: -30, y: 10 }, positionType: POSITION_DEFENDER },
			{ id: 3, position: { x: -30, y: -10 }, positionType: POSITION_DEFENDER },
			{ id: 4, position: { x: -30, y: -30 }, positionType: POSITION_DEFENDER },
			// ...SOCCER_DEFENSES_POSITIONS[DEFENSES_4].players,
			// Midfielders
			{ id: 5, position: { x: -4, y: 20 }, positionType: POSITION_MIDFIELDER },
			{ id: 6, position: { x: 4, y: 0 }, positionType: POSITION_MIDFIELDER },
			{ id: 7, position: { x: -4, y: -20 }, positionType: POSITION_MIDFIELDER },
			// ...SOCCER_MIDFIELDERS_POSITIONS[MIDFIELDERS_3].players.map((player) => ({
			// 	...player,
			// 	position: {
			// 		...player.position,
			// 		x:
			// 			player.position.y === 0
			// 				? player.position.x + 10
			// 				: player.position.x,
			// 	},
			// Forwards
			{ id: 8, position: { x: 24, y: 20 }, positionType: POSITION_FORWARD },
			{ id: 9, position: { x: 36, y: 0 }, positionType: POSITION_FORWARD },
			{ id: 10, position: { x: 24, y: -20 }, positionType: POSITION_FORWARD },
			// })),
			// ...SOCCER_FORWARDS_POSITIONS[FORWARDS_3].players.map((player) => ({
			// 	...player,
			// 	position: {
			// 		...player.position,
			// 		y:
			// 			player.position.y !== 0
			// 				? player.position.y * 1.5
			// 				: player.position.y,
			// 	},
			// })),
		],
	},
	[FORMATION_7]: {
		name: "4-4-2",
		players: [
			KEEPER_POSITION,
			// Defenses
			{ id: 1, position: { x: -30, y: 30 }, positionType: POSITION_DEFENDER },
			{ id: 2, position: { x: -30, y: 10 }, positionType: POSITION_DEFENDER },
			{ id: 3, position: { x: -30, y: -10 }, positionType: POSITION_DEFENDER },
			{ id: 4, position: { x: -30, y: -30 }, positionType: POSITION_DEFENDER },
			// ...SOCCER_DEFENSES_POSITIONS[DEFENSES_4].players,
			// Midfielders
			{ id: 5, position: { x: -4, y: 30 }, positionType: POSITION_MIDFIELDER },
			{ id: 6, position: { x: -4, y: 10 }, positionType: POSITION_MIDFIELDER },
			{ id: 7, position: { x: -4, y: -10 }, positionType: POSITION_MIDFIELDER },
			{ id: 8, position: { x: -4, y: -30 }, positionType: POSITION_MIDFIELDER },
			// ...SOCCER_MIDFIELDERS_POSITIONS[MIDFIELDERS_4].players,
			// Forwards
			{ id: 9, position: { x: 24, y: 10 }, positionType: POSITION_FORWARD },
			{ id: 10, position: { x: 24, y: -10 }, positionType: POSITION_FORWARD },
			// ...SOCCER_FORWARDS_POSITIONS[FORWARDS_2].players,
		],
	},
	[FORMATION_8]: {
		name: "4-5-1",
		players: [
			KEEPER_POSITION,
			// Defenses 4
			{ id: 1, position: { x: -30, y: 30 }, positionType: POSITION_DEFENDER },
			{ id: 2, position: { x: -30, y: 10 }, positionType: POSITION_DEFENDER },
			{ id: 3, position: { x: -30, y: -10 }, positionType: POSITION_DEFENDER },
			{ id: 4, position: { x: -30, y: -30 }, positionType: POSITION_DEFENDER },
			// Midfielders 5
			{ id: 5, position: { x: 14, y: 30 }, positionType: POSITION_MIDFIELDER },
			{ id: 6, position: { x: -8, y: 10 }, positionType: POSITION_MIDFIELDER },
			{ id: 7, position: { x: 14, y: 0 }, positionType: POSITION_MIDFIELDER },
			{ id: 8, position: { x: -8, y: -10 }, positionType: POSITION_MIDFIELDER },
			{ id: 9, position: { x: 14, y: -30 }, positionType: POSITION_MIDFIELDER },
			// Forwards 1
			{ id: 10, position: { x: 38, y: 0 }, positionType: POSITION_FORWARD },
			// ...SOCCER_FORWARDS_POSITIONS[FORWARDS_1].players,
		],
	},
	[FORMATION_9]: {
		name: "5-2-3",
		players: [
			KEEPER_POSITION,
			// Defenses
			{ id: 1, position: { x: -30, y: 32 }, positionType: POSITION_DEFENDER },
			{ id: 2, position: { x: -30, y: 16 }, positionType: POSITION_DEFENDER },
			{ id: 3, position: { x: -30, y: 0 }, positionType: POSITION_DEFENDER },
			{ id: 4, position: { x: -30, y: -16 }, positionType: POSITION_DEFENDER },
			{ id: 5, position: { x: -30, y: -32 }, positionType: POSITION_DEFENDER },
			// ...SOCCER_DEFENSES_POSITIONS[DEFENSES_5].players,
			// Midfielders
			{ id: 6, position: { x: -4, y: 10 }, positionType: POSITION_MIDFIELDER },
			{ id: 7, position: { x: -4, y: -10 }, positionType: POSITION_MIDFIELDER },
			// ...SOCCER_MIDFIELDERS_POSITIONS[MIDFIELDERS_3].players,
			// Forwards
			{ id: 8, position: { x: 24, y: 20 }, positionType: POSITION_FORWARD },
			{ id: 9, position: { x: 36, y: 0 }, positionType: POSITION_FORWARD },
			{ id: 10, position: { x: 24, y: -20 }, positionType: POSITION_FORWARD },
		],
	},
	[FORMATION_10]: {
		name: "5-3-2",
		players: [
			KEEPER_POSITION,
			// Defenses
			{ id: 1, position: { x: -30, y: 32 }, positionType: POSITION_DEFENDER },
			{ id: 2, position: { x: -30, y: 16 }, positionType: POSITION_DEFENDER },
			{ id: 3, position: { x: -30, y: 0 }, positionType: POSITION_DEFENDER },
			{ id: 4, position: { x: -30, y: -16 }, positionType: POSITION_DEFENDER },
			{ id: 5, position: { x: -30, y: -32 }, positionType: POSITION_DEFENDER },
			// Midfielders
			{ id: 6, position: { x: -4, y: 20 }, positionType: POSITION_MIDFIELDER },
			{ id: 7, position: { x: -4, y: 0 }, positionType: POSITION_MIDFIELDER },
			{ id: 8, position: { x: -4, y: -20 }, positionType: POSITION_MIDFIELDER },
			// Forwards
			{ id: 9, position: { x: 24, y: 10 }, positionType: POSITION_FORWARD },
			{ id: 10, position: { x: 24, y: -10 }, positionType: POSITION_FORWARD },
		],
	},
	[FORMATION_11]: {
		name: "5-4-1",
		players: [
			KEEPER_POSITION,
			// Defenses
			{ id: 1, position: { x: -30, y: 32 }, positionType: POSITION_DEFENDER },
			{ id: 2, position: { x: -30, y: 16 }, positionType: POSITION_DEFENDER },
			{ id: 3, position: { x: -30, y: 0 }, positionType: POSITION_DEFENDER },
			{ id: 4, position: { x: -30, y: -16 }, positionType: POSITION_DEFENDER },
			{ id: 5, position: { x: -30, y: -32 }, positionType: POSITION_DEFENDER },
			// ...SOCCER_DEFENSES_POSITIONS[DEFENSES_5].players,
			// Midfielders
			{ id: 6, position: { x: -4, y: 30 }, positionType: POSITION_MIDFIELDER },
			{ id: 7, position: { x: -4, y: 10 }, positionType: POSITION_MIDFIELDER },
			{ id: 8, position: { x: -4, y: -10 }, positionType: POSITION_MIDFIELDER },
			{ id: 9, position: { x: -4, y: -30 }, positionType: POSITION_MIDFIELDER },
			// Forwards
			{ id: 10, position: { x: 24, y: 0 }, positionType: POSITION_FORWARD },
		],
	},
	[FORMATION_12]: {
		name: "5-4-1 Diamond",
		players: [
			KEEPER_POSITION,
			// Defenses
			{ id: 1, position: { x: -30, y: 32 }, positionType: POSITION_DEFENDER },
			{ id: 2, position: { x: -30, y: 16 }, positionType: POSITION_DEFENDER },
			{ id: 3, position: { x: -30, y: 0 }, positionType: POSITION_DEFENDER },
			{ id: 4, position: { x: -30, y: -16 }, positionType: POSITION_DEFENDER },
			{ id: 5, position: { x: -30, y: -32 }, positionType: POSITION_DEFENDER },
			// ...SOCCER_DEFENSES_POSITIONS[DEFENSES_5].players,
			// Midfielders
			{ id: 6, position: { x: 12, y: 30 }, positionType: POSITION_MIDFIELDER },
			{ id: 7, position: { x: -4, y: 0 }, positionType: POSITION_MIDFIELDER },
			{ id: 8, position: { x: 26, y: 0 }, positionType: POSITION_MIDFIELDER },
			{ id: 9, position: { x: 12, y: -30 }, positionType: POSITION_MIDFIELDER },
			// Forwards
			{ id: 10, position: { x: 50, y: 0 }, positionType: POSITION_FORWARD },
		],
	},
	[FORMATION_13]: {
		name: "5-4-1 Flat",
		players: [
			KEEPER_POSITION,
			// Defenses
			// ...SOCCER_DEFENSES_POSITIONS[DEFENSES_5].players,
			{ id: 1, position: { x: -30, y: 32 }, positionType: POSITION_DEFENDER },
			{ id: 2, position: { x: -30, y: 16 }, positionType: POSITION_DEFENDER },
			{ id: 3, position: { x: -30, y: 0 }, positionType: POSITION_DEFENDER },
			{ id: 4, position: { x: -30, y: -16 }, positionType: POSITION_DEFENDER },
			{ id: 5, position: { x: -30, y: -32 }, positionType: POSITION_DEFENDER },
			// Midfielders
			{ id: 6, position: { x: -4, y: 30 }, positionType: POSITION_MIDFIELDER },
			{ id: 7, position: { x: -4, y: 12 }, positionType: POSITION_MIDFIELDER },
			{ id: 8, position: { x: -4, y: -12 }, positionType: POSITION_MIDFIELDER },
			{ id: 9, position: { x: -4, y: -30 }, positionType: POSITION_MIDFIELDER },
			// Forwards
			{ id: 10, position: { x: 24, y: 0 }, positionType: POSITION_FORWARD },
		],
	},
};
