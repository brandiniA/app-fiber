import React from "react";
import { Plane } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { createRef, useMemo, useRef, useState } from "react";
import * as THREE from "three";

export const getClippedMat = (planes) => ({
	color: "red",
	clippingPlanes: planes,
	clipShadows: true,
	shadowSide: THREE.DoubleSide,
});
export const getPlaneMat = (plane) => ({
	color: "yellow",
	clippingPlanes: plane,
	stencilWrite: true,
	stencilRef: 0,
	stencilFunc: THREE.NotEqualStencilFunc,
	stencilFail: THREE.ReplaceStencilOp,
	stencilZFail: THREE.ReplaceStencilOp,
	stencilZPass: THREE.ReplaceStencilOp,
});
export function PlaneStencilGroup({
	geometry,
	plane,
	renderOrder,
	position = new THREE.Vector3(0, 0, 0),
}) {
	const mat = {
		depthWrite: false,
		depthTest: false,
		colorWrite: false,
		stencilWrite: true,
		stencilFunc: THREE.AlwaysStencilFunc,
	};
	const matBack = {
		...mat,
		side: THREE.BackSide,
		clippingPlanes: [plane],
		stencilFail: THREE.IncrementWrapStencilOp,
		stencilZFail: THREE.IncrementWrapStencilOp,
		stencilZPass: THREE.IncrementWrapStencilOp,
	};
	const matFront = {
		...mat,
		side: THREE.FrontSide,
		clippingPlanes: [plane],
		stencilFail: THREE.DecrementWrapStencilOp,
		stencilZFail: THREE.DecrementWrapStencilOp,
		stencilZPass: THREE.DecrementWrapStencilOp,
	};

	return (
		<group>
			<mesh geometry={geometry} renderOrder={renderOrder} position={position}>
				<meshBasicMaterial {...matFront} />
			</mesh>
			<mesh geometry={geometry} renderOrder={renderOrder} position={position}>
				<meshBasicMaterial {...matBack} />
			</mesh>
		</group>
	);
}

const StencilBox = ({
	children,
	geometry,
	boundingWidth = 120,
	boundingHeight = 80,
	boundingDepth = 10,
	offsetWidth = 0,
	offsetHeight = 0,
	...props
}) => {
	const ref = useRef();
	const halfWidth = boundingWidth * 0.5 + offsetWidth;
	const halfHeight = boundingHeight * 0.5 + offsetHeight;
	const halfDepth = boundingDepth * 0.5;
	const [planes] = useState(() => [[-halfWidth, 0,0], [halfWidth,0,0], [0,-halfHeight,0], [0,halfHeight,0], [0,0,-halfDepth], [0,0,halfDepth]].map(v => new THREE.Plane(new THREE.Vector3(...v), 1))) // prettier-ignore
	const [planeObjects] = useState(() => [
		createRef(),
		createRef(),
		createRef(),
		createRef(),
		createRef(),
		createRef(),
	]);

	useFrame(() => {
		// ref.current.rotation.x += 0.01;
		// ref.current.rotation.y += 0.01;
		planes.forEach((plane, i) => {
			const po = planeObjects[i].current;
			plane.coplanarPoint(po.position);
			po.lookAt(
				po.position.x - plane.normal.x,
				po.position.y - plane.normal.y,
				po.position.z - plane.normal.z
			);
		});
	});

	const $children = React.Children.map(children, (child, ci) => {
		if (React.isValidElement(child)) {
			const { position } = child.props;
			return React.cloneElement(child, {
				...child.props,
				clippedMaterial: getClippedMat(planes),
				renderOrder: ci + 6,
				position,
			});
		}
		return child;
	});

	return (
		<group>
			<group ref={ref}>{$children}</group>
			{/* {planes.map((p, i) => (
				<planeHelper key={`0${i}`} args={[p, 10, "red"]} />
			))} */}
			{planeObjects.map((planeRef, index) => (
				<Plane
					key={`0${index}`}
					ref={planeRef}
					args={[4, 4]}
					renderOrder={index + 1.1}
					onAfterRender={(gl) => gl.clearStencil()}
				>
					<meshStandardMaterial
						{...getPlaneMat(planes.filter((_, i) => i !== index))}
					/>
				</Plane>
			))}
		</group>
	);
};
export default StencilBox;
