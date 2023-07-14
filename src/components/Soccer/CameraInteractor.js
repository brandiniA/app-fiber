import React, { useEffect, useCallback, useRef } from "react";
import { Vector3 } from "three";
import { CameraControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useCameraInteractor } from "../../store";

export const CameraInteractor = () => {
	const cameraControlsRef = useRef();
	const camera = useThree((state) => state.camera);
	const {
		controlsState,
		setIsControlled,
		setMoved,
		setPositionStart,
		setPositionEnd,
	} = useCameraInteractor();

	const handleStart = useCallback(() => {
		setMoved(false);
		setIsControlled(true);
		const { position } = camera;
		const positionStart = new Vector3(position.x, position.y, position.z);
		setPositionStart(positionStart);
	}, [setIsControlled, setPositionStart, camera, setMoved]);

	const handleEnd = useCallback(() => {
		setIsControlled(false);
	}, [setIsControlled]);

	useFrame(() => {
		const { isControlled } = controlsState;
		if (isControlled) {
			const { position } = camera;
			const { positionStart } = controlsState;
			const positionEnd = new Vector3(position.x, position.y, position.z);
			setPositionEnd(positionEnd);
			console.log(positionEnd);
			if (Math.round(positionStart.distanceTo(positionEnd)) > 0) {
				setMoved(true);
			} else {
				setMoved(false);
			}
		}
	});

	useEffect(() => {
		cameraControlsRef.current.setTarget(60, 0, 40);
		cameraControlsRef.current.setPosition(-50, 20, 40);
		// cameraControlsRef.current.update();
	}, []);

	return (
		<CameraControls
			ref={cameraControlsRef}
			// minPolarAngle={Math.PI / 4}
			// maxPolarAngle={Math.PI / 3}
			enableDamping
			minDistance={60}
			maxDistance={110}
			draggingDampingFactor={0.9}
			azimuthRotateSpeed={0.4}
			polarRotateSpeed={0.4}
			onStart={handleStart}
			onEnd={handleEnd}
		/>
	);
};
