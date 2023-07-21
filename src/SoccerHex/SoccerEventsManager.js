import { useCallback, useEffect, useRef } from "react";
import useDeepCompareEffect from "../hooks/useDeepCompareEffect";
import { useStatsBombData } from "../store";
import { useSoccerHex } from "./SoccerHex";
import { sleepAsync } from "../utils";

// Component to Manage Events
export const SoccerEventsManager = () => {
	// const isCapturing = useRef(false);
	const lastEventIndex = useRef(null);
	const { events, setEvents, eventIndex, play, speed, setEventIndex } =
		useSoccerHex((state) => ({
			events: state.events,
			setEvents: state.setEvents,
			eventIndex: state.eventIndex,
			play: state.play,
			speed: state.speed,
			setEventIndex: state.setEventIndex,
		}));
	const { statsBombData, teams } = useStatsBombData((state) => ({
		teams: state.teams,
		statsBombData: state.statsBombData,
	}));

	// Set events
	const setEventsFromStatsBombData = useCallback(() => {
		setEvents({
			events: statsBombData.map((event) => ({
				type: event.type,
				minute: event.minute,
				second: event.second,
				players: event.players,
			})),
			homeTeam: teams[0],
			awayTeam: teams[1],
		});
	}, [statsBombData, teams, setEvents]);

	useDeepCompareEffect(() => {
		if (!statsBombData) return;
		setEventsFromStatsBombData();
	}, [statsBombData, teams]);

	const startCapturing = useCallback(async () => {
		if (
			!play ||
			events.length === 0 ||
			eventIndex === null ||
			eventIndex === lastEventIndex.current
		)
			return;

		lastEventIndex.current = eventIndex;

		const event = events[eventIndex];
		const nextEvent = events[eventIndex + 1];

		if (!event || !nextEvent) return;

		const eventCurrentTime = event.minute * 60 + event.second;
		const eventNextTime = nextEvent.minute * 60 + nextEvent.second;
		const eventTime = eventNextTime - eventCurrentTime;
		const eventTimeMs = eventTime * 1000;

		if (eventTimeMs <= 0) {
			setEventIndex(eventIndex + 1);
			return;
		}
		await sleepAsync(eventTimeMs / speed);
		setEventIndex(eventIndex + 1);
	}, [play, eventIndex, events, speed, setEventIndex]);

	useEffect(() => {
		startCapturing();
	}, [play, eventIndex, events]);

	return null;
};
