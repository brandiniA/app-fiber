import React, { FC, useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { initStencilMaterials } from "./initStencilMaterials";

const forwardVector = new THREE.Vector3(0, 0, 1);

const Stencil = ({ clippingPlane, children }) => {
	const groupRef = useRef(null);
	const planeMeshRef = useRef();

	useEffect(() => {
		const [frontFaceStencilMat, backFaceStencilMat, planeStencilMat] =
			initStencilMaterials();

		// Front faces will always fail the stencil test, and increment the buffer up to 1.
		// This means that the back faces will be clipped.
		frontFaceStencilMat.clippingPlanes = [clippingPlane];
		// Back faces will always pass the stencil test, and decrement the buffer back to 0.
		// This means that the front faces will be clipped.
		backFaceStencilMat.clippingPlanes = [clippingPlane];

		// Group all the objects in the scene together
		const group = groupRef.current;

		// Traverse the group and set the clipping planes on all the meshes
		// Traverse means to visit every node in the tree and perform an operation on it.
		group.traverse((node) => {
			if (!(node instanceof THREE.Mesh)) return;
			node.material.clippingPlanes = [clippingPlane];
		});

		// Clone the group and set the materials to the stencil materials
		const front = group.clone();
		front.traverse((node) => {
			if (!(node instanceof THREE.Mesh)) return;
			node.material = frontFaceStencilMat;
		});

		// Clone the group and set the materials to the stencil materials
		const back = group.clone();
		back.traverse((node) => {
			if (!(node instanceof THREE.Mesh)) return;
			node.material = backFaceStencilMat;
		});

		// Create a plane to fill the clipped region
		const planeGeom = new THREE.PlaneGeometry();
		const planeMesh = new THREE.Mesh(planeGeom, planeStencilMat);
		planeMesh.quaternion.setFromUnitVectors(
			forwardVector,
			clippingPlane.normal
		);
		planeMesh.scale.setScalar(100);
		planeMesh.renderOrder = 1;
		planeMeshRef.current = planeMesh;
		planeMesh.position.copy(
			clippingPlane.normal.clone().multiplyScalar(-clippingPlane.constant)
		);
		// Helper
		planeMesh.add(new THREE.ArrowHelper(clippingPlane.normal, 0, 1, 0xff0000));

		group.add(front, back, planeMesh);

		return () => {
			group.remove(front, back, planeMesh);
		};
	}, [clippingPlane]);

	useFrame(() => {
		planeMeshRef.current.position.copy(
			clippingPlane.normal.clone().multiplyScalar(-clippingPlane.constant)
		);
	});

	return <group ref={groupRef}>{children}</group>;
};

const clippingPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

const Knot = () => {
	// useEffect(() => {
	// 	const event = document.addEventListener("wheel", (e) => {
	// 		e.preventDefault();
	// 		clippingPlane.constant += e.deltaY * 0.0001;
	// 	});
	// 	return () => {
	// 		document.removeEventListener("wheel", event);
	// 	};
	// }, []);

	return (
		<Stencil clippingPlane={clippingPlane}>
			<mesh position={[0, 0, 0]}>
				<torusKnotGeometry args={[0.4, 0.15, 220, 60]} />
				<meshStandardMaterial color="hotpink" />
			</mesh>
			<mesh position={[1, 0, 0]}>
				<torusKnotGeometry args={[0.4, 0.15, 220, 60]} />
				<meshStandardMaterial color="hotpink" />
			</mesh>
			<mesh position={[2, 0, 0]}>
				<torusKnotGeometry args={[0.4, 0.15, 220, 60]} />
				<meshStandardMaterial color="hotpink" />
			</mesh>
			<mesh position={[2, 0, 1]}>
				<torusKnotGeometry args={[0.4, 0.15, 220, 60]} />
				<meshStandardMaterial color="hotpink" />
			</mesh>
		</Stencil>
	);
};

export const ClippingScene = () => {
	return (
		<div
			style={{
				width: "100%",
				overflow: "hidden",
				height: "600px",
				backgroundColor: "black",
			}}
		>
			<Canvas
				dpr={[1, 2]}
				camera={{ position: [1, 0, 2] }}
				onCreated={({ gl }) => {
					gl.localClippingEnabled = true;
				}}
			>
				<ambientLight intensity={0.5} />
				<spotLight
					position={[10, 10, 10]}
					angle={0.15}
					penumbra={1}
					castShadow
				/>
				<OrbitControls minDistance={1} maxDistance={10} enableZoom={false} />
				<Knot />
			</Canvas>
		</div>
	);
};
