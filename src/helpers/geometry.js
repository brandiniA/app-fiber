import { Vector2, Vector3 } from "three";


export const setPoligonVertices = (radius, segments) => {
	const thetaStart = 0;
	const thetaLength = Math.PI * 2;

	const indices = [];
	const vertices = [];
	const normals = [];
	const uvs = [];

	const vertex = new Vector3();
	const uv = new Vector2();

	vertices.push(0, 0, 0);
	normals.push(0, 0, 1);
	uvs.push(0.5, 0.5);

	for (let s = 0, i = 3; s <= segments; s++, i += 3) {
		const segment = thetaStart + (s / segments) * thetaLength;

		// vertex

		vertex.x = radius * Math.cos(segment);
		vertex.y = radius * Math.sin(segment);

		vertices.push(vertex.x, vertex.y, vertex.z);

		// normal

		normals.push(0, 0, 1);

		// uvs

		uv.x = (vertices[i] / radius + 1) / 2;
		uv.y = (vertices[i + 1] / radius + 1) / 2;

		uvs.push(uv.x, uv.y);
	}

	// indices

	for (let i = 1; i <= segments; i++) {
		indices.push(i, i + 1, 0);
	}

	return {
		indices: new Uint16Array(indices),
		positions: new Float32Array(vertices),
		normals: new Float32Array(normals),
		uvs: new Float32Array(uvs),
	};
};
