import React, {
	useState,
	useCallback,
	useMemo,
	useRef,
	useEffect,
} from "react";
import { setPoligonVertices } from "../../helpers/geometry";
import { SegmentMarker } from "./SegmentMarker";
import { useApp } from "../../store";

export const SoccerSegment = ({
	title,
	uuid,
	radius,
	color,
	position,
	onPointerUp,
}) => {
	const refMesh = useRef();
	// This component is drawn using a custom buffer geometry
	const [isHovered, setIsHovered] = useState(false);
	const visibleHexagons = useApp((state) => state.visibleHexagons);

	const { positions, normals, uvs, indices } = useMemo(() => {
		const segments = 6;
		const vertices = setPoligonVertices(radius, segments);
		return vertices;
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
					color={isHovered ? "red" : color}
					transparent
					opacity={visibleHexagons ? 1 : 0}
					wireframe
				/>
			</mesh>
			{isHovered && (
				<SegmentMarker radius={radius} position={position} color={"white"} />
			)}
		</React.Fragment>
	);
};
