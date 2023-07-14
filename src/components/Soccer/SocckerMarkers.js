import React, { useCallback, useRef } from "react";
import { Vector3 } from "three";
import useDeepCompareEffect from "../../hooks/useDeepCompareEffect";
import { SegmentMarker } from "./SegmentMarker";
import { sleepAsync } from "../../utils";
import { useMarkers, usePlayers, useHexagons } from "../../store";

export const SocckerMarkers = () => {
	const init = useRef(false);
	const { markers, addMarker, removeLastMarker } = useMarkers((state) => ({
		markers: state.markers,
		addMarker: state.addMarker,
		removeLastMarker: state.removeLastMarker,
	}));
	const players = usePlayers((state) => state.players);
	const hexagons = useHexagons((state) => state.hexagons);
	const loadPlayersToMarkers = useCallback(async () => {
		if (init.current) return;
		init.current = true;
		// const markers = hexagons
		// 	.map((hexagon) => {
		// 		const hexagonPos = new Vector3(...hexagon.position);
		// 		// const playersNearToHexagon = players.reduce((acc, player) => {
		// 		// 	const playerPos = new Vector3(...player.position);
		// 		// 	const distance = playerPos.distanceTo(hexagonPos);
		// 		// 	if (acc > distance) {
		// 		// 		return distance;
		// 		// 	}
		// 		// 	return acc;
		// 		// }, 1000);
		// 		const isNearPlayer = players.filter((player) => {
		// 			const playerPos = new Vector3(...player.position);
		// 			const distance = playerPos.distanceTo(hexagonPos);
		// 			return distance <= hexagon.radius;
		// 		});
		// 		console.log("isNearPlayer", isNearPlayer);
		// 		return {
		// 			...hexagon,
		// 			isNearPlayer: isNearPlayer.length > 0,
		// 			playerData: isNearPlayer[0],
		// 		};
		// 	})
		// 	.reduce((acc, hexagon) => {
		// 		if (hexagon.isNearPlayer) {
		// 			acc.push(hexagon);
		// 		}
		// 		return acc;
		// 	}, [])
		// 	.sort((a, b) => {
		// 		const secondsA = a.playerData.minute * 60 + a.playerData.seconds;
		// 		const secondsB = b.playerData.minute * 60 + b.playerData.seconds;
		// 		return secondsA - secondsB;
		// 	})
		// 	.reverse();
		const markers = players
			.map((player) => {
				const playerPos = new Vector3(...player.position);
				const hexagon = hexagons.find((hexagon) => {
					const hexagonPos = new Vector3(...hexagon.position);
					const distance = playerPos.distanceTo(hexagonPos);
					return distance <= hexagon.radius;
				});
				return {
					...hexagon,
					playerData: player,
				};
			})
			.sort((a, b) => {
				const secondsA = a.playerData.minute * 60 + a.playerData.seconds;
				const secondsB = b.playerData.minute * 60 + b.playerData.seconds;
				return secondsA - secondsB;
			});

		console.log("markers", markers);
		// .map(({ position, ...hexagon }) => {
		// 	return {
		// 		...hexagon,
		// 		color: "red",
		// 		position: new Vector3(position[0], position[1] + 0.5, position[2]),
		// 	};
		// });
		// console.log("markers", markers);
		for (let i = 0; i < markers.length; i++) {
			removeLastMarker();
			const marker = markers[i];
			addMarker({
				...marker,
				color: "red",
				position: new Vector3(
					marker.position[0],
					marker.position[1] + 0.5,
					marker.position[2]
				),
			});
			await sleepAsync(2000);
		}
	}, [players, hexagons, addMarker, removeLastMarker]);

	useDeepCompareEffect(() => {
		if (players.length > 0 && hexagons.length > 0) {
			loadPlayersToMarkers();
		}
	}, [players, hexagons]);

	return (
		<>
			{markers.map((marker) => {
				const [x, y, z] = marker.position;
				return (
					<SegmentMarker
						key={marker.id}
						radius={marker.radius}
						position={[x, y, z]}
						color={marker.color}
						playerData={marker?.playerData}
					/>
				);
			})}
		</>
	);
};
