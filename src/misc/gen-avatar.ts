/**
 * Random avatar generator
 */

import * as c from 'canvas';
import * as gen from 'random-seed';

const size = 256; // px
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

/**
 * Generate buffer of random avatar by seed
 */
export function genAvatar(seed: string) {
	const rand = gen.create(seed);
	const canvas = c.createCanvas(size, size);
	const ctx = canvas.getContext('2d');

	ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
	ctx.fillRect(0, 0, size, size);

	return canvas.toBuffer();
}
