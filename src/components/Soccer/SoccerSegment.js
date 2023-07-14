import React, { useState, useCallback, useMemo } from "react";
import { setPoligonVertices } from "../../helpers/geometry";
import { SegmentMarker } from "./SegmentMarker";

export const SoccerSegment = ({
	title,
	uuid,
	radius,
	color,
	position,
	onPointerUp,
}) => {
	// This component is drawn using a custom buffer geometry
	const [isHovered, setIsHovered] = useState(false);

	const { positions, normals, uvs, indices } = useMemo(() => {
		const segments = 6;
		return setPoligonVertices(radius, segments);
	}, [radius]);

	const handleOnPointerOver = useCallback((e) => {
		setIsHovered(true);
	}, []);

	const handleOnPointerOut = useCallback((e) => {
		setIsHovered(false);
	}, []);

	const handlePointerUp = useCallback(
		(e) => {
			onPointerUp(e);
		},
		[onPointerUp]
	);

	return (
		<React.Fragment>
			<mesh
				castShadow
				receiveShadow
				position={position}
				rotation={[-Math.PI / 2, 0, 0]}
				onPointerOver={handleOnPointerOver}
				onPointerOut={handleOnPointerOut}
				onPointerUp={handlePointerUp}
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
				<meshStandardMaterial color={isHovered ? "red" : color} wireframe />
			</mesh>
			{isHovered && (
				<SegmentMarker radius={radius} position={position} color={"white"} />
			)}
		</React.Fragment>
	);
};
