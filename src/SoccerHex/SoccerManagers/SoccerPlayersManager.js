import { useCallback } from "react";
import { useSoccerEvents, useSoccerPlayers } from "../store";
import { generateRandomUUID } from "../../utils";
import useDeepCompareEffect from "../../hooks/useDeepCompareEffect";
import { shallow } from "zustand/shallow";

export const SoccerPlayersManager = () => {
	// const { homeTeam, events, eventIndex, setPlayers } = useSoccerHex(
	// 	(state) => ({
	// 		homeTeam: state.homeTeam,
	// 		events: state.events,
	// 		eventIndex: state.eventIndex,
	// 		setPlayers: state.setPlayers,
	// 	})
	// );

	const { homeTeam, events, eventIndex } = useSoccerEvents(
		(state) => ({
			events: state.events,
			eventIndex: state.eventIndex,
			homeTeam: state.homeTeam,
		}),
		shallow
	);

	const { setPlayers } = useSoccerPlayers(
		(state) => ({
			setPlayers: state.setPlayers,
		}),
		shallow
	);

	// Set players based on the current event index
	const setPlayersFromEvents = useCallback(() => {
		const event = events[eventIndex];

		if (!event || (event && event.players.length === 0)) return;

		const defaultPlayerState = {
			minute: event.minute,
			second: event.second,
			time: `${event.minute}:${event.second}`,
		};

		console.log("event", event);
		setPlayers(
			event.players.map((player) => ({
				uuid: generateRandomUUID(),
				color: homeTeam === player.team ? "red" : "blue",
				...defaultPlayerState,
				...player,
			}))
		);
	}, [eventIndex, events, setPlayers, homeTeam]);

	useDeepCompareEffect(() => {
		setPlayersFromEvents();
	}, [eventIndex, events]);

	return null;
};
