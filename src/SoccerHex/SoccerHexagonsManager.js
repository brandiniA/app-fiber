import { useCallback, useEffect, useRef } from "react";
import { generateHexagons } from "../utils";
import { useSoccerHex, HEX_MODE } from "./SoccerHex";

// Component to Manage Hexagons
export const SoccerHexagonsManager = () => {
	const lastHexagonMode = useRef(null);
	const {
		loadingHexagons,
		hexagonMode,
		boundingWidth,
		boundingHeight,
		setHexagons,
	} = useSoccerHex((state) => ({
		loadingHexagons: state.loadingHexagons,
		hexagonMode: state.hexagonMode,
		boundingWidth: state.boundingWidth,
		boundingHeight: state.boundingHeight,
		setHexagons: state.setHexagons,
	}));

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
				boundingWidth,
				boundingHeight,
			});

			setHexagons(hexagons, false);
		},
		[loadingHexagons, boundingWidth, boundingHeight, setHexagons]
	);

	useEffect(() => {
		$generateHexagons(hexagonMode);
	}, [hexagonMode, $generateHexagons]);

	return null;
};
