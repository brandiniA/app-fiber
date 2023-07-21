import React, { useCallback, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useStatsBomb } from "../api";
import { SocckerMarkers } from "../components/Soccer/SocckerMarkers";
import { SoccerSegments } from "../components/Soccer/SoccerSegments";
import { SoccerField } from "../components/Soccer/SoccerField";
import { FieldPositions } from "../components/Soccer/FieldPositions";
import { PlayersPositions } from "../components/Soccer/PlayersPositions";

import {
	useApp,
	useEvents,
	useGui,
	useHexagons,
	useMarkers,
	usePlayers,
	useStatsBombData,
} from "../store";
import { CameraManager } from "../components/Soccer/CameraManager";
import Events from "../components/Soccer/Events";
import { HexagonsInfo } from "../components/Soccer/HexagonsInfo";

const Demo = (props) => {
	const init = useRef(false);
	const {
		setPlay,
		setSpeed,
		setVisibleAllPlayers,
		setHexagonMode,
		setVisibleHexagons,
		setVisibleCoordinates,
	} = useApp((state) => ({
		setPlay: state.setPlay,
		setSpeed: state.setSpeed,
		setVisibleAllPlayers: state.setVisibleAllPlayers,
		setHexagonMode: state.setHexagonMode,
		setVisibleHexagons: state.setVisibleHexagons,
		setVisibleCoordinates: state.setVisibleCoordinates,
	}));
	const setHexagons = useHexagons((state) => state.setHexagons);
	const setStatsBombData = useStatsBombData((state) => state.setStatsBombData);
	const setPlayers = usePlayers((state) => state.setPlayers);
	const setMarkers = useMarkers((state) => state.setMarkers);
	const setEvents = useEvents((state) => state.setEvents);
	const gui = useGui((state) => state.gui);
	const fetch = useStatsBomb();

	const setUpGui = useCallback(() => {
		const folder = gui.addFolder("Live");

		const reset = () => {
			setPlay(false);
			setStatsBombData([]);
			setPlayers([]);
			setMarkers([]);
			setEvents([]);
			resetButton.disable();
			playButton.enable();
			stopButton.disable();
		};

		const playButton = folder
			.add(
				{
					play() {
						reset();
						setPlay(true);
						fetch();
						playButton.disable();
						resetButton.enable();
						stopButton.enable();
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
						stopButton.disable();
						resetButton.disable();
						playButton.enable();
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
						reset();
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
				setVisibleAllPlayers(value);
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

		const mode1 = folder
			.add(
				{
					setHexagonMode() {
						setHexagons([]);
						setHexagonMode(0);
						reset();
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
						setHexagons([]);
						setHexagonMode(1);
						reset();
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
						setHexagons([]);
						setHexagonMode(2);
						reset();
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
						setHexagons([]);
						setHexagonMode(3);
						reset();
						mode1.enable();
						mode2.enable();
						mode3.enable();
						mode4.disable();
					},
				},
				"setHexagonMode"
			)
			.name("Hexagon Mode 4");
	}, [
		gui,
		setStatsBombData,
		setPlayers,
		fetch,
		setPlay,
		setSpeed,
		setVisibleAllPlayers,
		setEvents,
		setMarkers,
		setHexagonMode,
		setHexagons,
	]);

	useEffect(() => {
		if (init.current) return;
		init.current = true;
		setUpGui();
	}, [init.current]);

	// console.log("hexagons", hexagons.filter((hex) => hex.playersWithBallList.length > 0))

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				backgroundColor: "white",
			}}
		>
			<div
				style={{
					width: "100%",
					overflow: "hidden",
					height: "600px",
					backgroundColor: "black",
				}}
			>
				<Canvas>
					<React.Suspense fallback={null}>
						<ambientLight intensity={1} />
						<spotLight
							position={[10, 10, 10]}
							angle={0.15}
							penumbra={1}
							castShadow
						/>
						{/* <Stadium /> */}
						<axesHelper args={[5]} />
						<SocckerMarkers />
						<SoccerField width={120} height={80} />
						<SoccerSegments width={120} height={80} />
						<FieldPositions />
						<PlayersPositions />
						<CameraManager />
						{/* <CameraInteractor /> */}
					</React.Suspense>
					{/* <CameraInteractor /> */}
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
		</div>
	);
};

export default Demo;
