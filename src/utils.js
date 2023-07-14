import { Vector3 } from "three";
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

	hexagons.push({
		index: 0,
		uuid: generateRandomUUID(),
		position: new Vector3(x, z, y),
		radius,
		color: "red",
		opacity: 1,
		layer: 0,
	});

	--$count;

	const boundingLeft = boundingWidth * 0.5 - position[0] - radius;
	const boundingRight = boundingWidth * 0.5 + position[0] + radius;
	const boundingTop = boundingHeight * 0.5 - position[1] - radius;
	const boundingBottom = boundingHeight * 0.5 + position[1] + radius;

	console.log(
		`$boundingLeft: ${boundingLeft}, $boundingRight: ${boundingRight}, $boundingTop: ${boundingTop}, $boundingBottom: ${boundingBottom}`
	);
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

			if (
				x >= boundingLeft &&
				x <= boundingRight &&
				y >= boundingTop &&
				y <= boundingBottom
			) {
				const layer = calculateLayerByHexagonIndex(index);
				hexagons.push({
					color: layer % 2 === 0 ? "aqua" : "blue",
					index: indexHex++,
					uuid: generateRandomUUID(),
					position: new Vector3(x, z, y),
					radius,
					opacity: 1,
					layer,
				});
			}
			$count--;
			// z++;
		}

		side++;
	}

	// console.log(hexagons);
	return hexagons;
}
