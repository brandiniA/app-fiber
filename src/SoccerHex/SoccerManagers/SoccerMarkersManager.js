import { useCallback } from "react";
import { useSoccerEvents, useSoccerHexagons, useSoccerMarkers } from "../store";
import { generateRandomUUID } from "../../utils";
import { Vector3 } from "three";
import useDeepCompareEffect from "../../hooks/useDeepCompareEffect";
import { shallow } from "zustand/shallow";

export const SoccerMarkersManager = () => {
	const { hexagons } = useSoccerHexagons(
		(state) => ({
			homeTeam: state.homeTeam,
			hexagons: state.hexagons,
		}),
		shallow
	);

	const { setMarkers } = useSoccerMarkers(
		(state) => ({
			setMarkers: state.setMarkers,
		}),
		shallow
	);

	const { events, eventIndex, homeTeam } = useSoccerEvents(
		(state) => ({
			events: state.events,
			eventIndex: state.eventIndex,
			homeTeam: state.homeTeam,
		}),
		shallow
	);

	// Set markes based on the players
	const setMarkersFromEvents = useCallback(() => {
		if (hexagons === 0) return;
		// If current index has no players look for the previous one until we find one
		let index = eventIndex;
		while (
			index >= 0 &&
			(!events[index] || events[index]?.players.length === 0)
		) {
			index--;
		}

		const event = events[index];
		if (!event) return;

		const markers = event.players.reduce((acc, player) => {
			const { relativePosition } = player;
			const hexagon = hexagons.find(
				(hexagon) =>
					hexagon.relativePosition.distanceTo(relativePosition) < hexagon.radius
			);
			if (!hexagon) {
				console.warn("No hexagon found for player", player);
				return acc;
			}

			const markerIndex = acc.findIndex(
				(marker) => marker.hexagonUUID === hexagon.uuid
			);

			if (markerIndex === -1) {
				let color = homeTeam === player.team ? "red" : "blue";
				if (player.actor) color = "aqua";
				acc.push({
					uuid: generateRandomUUID(),
					position: new Vector3(
						hexagon.position.x,
						hexagon.position.y,
						hexagon.position.z + 0.5
					),
					relativePosition: hexagon.relativePosition,
					player,
					color,
					radius: hexagon.radius,
					hexagonUUID: hexagon.uuid,
					isPlayer: true,
					opacity: 1,
					actor: player.actor,
				});
			} else if (markerIndex !== -1 && player.actor) {
				acc[markerIndex] = {
					...acc[markerIndex],
					actor: player.actor,
					color: "aqua",
					player,
				};
			}
			return acc;
		}, []);

		setMarkers(markers);
	}, [events, eventIndex, hexagons, setMarkers, homeTeam]);

	useDeepCompareEffect(() => {
		setMarkersFromEvents();
	}, [events, eventIndex, hexagons]);
	return null;
};
