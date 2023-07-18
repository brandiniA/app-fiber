/**
 * Create a hexagon segment for the soccer field
 * props:
 * 	radius: radius of the hexagon
 * 	color: color of the hexagon
 * 	position: position of the hexagon
 *  x: max value of x position of the hexagon based on the half width of the field
 *  y: max value of y position of the hexagon based on the half height of the field
 */

import { Vector3 } from "three";
import { create } from "zustand";
import GUI from "lil-gui";

export const useHexagons = create((set) => ({
	hexagons: [],
	addHexagon: (hexagon) =>
		set((state) => ({
			hexagons: [...state.hexagons, hexagon],
		})),
	setHexagons: (hexagons) =>
		set((state) => ({
			hexagons: hexagons,
		})),
	updateHexagon: (uuid, hexagon = {}) =>
		set((state) => {
			const hexagonIndex = state.hexagons.findIndex((hex) => hex.uuid === uuid);

			if (hexagonIndex === -1) return;

			const updatedHexagon = {
				...state.hexagons[hexagonIndex],
				...hexagon,
			};

			const updatedHexagons = [...state.hexagons];
			updatedHexagons[hexagonIndex] = updatedHexagon;

			return {
				hexagons: updatedHexagons,
			};
		}),
}));

export const useMarkers = create((set) => ({
	markers: [],
	addMarker: (marker) =>
		set((state) => ({
			markers: [...state.markers, marker],
		})),
	removeMarker: (marker) =>
		set((state) => ({
			markers: state.markers.filter((m) => m.id !== marker),
		})),
	setMarkers: (markers) =>
		set((state) => ({
			markers: markers,
		})),
	removeLastMarker: () =>
		set((state) => ({
			markers: state.markers.slice(0, state.markers.length - 1),
		})),
}));

export const useStatsBombData = create((set) => ({
	teams: [], // Pos1 = Home, Pos2 = Away
	statsBombData: [],
	setStatsBombData: (statsBombData) =>
		set((state) => ({
			statsBombData: statsBombData,
		})),
	setTeams: (teams) =>
		set((state) => ({
			teams: teams,
		})),
}));

// Store of players
export const usePlayers = create((set) => ({
	players: [],
	setPlayers: (players) =>
		set((state) => ({
			players: players,
		})),
	addPlayer: (player) =>
		set((state) => ({
			players: [...state.players, player],
		})),
}));

export const useEvents = create((set) => ({
	events: [],
	setEvents: (events) =>
		set((state) => ({
			events: events,
		})),
	addEvent: (event) =>
		set((state) => ({
			events: [...state.events, event],
		})),
}));

export const useCameraInteractor = create((set) => ({
	// isUpdated: false,
	updated: false,
	controlsState: {
		isControlled: false,
		moved: false,
		positionStart: new Vector3(),
		positionEnd: new Vector3(),
	},
	setIsControlled: (isControlled) =>
		set((state) => ({
			controlsState: {
				...state.controlsState,
				isControlled,
			},
		})),
	setMoved: (moved) =>
		set((state) => ({
			controlsState: {
				...state.controlsState,
				moved,
			},
		})),
	setPositionStart: (positionStart) =>
		set((state) => ({
			controlsState: {
				...state.controlsState,
				positionStart,
			},
		})),
	setPositionEnd: (positionEnd) =>
		set((state) => ({
			controlsState: {
				...state.controlsState,
				positionEnd,
			},
		})),
}));

export const useGui = create((set) => ({
	gui: new GUI(),
	setGui: (gui) =>
		set((state) => ({
			gui,
		})),
}));

export const useApp = create((set) => ({
	play: false,
	speed: 1,
	/**
	 * 0: normal mode -> hexagon radius is 1
	 * 1: hexagon mode -> hexagon radius is 2
	 * 2: hexagon mode -> hexagon radius is 3
	 * 3: hexagon mode -> hexagon radius is 4
	 */
	hexagonMode: 1,
	visibleAllPlayers: true,
	visibleHexagons: true,
	visibleCoordinates: true,
	setPlay: (play) =>
		set((state) => ({
			play: play,
		})),

	setSpeed: (speed) =>
		set((state) => ({
			speed,
		})),
	setHexagonMode: (hexagonMode) =>
		set((state) => ({
			hexagonMode,
		})),
	setVisibleHexagons: (visibleHexagons) =>
		set((state) => ({
			visibleHexagons,
		})),
	setVisibleAllPlayers: (visibleAllPlayers) =>
		set((state) => ({
			visibleAllPlayers,
		})),
	setVisibleCoordinates: (visibleCoordinates) =>
		set((state) => ({
			visibleCoordinates,
		})),
}));
