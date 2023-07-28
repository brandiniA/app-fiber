import { useCallback, useEffect, useRef } from "react";
import { generateHexagons } from "../../utils";
import { HEX_MODE } from "../SoccerHex";
import { useSoccerHexagons } from "../store";
import { shallow } from "zustand/shallow";
// Component to Manage Hexagons
export const SoccerHexagonsManager = () => {
	const lastHexagonMode = useRef(null);
	const { loadingHexagons, hexagonMode, setHexagons } = useSoccerHexagons(
		(state) => ({
			loadingHexagons: state.loadingHexagons,
			hexagonMode: state.hexagonMode,
			setHexagons: state.setHexagons,
		}),
		shallow
	);

	// HEXAGONS
	const $generateHexagons = useCallback(
		(hexagonMode) => {
			if (loadingHexagons) return;
			// Clear the hexagons if hexagonMode is different
			if (lastHexagonMode.current === hexagonMode) return;
			if (lastHexagonMode.current !== hexagonMode) {
				lastHexagonMode.current = hexagonMode;
				setHexagons([], true);
			}

			const hexagons = generateHexagons({
				radius: HEX_MODE[hexagonMode].radius,
				layers: HEX_MODE[hexagonMode].layers,
				position: [0, 0, 0],
				boundingWidth: 120,
				boundingHeight: 80,
			});

			setHexagons(hexagons, false);
		},
		[loadingHexagons, setHexagons]
	);

	useEffect(() => {
		$generateHexagons(hexagonMode);
	}, [hexagonMode, $generateHexagons]);

	return null;
};
