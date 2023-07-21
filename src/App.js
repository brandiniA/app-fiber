import React, { useCallback, useEffect, useMemo, useRef } from "react";
import "./App.css";
import Demo from "./Scenes/Demo";
import { ClippingScene } from "./Scenes/ClippingScene";
import { ClippingScene2 } from "./Scenes/ClippingScene2";
import SoccerHex from "./SoccerHex";
import { useStatsBomb } from "./api";
import { useStatsBombData } from "./store";

function App() {
	return (
		<React.Fragment>
			{/* <Demo /> */}
			<SoccerHex />
			{/* <ClippingScene2 /> */}
		</React.Fragment>
	);
}

export default App;
