import { create } from "zustand";
import { FORMATION_1 } from "./soccerHexConstants";

export const useSoccerHexagons = create((set) => ({
	selectedHexagons: {},
	hexagonMode: 1,
	visibleHexagons: true,
	hexagons: [],
	// Methods
	setHexagons: (hexagons, loadingHexagons = false) =>
		set((state) => ({
			...state,
			hexagons,
			loadingHexagons,
		})),
	setHexagonMode: (hexagonMode) =>
		set((state) => ({
			...state,
			hexagonMode,
		})),
	setVisibleHexagons: (visibleHexagons) =>
		set((state) => ({
			...state,
			visibleHexagons,
		})),
	addSelectedHexagon: (uuid) =>
		set((state) => ({
			...state,
			selectedHexagons: {
				...state.selectedHexagons,
				[uuid]: true,
			},
		})),
	removeSelectedHexagon: (uuid) =>
		set((state) => ({
			...state,
			selectedHexagons: Object.keys(state.selectedHexagons).reduce(
				(acc, key) => {
					if (key !== uuid) {
						acc[key] = true;
					}
					return acc;
				},
				{}
			),
		})),
	clearSelectedHexagons: () =>
		set((state) => ({
			...state,
			selectedHexagons: {},
		})),
}));

export const useSoccerEvents = create((set) => ({
	eventIndex: null,
	events: [],
	homeTeam: null,
	awayTeam: null,
	// Methods
	setEvents: ({ homeTeam, awayTeam, events }) =>
		set((state) => ({
			...state,
			events,
			homeTeam,
			awayTeam,
		})),
	setEventIndex: (eventIndex) =>
		set((state) => ({
			...state,
			eventIndex,
		})),
}));

export const useSoccerPlayers = create((set) => ({
	visiblePlayers: true,
	players: [],
	// Methods
	setPlayers: (players) =>
		set((state) => ({
			...state,
			players,
		})),
	setVisiblePlayers: (visiblePlayers) =>
		set((state) => ({
			...state,
			visiblePlayers,
		})),
}));

export const useSoccerMarkers = create((set) => ({
	visibleMarkers: true,
	markers: [],
	// Methods
	setMarkers: (markers) =>
		set((state) => ({
			...state,
			markers,
		})),
	setVisibleMarkers: (visibleMarkers) =>
		set((state) => ({
			...state,
			visibleMarkers,
		})),
}));

export const useSoccerInfo = create((set) => ({
	hexagonsInfo: {},
	// Methods
	setHexagonInfo: (hexagonUUID, hexagonInfo) =>
		set((state) => ({
			...state,
			hexagonsInfo: {
				...state.hexagonsInfo,
				[hexagonUUID]: hexagonInfo,
			},
		})),
	updateHexagonInfo: (hexagonUUID, hexagonInfo) =>
		set((state) => ({
			...state,
			hexagonsInfo: {
				...state.hexagonsInfo,
				[hexagonUUID]: {
					...state.hexagonsInfo[hexagonUUID],
					...hexagonInfo,
				},
			},
		})),
	clearHexagonInfo: () =>
		set((state) => ({
			...state,
			hexagonsInfo: {},
		})),
}));

export const useSoccerDemo = create((set) => ({
	// Play the animation
	play: false,
	// Speed of the animation
	speed: 1, // 0.1 => 10
	visibleCoordinates: true,
	// Methods
	setDefault: () =>
		set((state) => ({
			play: false,
			speed: 1,
			visibleCoordinates: true,
		})),
	setPlay: (play) =>
		set((state) => ({
			...state,
			play,
		})),
	setSpeed: (speed) =>
		set((state) => ({
			...state,
			speed,
		})),
	setVisibleCoordinates: (visibleCoordinates) =>
		set((state) => ({
			...state,
			visibleCoordinates,
		})),
}));

export const useSoccerFormation = create((set) => ({
	selectedFormation: FORMATION_1, // 0: 4-4-2, 1: 4-3-3, 2: 4-2-3-1, 3: 4-5-1, 4: 3-5-2, 5: 3-4-3, 6: 3-6-1, 7: 5-4-1, 8: 5-3-2
	// Index of the select position to assign a player
	selectedPositionIndex: null,
	// Assigned players
	players: {}, // { [id]: { id, name, positionType, country } }
	// Methods
	setFormation: (selectedFormation) =>
		set((state) => ({
			...state,
			selectedFormation,
		})),
	setSelectedPositionIndex: (selectedPositionIndex) =>
		set((state) => ({
			...state,
			selectedPositionIndex,
		})),
	addPlayer: (idPosition, player) =>
		set((state) => ({
			...state,
			players: {
				...state.players,
				[idPosition]: { ...player },
			},
			selectedPositionIndex: null,
		})),
	removePlayer: (idPosition) =>
		set((state) => ({
			...state,
			players: Object.keys(state.players).reduce((acc, key) => {
				if (Number(key) !== idPosition) {
					acc[key] = state.players[key];
				}
				return acc;
			}, {}),
		})),
}));
