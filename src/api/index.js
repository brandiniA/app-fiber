import axios from "axios";
import { useCallback, useEffect } from "react";
import { usePlayers } from "../store";
import { Vector3 } from "three";

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
	const setInitialPlayers = usePlayers((state) => state.setInitialPlayers);

	const fetch = useCallback(async () => {
		const res = await api.get("soccer/statsbomb/test", {});
		setInitialPlayers(
			res.data.map((player) => ({
				...player,
				position: new Vector3(player.location[0], 0, player.location[1]),
			}))
		);
	}, [setInitialPlayers]);

	useEffect(() => {
		fetch();
	}, []);
};

// export const useGetLineupDetail = () => {
// 	const fetch = useCallback(async () => {
// 		api.get("football/match/lineup/detail", {});
// 	}, []);

// 	useEffect(() => {
// 		fetch();
// 	}, []);
// };
