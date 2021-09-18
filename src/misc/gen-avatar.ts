/**
 * Random avatar generator
 */

import * as p from 'pureimage';
import * as gen from 'random-seed';
import { WriteStream } from 'fs';

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
export function genAvatar(seed: string, stream: WriteStream): Promise<void> {
	const rand = gen.create(seed);

	// throw the dice for body parts
	const parts = [
		['body', rand(15)],
		['fur', rand(10)],
		['eyes', rand(15)],
		['mouth', rand(10)]
	];

	const canvas = p.make(256, 256);
	const ctx = canvas.getcontext('2d');

	ctx.fillStyle = colors[rand(colors.length)];

	return p.encodePNGToStream(canvas, stream);
}
