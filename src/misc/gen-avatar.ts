/**
 * Random avatar generator
 */

import * as p from 'pureimage';
import * as gen from 'random-seed';
import * as fs from 'fs';
import { WriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { PassThrough } from 'stream';

//const _filename = fileURLToPath(import.meta.url);
const _filename = __filename;
const _dirname = dirname(_filename);

const passThroughStream = new PassThrough();

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
export function genAvatar(seed: string, stream: WriteStream): Promise<void> {
	const rand = gen.create(seed);
	let canvas = p.make(size, size);
	const ctx = canvas.getContext('2d');

	ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
	ctx.beginPath();
	ctx.fillRect(0, 0, size, size);

	p.decodePNGFromStream(fs.createReadStream(`${_dirname}/img.png`)).then((img) => {
		ctx.drawImage(img, 0, 0, size, size);
	})

	return p.encodePNGToStream(canvas, stream);
}
