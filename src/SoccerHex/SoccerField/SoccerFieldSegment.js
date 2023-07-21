import React, { useState, useCallback, useMemo, useRef } from "react";
import { setPoligonVertices } from "../../helpers/geometry";
import { useSoccerHex } from "../SoccerHex";
import { SoccerMarker } from "../SoccerMarkers";
// import { SegmentMarker } from "./SegmentMarker";
// import { useApp } from "../../store";

export const SoccerFieldSegment = ({
	selected = false,
	uuid,
	radius,
	color,
	position,
	onPointerUp,
}) => {
	const visibleHexagons = useSoccerHex((state) => state.visibleHexagons);
	const refMesh = useRef();
	// This component is drawn using a custom buffer geometry
	const [isHovered, setIsHovered] = useState(false);
	// const visibleHexagons = useApp((state) => state.visibleHexagons);

	const { positions, normals, uvs, indices } = useMemo(() => {
		const segments = 6;
		const vertices = setPoligonVertices(radius, segments);
		return vertices;
	}, [radius]);

	const handleOnPointerOver = () => setIsHovered(true);
	const handleOnPointerOut = (e) => setIsHovered(false);
	const handlePointerUp = (e) => onPointerUp(e);

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
				// visible={true}
			>
				<bufferGeometry>
					<bufferAttribute
						attach="attributes-position"
						array={positions}
						count={positions.length / 3}
						itemSize={3}
					/>
					<bufferAttribute
						attach="attributes-normal"
						array={normals}
						count={normals.length / 3}
						itemSize={3}
					/>
					<bufferAttribute
						attach="attributes-uv"
						array={uvs}
						count={uvs.length / 2}
						itemSize={2}
					/>
					<bufferAttribute
						attach="index"
						array={indices}
						count={indices.length}
						itemSize={1}
					/>
				</bufferGeometry>
				<meshBasicMaterial
					color={isHovered ? "black" : color}
					transparent
					wireframe={true}
					opacity={visibleHexagons ? 1 : 0}
				/>
			</mesh>
			{selected && (
				<SoccerMarker
					radius={radius}
					position={position}
					color={"blue"}
					opacity={0.3}
				/>
			)}
		</React.Fragment>
	);
};
