import axios from "axios";
import { useCallback, useEffect } from "react";
import { useStatsBombData } from "../store";
import { Vector2, Vector3 } from "three";
import { relativeToPosition } from "../utils";

const api = axios.create({
	baseURL: "http://localhost:8000/api/",
});

// api.interceptors.request.use(async (config) => {
// 	const token = localStorage.getItem("token");
// 	if (token) {
// 		config.headers.Authorization = `Bearer ${token}`;
// 	}
// 	return config;
// });

export const useStatsBomb = () => {
	const {
		setStatsBombData,
		setTeams,
	} = useStatsBombData((state) =>  ({
		setStatsBombData: state.setStatsBombData,
		setTeams: state.setTeams,
	}));

	const fetch = useCallback(async () => {
		const res = await api.get("soccer/statsbomb/test", {});
		const { team_a: teamA, team_b: teamB, events } = res.data;
		setTeams([teamA, teamB]);
	
		setStatsBombData(
			events.map(({
				players,
				event_uuid: eventUUID,
				...data
			}) => {
				return {
					eventUUID,
					players: players.map(({ location, position, ...rest }) => {
						const relpos = new Vector2(location[0], location[1]);
						const pos = relativeToPosition(relpos, 120, 80);
						return {
							...rest,
							playerPosition: position,
							position: pos,
							relativePosition: relpos,
							location,
						} 
					}),
					time: `${data.minute}:${data.second}}`,
					...data
				}
			})
		);
	}, [setStatsBombData, setTeams]);

	return fetch
};

// export const useGetLineupDetail = () => {
// 	const fetch = useCallback(async () => {
// 		api.get("football/match/lineup/detail", {});
// 	}, []);

// 	useEffect(() => {
// 		fetch();
// 	}, []);
// };
