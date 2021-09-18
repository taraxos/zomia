/**
 * Random avatar generator
 */

import * as p from 'pureimage';
import * as gen from 'random-seed';
import { WriteStream } from 'fs';

const size = 256; // px
const n = 5; // resolution
const margin = (size / n);

const colors = [
	'#e57373',
	'#f06292',
	'#ba68c8',
	'#9575cd',
	'#7986cb',
	'#64b5f6',
	'#4fc3f7',
	'#4dd0e1',
	'#4db6ac',
	'#81c784',
	'#8bc34a',
	'#afb42b',
	'#f57f17',
	'#ff5722',
	'#795548',
	'#455a64'
];

const bg = '#e9e9e9';
const actualSize = size - (margin * 2);
const cellSize = actualSize / n;
const sideN = Math.floor(n / 2);

/**
 * Generate buffer of random avatar by seed
 */
export function genAvatar(seed: string, stream: WriteStream): Promise<void> {
	const rand = gen.create(seed);

	// throw the dice for body parts
	const parts = [
		['body', rand(15)],
		['fur', rand(10)],
		['eyes', rand(15)],
		['mouth', rand(10)]
	];

	const canvas = p.make(size, size);
	const ctx = canvas.getcontext('2d');

	ctx.fillStyle = bg;
	
	ctx.beginPath();
	ctx.fillRect(0, 0, size, size);

	ctx.fillStyle = colors[rand(colors.length)];

	// side bitmap (filled by false)
	const side: boolean[][] = new Array(sideN);
	for (let i = 0; i < side.length; i++) {
		side[i] = new Array(n).fill(false);
	}

	// 1*n (filled by false)
	const center: boolean[] = new Array(n).fill(false);

	// tslint:disable-next-line:prefer-for-of
	for (let x = 0; x < side.length; x++) {
		for (let y = 0; y < side[x].length; y++) {
			side[x][y] = rand(3) === 0;
		}
	}

	for (let i = 0; i < center.length; i++) {
		center[i] = rand(3) === 0;
	}

	// Draw
	for (let x = 0; x < n; x++) {
		for (let y = 0; y < n; y++) {
			const isXCenter = x === ((n - 1) / 2);
			if (isXCenter && !center[y]) continue;

			const isLeftSide = x < ((n - 1) / 2);
			if (isLeftSide && !side[x][y]) continue;

			const isRightSide = x > ((n - 1) / 2);
			if (isRightSide && !side[sideN - (x - sideN)][y]) continue;

			const actualX = margin + (cellSize * x);
			const actualY = margin + (cellSize * y);
			ctx.beginPath();
			ctx.fillRect(actualX, actualY, cellSize, cellSize);
		}
	}

	return p.encodePNGToStream(canvas, stream);
}
