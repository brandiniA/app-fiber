import { Vector3, Vector2 } from "three";
import { v4 as uuidv4 } from "uuid";

export function createRandomColor() {
	const randomColor = Math.floor(Math.random() * 16777215).toString(16);
	return "#" + randomColor;
}

export function sleepAsync(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function generateRandomUUID() {
	return uuidv4();
}

/**
 * round = 1 => 1 hexagon (center)
 * round = 2 => 7 hexagons (6 + 1)
 * round = 3 => 19 hexagons (12 + 6 + 1)
 * round = 4 => 37 hexagons (18 + 12 + 6 + 1)
 * formula to calculate the number of hexagons in a round = 6 * (round - 1) + 1
 */
export function calculateHexagonsInRound(round) {
	let hexagons = 1;
	for (let i = 1; i < round; i++) {
		hexagons += 6 * i;
	}
	return hexagons;
}

export function calculateLayerByHexagonIndex(index) {
	const hexagons = index;
	let round = 1;
	while (hexagons > calculateHexagonsInRound(round)) {
		round++;
	}
	return round - 1;
}

export const checkHexVerticesPositionInBounds = ({
	position = [0, 0, 0],
	hexPosition = new Vector3(),
	radius,
	boundingWidth,
	boundingHeight,
}) => {
	
	const boundingLeft = -boundingWidth * 0.5 - position[0];
	const boundingRight = boundingWidth * 0.5 + position[0]
	const boundingTop = boundingHeight * 0.5 - position[1]
	const boundingBottom = -boundingHeight * 0.5 + position[1]
	if (
		hexPosition.x >= boundingLeft &&
		hexPosition.x <= boundingRight &&
		hexPosition.y >= boundingBottom &&
		hexPosition.y <= boundingTop
	) {
		return true;
	}

	const thetaStart = 0;
	const thetaLength = Math.PI * 2;

	const vertices = [];

	let x = hexPosition.x
	let y = hexPosition.y

	vertices.push(
		new Vector3(x, y, 0),
	);

	const segments = 24
	for (let s = 0; s <= segments; s++) {
		const segment = thetaStart + (s / segments) * thetaLength;
		x = hexPosition.x + radius * Math.cos(segment);
		y = hexPosition.y + radius * Math.sin(segment);

		vertices.push(new Vector3(x, y, 0));
	}

	if (vertices.filter((vertex) => vertex.x >= boundingLeft && vertex.x <= boundingRight && vertex.y >= boundingBottom && vertex.y <= boundingTop).length > 3) {
		return true;
	}

	return false;
};

export function generateHexagons({
	boundingWidth = 120,
	boundingHeight = 80,
	position = [0, 0, 0],
	radius = 2,
	totalHexagons = 1,
}) {
	const hexagons = [];

	let x = position[0];
	let y = position[1];
	let z = position[2];

	let side = 0;

	const angle = Math.PI / 3;
	const apothem = (radius * Math.sqrt(3)) / 2;

	let $count = totalHexagons;

	const defaultHexagonState = {
		index: 0,
		uuid: generateRandomUUID(),
		relativePosition: new Vector2(x + boundingWidth * 0.5, y + boundingHeight * 0.5),
		position: new Vector3(x, y, z),
		radius,
		color: "red",
		opacity: 1,
		layer: 0,
		// times a player has been in this hexagon
		players: 0,
		// List of players that have been in this hexagon
		playersList: [],
		// times a player has been in this hexagon and has the ball
		playersWithBall: 0,
		// List of players that have been in this hexagon and have the ball
		playersWithBallList: [],
	};

	hexagons.push(defaultHexagonState);

	--$count;

	// const halfRadius = radius * 0.5;
	// const boundingLeft = -boundingWidth * 0.5 - position[0] - halfRadius;
	// const boundingRight = boundingWidth * 0.5 + position[0] + halfRadius;
	// const boundingTop = boundingHeight * 0.5 - position[1] + halfRadius;
	// const boundingBottom = -boundingHeight * 0.5 + position[1] - halfRadius;


	
	// Number of hexagon that are currently drawn in the side
	let indexHex = 1;
	// Number of time we get inside the for loop
	let index = 1;
	while ($count > 0) {
		for (
			let i = 0;
			i < Math.floor((side + 4) / 6) + (side % 6 === 0 ? 1 : 0) && $count > 0; // This is the number of hexagons in a side (1, 6, 12, 18, 24, 30, 36, 42, 48, 54, 60)
			i++
		) {
			index++;
			x += Math.sin(angle * side) * apothem * 2;
			y += Math.cos(angle * side) * apothem * 2;

			// if position is outside the field, don't draw it

			// console.log(`x: ${x}, y: ${y}`);
			const hexPos = new Vector3(x, y, z);
			const hexRelativePos = positionToRelative(hexPos, boundingWidth, boundingHeight);

			if (checkHexVerticesPositionInBounds({
				position,
				hexPosition: hexPos,
				radius,
				boundingWidth,
				boundingHeight,
			})) {
				const layer = calculateLayerByHexagonIndex(index);
				hexagons.push({
					...defaultHexagonState,
					color: layer % 2 === 0 ? "gray" : "brown",
					index: indexHex++,
					uuid: generateRandomUUID(),
					// Position of the hegagon relative to the left top corner of the field min x 0, max x boundingWidth, min y 0, max y boundingHeight
					relativePosition: hexRelativePos,
					// Position of the hexagon in the global field
					position: hexPos,
					layer,
				});
			}
			$count--;
		}

		side++;
	}


	return hexagons;
}

export function positionToRelative(position, boundingWidth, boundingHeight) {
	return new Vector2(position.x + boundingWidth * 0.5, Math.abs(-position.y + boundingHeight * 0.5));
}

/**
 * If Relative Y is 40 and boundingHeight is 80, then the position Y is 0
 * If relative position Y is 0 and boundingHeight is 80, then the position Y is 40
 * If relative position Y is 80 and boundingHeight is 80, then the position Y is -40
 * So the formula must be: -relativePosition.y + boundingHeight * 0.5
 */
export function relativeToPosition(relativePosition, boundingWidth, boundingHeight) {
	return new Vector3(relativePosition.x - boundingWidth * 0.5, -relativePosition.y + boundingHeight * 0.5, 0);
}
