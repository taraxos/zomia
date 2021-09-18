/**
 * Random avatar generator
 */

import * as p from 'pureimage';
import * as gen from 'random-seed';
import * as fs from 'fs';
import { WriteStream } from 'fs';

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

	// throw the dice for body parts
	const parts = [
		['body', rand(15)],
		['fur', rand(10)],
		['eyes', rand(15)],
		['mouth', rand(10)]
	];

	const canvas = p.make(size, size);
	const ctx = canvas.getContext('2d');

	ctx.fillStyle = colors[rand(colors.length)];
	ctx.beginPath();
	ctx.fillRect(0, 0, size, size);
	
	p.decodePNGFromStream(fs.createReadStream('img/body_1.png')).then((img) => {
		ctx.drawImage(img,
			0, 0, 256, 256,
			0, 0, size, size
		);
	});

	// add parts
	/*
	for (let part of parts) {
		p.decodePNGFromStream(fs.createReadStream('/img/'+part[0]+'_'+String(part[1])+'.png')).then((img) => {
			ctx.drawImage(img,
				0, 0, 256, 256,
				0, 0, size, size
			);
		});
	}
 */

	return p.encodePNGToStream(canvas, stream);
}
