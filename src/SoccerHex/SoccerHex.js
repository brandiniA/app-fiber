import React, { forwardRef } from "react";

import { Canvas } from "@react-three/fiber";
import { CameraManager } from "./CameraManager";
import { SoccerField } from "./SoccerField/SoccerField";
import SoccerMarkers from "./SoccerMarkers";
import SoccerPlayers from "./SoccerPlayers";
import SoccerFieldSegments from "./SoccerFieldSegments";
import {
	SoccerEventsManager,
	SoccerDebugManager,
	SoccerMarkersManager,
	SoccerInfoManager,
	SoccerHexagonsManager,
	SoccerPlayersManager,
} from "./SoccerManagers";
// import { SoccerHexagonsManager } from "./SoccerHexagonsManager";
// import { SoccerMarkersManager } from "./SoccerMarkersManager";
// import { SoccerPlayersManager } from "./SoccerPlayersManager";
// import { SoccerInfoManager } from "./SoccerInfoManager";
import { HexagonsInfo } from "../components/HexagonsInfo";
import Events from "../components/Events";
import { SoccerFieldCoordinates } from "./SoccerFieldCoordinates";

export const MODE_1 = 0;
export const MODE_2 = 1;
export const MODE_3 = 2;
export const MODE_4 = 3;

export const HEX_MODE = {
	[MODE_1]: {
		radius: 1,
		layers: 44,
	},
	[MODE_2]: {
		radius: 2,
		layers: 24,
	},
	[MODE_3]: {
		radius: 3,
		layers: 15,
	},
	[MODE_4]: {
		radius: 4,
		layers: 12,
	},
};

export const SoccerHex = forwardRef(function SoccerHex(
	{ boundingWidth = 120, boundingHeight = 80, initialValues = {} },
	ref
) {
	return (
		<React.Fragment>
			<div
				style={{
					width: "100%",
					overflow: "hidden",
					height: "600px",
					backgroundColor: "black",
				}}
			>
				<SoccerHexagonsManager />
				<SoccerEventsManager />
				<SoccerPlayersManager />
				<SoccerMarkersManager />
				<SoccerInfoManager />
				<SoccerDebugManager />
				<Canvas
					onCreated={({ gl }) => {
						gl.localClippingEnabled = true;
					}}
					camera={{
						position: [0, 0, 100],
						fov: 50,
					}}
				>
					<React.Suspense fallback={null}>
						<SoccerField width={120} height={80} />

						<SoccerFieldSegments
							width={boundingWidth}
							height={boundingHeight}
						/>
						<SoccerFieldCoordinates
							width={boundingWidth}
							height={boundingHeight}
						/>
						<SoccerMarkers />
						<SoccerPlayers />
					</React.Suspense>
					<CameraManager />
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
		</React.Fragment>
	);
});
