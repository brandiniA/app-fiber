import React, { useState, useCallback, useMemo, useRef } from "react";
import {
	createHexagonGeometry,
	setPoligonVertices,
} from "../../helpers/geometry";
import { useSoccerHex } from "../SoccerHex";
import { SoccerMarker } from "../SoccerMarkers";
import StencilBox from "../../Scenes/StencilBox";
import * as THREE from "three";
// import { SegmentMarker } from "./SegmentMarker";
// import { useApp } from "../../store";

export const SoccerFieldSegment = ({
	selected = false,
	uuid,
	radius,
	color,
	position,
	onPointerUp,
	renderOrder,
	clippedMaterial,
}) => {
	const geometry = useRef(createHexagonGeometry(radius));
	const visibleHexagons = useSoccerHex((state) => state.visibleHexagons);
	const refMesh = useRef();
	// This component is drawn using a custom buffer geometry
	const [isHovered, setIsHovered] = useState(false);
	// const visibleHexagons = useApp((state) => state.visibleHexagons);

	const handleOnPointerOver = (e) => setIsHovered(true);
	const handleOnPointerOut = (e) => setIsHovered(false);
	const handlePointerUp = (e) => onPointerUp(e);

	const $opacity = useMemo(() => {
		if (isHovered) return 0.7;
		// return 1;
		return 0.05;
	}, [isHovered]);

	return (
		<React.Fragment>
			<mesh
				ref={refMesh}
				castShadow
				receiveShadow
				position={position}
				uuid={uuid}
				onPointerOver={handleOnPointerOver}
				onPointerOut={handleOnPointerOut}
				onPointerUp={handlePointerUp}
				geometry={geometry.current}
				renderOrder={6}
			>
				<meshBasicMaterial
					transparent
					// wireframe
					visible={visibleHexagons}
					opacity={$opacity}
					{...clippedMaterial}
					color={isHovered ? "gray" : color}
				/>
			</mesh>
			{selected && (
				<SoccerMarker
					radius={radius}
					position={position}
					color={isHovered ? "black" : color}
					opacity={0.7}
					clippedMaterial={clippedMaterial}
				/>
			)}
		</React.Fragment>
	);
};
