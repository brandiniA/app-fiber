import * as THREE from "three";

export function initStencilMaterials() {
	// PASS 1
	// everywhere that the back faces are visible (clipped region) the stencil
	// buffer is incremented by 1.
	const backFaceStencilMat = new THREE.MeshBasicMaterial();
	backFaceStencilMat.depthWrite = false;
	backFaceStencilMat.depthTest = false;
	backFaceStencilMat.colorWrite = false;
	backFaceStencilMat.stencilWrite = true;
	backFaceStencilMat.stencilFunc = THREE.AlwaysStencilFunc;
	backFaceStencilMat.side = THREE.BackSide;
	backFaceStencilMat.stencilFail = THREE.IncrementWrapStencilOp;
	backFaceStencilMat.stencilZFail = THREE.IncrementWrapStencilOp;
	backFaceStencilMat.stencilZPass = THREE.IncrementWrapStencilOp;

	// PASS 2
	// everywhere that the front faces are visible the stencil
	// buffer is decremented back to 0.
	const frontFaceStencilMat = new THREE.MeshBasicMaterial();
	frontFaceStencilMat.depthWrite = false;
	frontFaceStencilMat.depthTest = false;
	frontFaceStencilMat.colorWrite = false;
	frontFaceStencilMat.stencilWrite = true;
	frontFaceStencilMat.stencilFunc = THREE.AlwaysStencilFunc;
	frontFaceStencilMat.side = THREE.FrontSide;
	frontFaceStencilMat.stencilFail = THREE.DecrementWrapStencilOp;
	frontFaceStencilMat.stencilZFail = THREE.DecrementWrapStencilOp;
	frontFaceStencilMat.stencilZPass = THREE.DecrementWrapStencilOp;

	// PASS 3
	// draw the plane everywhere that the stencil buffer != 0, which will
	// only be in the clipped region where back faces are visible.
	const planeStencilMat = new THREE.MeshBasicMaterial({
		color: 0x111111,
	});
	planeStencilMat.stencilWrite = true;
	planeStencilMat.stencilRef = 0;
	planeStencilMat.stencilFunc = THREE.NotEqualStencilFunc;
	planeStencilMat.stencilFail = THREE.ReplaceStencilOp;
	planeStencilMat.stencilZFail = THREE.ReplaceStencilOp;
	planeStencilMat.stencilZPass = THREE.ReplaceStencilOp;

	return [frontFaceStencilMat, backFaceStencilMat, planeStencilMat];
}
