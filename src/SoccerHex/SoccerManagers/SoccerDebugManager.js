import { useCallback, useEffect, useRef } from "react";
import { useGui } from "../../store";
import GUI from "lil-gui";
import { MODE_1, MODE_2, MODE_3, MODE_4 } from "../SoccerHex";
import {
	useSoccerDemo,
	useSoccerEvents,
	useSoccerHexagons,
	useSoccerInfo,
	useSoccerMarkers,
	useSoccerPlayers,
} from "../store";
import { useStatsBomb } from "../../api";
import { shallow } from "zustand/shallow";

export const SoccerDebugManager = () => {
	const initDebug = useRef(false);

	const fetch = useStatsBomb();
	// Demo
	const { setSpeed, setPlay, setVisibleCoordinates } = useSoccerDemo(
		(state) => ({
			setSpeed: state.setSpeed,
			setPlay: state.setPlay,
			setVisibleCoordinates: state.setVisibleCoordinates,
		}),
		shallow
	);
	// Events
	const { setEvents, setEventIndex } = useSoccerEvents(
		(state) => ({
			setEvents: state.setEvents,
			setEventIndex: state.setEventIndex,
		}),
		shallow
	);
	// Hexagons
	const { setHexagonMode, setVisibleHexagons } = useSoccerHexagons(
		(state) => ({
			setHexagonMode: state.setHexagonMode,
			setVisibleHexagons: state.setVisibleHexagons,
		}),
		shallow
	);

	const { setPlayers, setVisiblePlayers } = useSoccerPlayers(
		(state) => ({
			setPlayers: state.setPlayers,
			setVisiblePlayers: state.setVisiblePlayers,
		}),
		shallow
	);

	const { setMarkers, setVisibleMarkers } = useSoccerMarkers(
		(state) => ({
			setMarkers: state.setMarkers,
			setVisibleMarkers: state.setVisibleMarkers,
		}),
		shallow
	);

	const { clearHexagonInfo } = useSoccerInfo(
		(state) => ({
			clearHexagonInfo: state.clearHexagonInfo,
		}),
		shallow
	);

	// const {
	// 	setHexagonMode,
	// 	setEvents,
	// 	setEventIndex,
	// 	setPlayers,
	// 	setMarkers,
	// 	setVisiblePlayers,
	// 	setVisibleHexagons,
	// 	setVisibleCoordinates,
	// 	setVisibleMarkers,
	// 	setSpeed,
	// 	setPlay,
	// 	clearHexagonInfo,
	// } = useSoccerHex((state) => ({
	// 	setHexagonMode: state.setHexagonMode,
	// 	setEvents: state.setEvents,
	// 	setEventIndex: state.setEventIndex,
	// 	setPlayers: state.setPlayers,
	// 	setMarkers: state.setMarkers,
	// 	setVisiblePlayers: state.setVisiblePlayers,
	// 	setVisibleHexagons: state.setVisibleHexagons,
	// 	setVisibleCoordinates: state.setVisibleCoordinates,
	// 	setVisibleMarkers: state.setVisibleMarkers,
	// 	setSpeed: state.setSpeed,
	// 	setPlay: state.setPlay,
	// 	clearHexagonInfo: state.clearHexagonInfo,
	// }));
	// Debug
	const setGui = useGui((state) => state.setGui);

	const setUpGUI = useCallback(() => {
		const gui = new GUI();
		setGui(gui);

		const folder = gui.addFolder("Live");

		const playButton = folder
			.add(
				{
					play() {
						setEvents({
							events: [],
							homeTeam: null,
							awayTeam: null,
						});
						setPlayers([]);
						setMarkers([]);
						fetch();
						setPlay(true);
						setEventIndex(0);
						playButton.disable();
						stopButton.enable();
						resetButton.enable();
					},
				},
				"play"
			)
			.name("Start");

		const stopButton = folder
			.add(
				{
					pause() {
						setPlay(false);
						playButton.enable();
						stopButton.disable();
					},
				},
				"pause"
			)
			.name("Stop")
			.disable();

		const resetButton = folder
			.add(
				{
					reset() {
						setPlay(false);
						setEvents({
							events: [],
							homeTeam: null,
							awayTeam: null,
						});
						setPlayers([]);
						setMarkers([]);
						clearHexagonInfo();
						resetButton.disable();
						playButton.enable();
						stopButton.disable();
					},
				},
				"reset"
			)
			.disable();

		folder
			.add(
				{
					speed: 1,
				},
				"speed"
			)
			.min(0.1)
			.max(10)
			.step(0.1)
			.onChange((value) => {
				setSpeed(value);
			});

		// Boolean to show all players
		folder
			.add(
				{
					setVisibleAllPlayers: true,
				},
				"setVisibleAllPlayers"
			)
			.onChange((value) => {
				setVisiblePlayers(value);
			});

		folder
			.add(
				{
					setVisibleHexagons: true,
				},
				"setVisibleHexagons"
			)
			.onChange((value) => {
				setVisibleHexagons(value);
			});

		folder
			.add(
				{
					setVisibleCoordinates: true,
				},
				"setVisibleCoordinates"
			)
			.onChange((value) => {
				setVisibleCoordinates(value);
			});

		folder
			.add(
				{
					setVisibleMarkers: true,
				},
				"setVisibleMarkers"
			)
			.onChange((value) => {
				setVisibleMarkers(value);
			});

		const mode1 = folder
			.add(
				{
					setHexagonMode() {
						setHexagonMode(MODE_1);
						mode1.disable();
						mode2.enable();
						mode3.enable();
						mode4.enable();
					},
				},
				"setHexagonMode"
			)
			.name("Hexagon Mode 1");
		const mode2 = folder
			.add(
				{
					setHexagonMode() {
						setHexagonMode(MODE_2);
						mode1.enable();
						mode2.disable();
						mode3.enable();
						mode4.enable();
					},
				},
				"setHexagonMode"
			)
			.name("Hexagon Mode 2")
			.disable();

		const mode3 = folder
			.add(
				{
					setHexagonMode() {
						setHexagonMode(MODE_3);
						mode1.enable();
						mode2.enable();
						mode3.disable();
						mode4.enable();
					},
				},
				"setHexagonMode"
			)
			.name("Hexagon Mode 3");

		const mode4 = folder
			.add(
				{
					setHexagonMode() {
						setHexagonMode(MODE_4);
						mode1.enable();
						mode2.enable();
						mode3.enable();
						mode4.disable();
					},
				},
				"setHexagonMode"
			)
			.name("Hexagon Mode 4");
	}, []);

	useEffect(() => {
		if (initDebug.current) return;
		initDebug.current = true;
		setUpGUI();
	}, [initDebug.current]);
	return null;
};
