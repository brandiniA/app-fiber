import { useCallback } from "react";
import useDeepCompareEffect from "../../hooks/useDeepCompareEffect";
import { useSoccerEvents, useSoccerHexagons, useSoccerInfo } from "../store";
import { shallow } from "zustand/shallow";

const FOUL_WON = "Foul Won";
const CARRY = "Carry";
const BALL_RECOVERY = "Ball Recovery";
const INTERCEPTION = "Interception";
const DRIBBLE = "Dribble";
const SHOT = "Shot";
const GOAL_KEEPER = "Goal Keeper";

export const EVENTS_TO_SHOW = [
	CARRY,
	FOUL_WON,
	BALL_RECOVERY,
	INTERCEPTION,
	DRIBBLE,
	SHOT,
	GOAL_KEEPER,
];

const EVENTS_POINTS = {
	[CARRY]: 1,
	[FOUL_WON]: 1,
	[BALL_RECOVERY]: 1,
	[INTERCEPTION]: 1,
	[DRIBBLE]: 1,
	[SHOT]: 1,
	[GOAL_KEEPER]: 1,
};

export function SoccerInfoManager(props) {
	const {
		// hexagonsInfo,
		selectedHexagons,
		// events,
		// eventIndex,
		hexagons,
		// setHexagonInfo,
		// updateHexagonInfo,
	} = useSoccerHexagons(
		(state) => ({
			hexagonsInfo: state.hexagonsInfo,
			selectedHexagons: state.selectedHexagons,
			// events: state.events,
			// eventIndex: state.eventIndex,
			hexagons: state.hexagons,
			// setHexagonInfo: state.setHexagonInfo,
			// updateHexagonInfo: state.updateHexagonInfo,
		}),
		shallow
	);

	const { hexagonsInfo, setHexagonInfo, updateHexagonInfo } = useSoccerInfo(
		(state) => ({
			hexagonsInfo: state.hexagonsInfo,
			setHexagonInfo: state.setHexagonInfo,
			updateHexagonInfo: state.updateHexagonInfo,
		}),
		shallow
	);

	const { events, eventIndex } = useSoccerEvents(
		(state) => ({
			events: state.events,
			eventIndex: state.eventIndex,
		}),
		shallow
	);

	const registerHexagonInfo = useCallback(() => {
		const event = events[eventIndex];
		if (!event || (event && event.players.length === 0) || hexagons === 0)
			return;

		const player = event.players.find((player) => player.actor);
		if (!player) return;

		const hexagon = hexagons.find(
			(hexagon) =>
				hexagon.relativePosition.distanceTo(player.relativePosition) <=
				hexagon.radius
		);
		if (!hexagon) {
			console.warn("No hexagon found for player", player);
			return;
		}
		if (!selectedHexagons[hexagon.uuid] || !EVENTS_TO_SHOW.includes(event.type))
			return;

		const hexagonInfo = hexagonsInfo[hexagon.uuid];
		const eventsPoints = EVENTS_TO_SHOW.reduce(
			(acc, e) => ({
				...acc,
				[e]: 0,
			}),
			{ total: 0 }
		);

		if (!hexagonInfo) {
			if (eventsPoints[event.type] !== undefined) {
				const point = EVENTS_POINTS[event.type];
				eventsPoints[event.type] += point;
				eventsPoints["total"] += point;
			}

			setHexagonInfo(hexagon.uuid, {
				count: 1,
				events: [event.type],
				players: {
					[player.player]: eventsPoints,
				},
				...eventsPoints,
			});
		} else {
			const playerPoints = hexagonInfo.players[player.player] ?? eventsPoints;

			if (playerPoints[event.type] !== undefined) {
				const point = EVENTS_POINTS[event.type];
				playerPoints[event.type] += point;
				playerPoints["total"] += point;
			}

			Object.keys(playerPoints).forEach((key) => {
				hexagonInfo[key] += playerPoints[key];
			});

			updateHexagonInfo(hexagon.uuid, {
				...hexagonInfo,
				count: hexagonInfo.count + 1,
				events: [...hexagonInfo.events, event.type],
				players: {
					...hexagonInfo.players,
					[player.player]: playerPoints,
				},
			});
		}
	}, [
		events,
		eventIndex,
		hexagons,
		setHexagonInfo,
		updateHexagonInfo,
		selectedHexagons,
	]);

	useDeepCompareEffect(() => {
		registerHexagonInfo();
	}, [events, eventIndex, hexagons]);

	return null;
}
