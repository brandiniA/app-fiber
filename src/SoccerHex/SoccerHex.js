import React, {
	forwardRef,
	useCallback,
	useContext,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";

import { Canvas } from "@react-three/fiber";
import { CameraManager } from "./CameraManager";
import { SoccerField } from "./SoccerField/SoccerField";
import {
	generateRandomUUID,
	positionToRelative,
	relativeToPosition,
	sleepAsync,
} from "../utils";
import SoccerMarkers from "./SoccerMarkers";
import { Vector3 } from "three";
import SoccerPlayers from "./SoccerPlayers";
import { useStatsBomb } from "../api";
import { useGui } from "../store";
import GUI from "lil-gui";
import { SoccerEventsManager } from "./SoccerEventsManager";
import { SoccerHexagonsManager } from "./SoccerHexagonsManager";
import { SoccerMarkersManager } from "./SoccerMarkersManager";
import { SoccerPlayersManager } from "./SoccerPlayersManager";
import { SoccerInfoManager } from "./SoccerInfoManager";
import { HexagonsInfo } from "../components/HexagonsInfo";
import Events from "../components/Events";
import { create } from "zustand";
import { SoccerDebugManager } from "./SoccerDebugManager";

export const MODE_1 = 0;
export const MODE_2 = 1;
export const MODE_3 = 2;
export const MODE_4 = 3;

export const HEX_MODE = {
	[MODE_1]: {
		radius: 1,
		layers: 44,
	},
	[MODE_2]: {
		radius: 2,
		layers: 22,
	},
	[MODE_3]: {
		radius: 3,
		layers: 15,
	},
	[MODE_4]: {
		radius: 4,
		layers: 12,
	},
};

const soccerHexDefaultValues = {
	// Play the animation
	play: false,
	// Speed of the animation
	speed: 1, // 0.1 => 10
	visibleCoordinates: true,
	loadingHexagons: false,
	hexagonsInfo: {},
	// Hexagons selected by the user. List of uuids
	selectedHexagons: {}, // => { [uuid]: true] }
	// Hexagons
	hexagonMode: 1, // 0 => 1 radius, 1 => 2 radius, 2 => 3 radius, 3 => 4 radius
	visibleHexagons: true,
	hexagons: [],
	// Index of the current event
	eventIndex: null,
	events: [],
	ball: null,
	match: null,
	visiblePlayers: true,
	players: [],
	visibleMarkers: true,
	markers: [],
};

export const useSoccerHex = create((set) => ({
	...soccerHexDefaultValues,
	// Methods
	setDefault: () =>
		set((state) => ({
			...soccerHexDefaultValues,
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
	setBall: (ball) =>
		set((state) => ({
			...state,
			ball,
		})),
}));

// export const useSoccerHex = (callback) => {
// 	const soccerContext = useContext(SoccerContext);

// 	return callback ? callback(soccerContext) : soccerContext;
// };

// export const SoccerContext = React.createContext({
// 	play: false, // Play the animation
// 	speed: 1, // 0.1 => 10
// 	visibleCoordinates: true,
// 	// Hexagons
// 	visibleHexagons: true,
// 	loadingHexagons: false,
// 	hexagonMode: 1, // 0 => 1 radius, 1 => 2 radius, 2 => 3 radius, 3 => 4 radius
// 	hexagons: [],
// 	/**
// 	 * This is a variable used to count when a event occurs and the hexagon is selected
// 	 * Object with the following structure:
// 	 * key: uuid of the hexagon
// 	 * value = {
// 	 * 		count: number of times an event occurs and the hexagon is selected
// 	 *  	players: = {
// 	 * 			[uuid]: {
// 	 * 				events: []
// 	 *              totalPoints: 0
// 	 *
// 	 * 			}
// 	 * 		}
// 	 * }
// 	 *
// 	 */
// 	hexagonsInfo: {},
// 	// Hexagons selected by the user. List of uuids
// 	selectedHexagons: {}, // => { [uuid]: true] }
// 	// Events
// 	eventIndex: null,
// 	events: [],
// 	// Match
// 	homeTeam: null,
// 	awayTeam: null,
// 	// Players
// 	visiblePlayers: true,
// 	players: [],
// 	// Markers
// 	visibleMarkers: true,
// 	markers: [],
// 	// Ball
// 	ball: null,

// 	// Methods
// 	setHexagonMode: () => {},
// 	addSelectedHexagon: () => {},
// 	removeSelectedHexagon: () => {},
// 	setMarkers: () => {},
// 	setPlayers: () => {},
// 	setBall: () => {},
// });

const SoccerHex = forwardRef(function SoccerHex(
	{
		boundingWidth = 120,
		boundingHeight = 80,
		initialValues = {},
		// players = [],
	},
	ref
) {
	return (
		<React.Fragment>
			<div
				style={{
					width: "100%",
					overflow: "hidden",
					height: "600px",
					backgroundColor: "black",
				}}
			>
				<SoccerHexagonsManager />
				<SoccerEventsManager />
				<SoccerPlayersManager />
				<SoccerMarkersManager />
				<SoccerInfoManager />
				<SoccerDebugManager />
				<Canvas>
					<React.Suspense fallback={null}>
						<SoccerField width={120} height={80} />
						<SoccerMarkers />
						<SoccerPlayers />
					</React.Suspense>
					<CameraManager />
				</Canvas>
			</div>
			<div
				style={{
					width: "100%",
					display: "flex",
					flexDirection: "row",
				}}
			>
				<div style={{ flex: 1 }}>
					<HexagonsInfo />
				</div>
				<div style={{ flex: 1 }}>
					<Events />
				</div>
			</div>
		</React.Fragment>
	);
});

export default SoccerHex;
