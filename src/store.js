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

export const usePlayers = create((set) => ({
	players: [],
	setInitialPlayers: (players) =>
		set((state) => ({
			players: players,
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
