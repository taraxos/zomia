/**
 * Random avatar generator
 */

import * as p from 'pureimage';
import * as gen from 'random-seed';
import * as fs from 'fs';
import { WriteStream } from 'fs';

import body1 from '@misc/img/body_1.png';
import body2 from '@misc/img/body_2.png';
import body3 from '@misc/img/body_3.png';
import body4 from '@misc/img/body_4.png';
import body5 from '@misc/img/body_5.png';
import body6 from '@misc/img/body_6.png';
import body7 from '@misc/img/body_7.png';
import body8 from '@misc/img/body_8.png';
import body9 from '@misc/img/body_9.png';
import body10 from '@misc/img/body_10.png';
import body11 from '@misc/img/body_11.png';
import body12 from '@misc/img/body_12.png';
import body13 from '@misc/img/body_13.png';
import body14 from '@misc/img/body_14.png';
import body15 from '@misc/img/body_15.png';
import fur1 from '@misc/img/fur_1.png';
import fur2 from '@misc/img/fur_2.png';
import fur3 from '@misc/img/fur_3.png';
import fur4 from '@misc/img/fur_4.png';
import fur5 from '@misc/img/fur_5.png';
import fur6 from '@misc/img/fur_6.png';
import fur7 from '@misc/img/fur_7.png';
import fur8 from '@misc/img/fur_8.png';
import fur9 from '@misc/img/fur_9.png';
import fur10 from '@misc/img/fur_10.png';
import eyes1 from '@misc/img/eyes_1.png';
import eyes2 from '@misc/img/eyes_2.png';
import eyes3 from '@misc/img/eyes_3.png';
import eyes4 from '@misc/img/eyes_4.png';
import eyes5 from '@misc/img/eyes_5.png';
import eyes6 from '@misc/img/eyes_6.png';
import eyes7 from '@misc/img/eyes_7.png';
import eyes8 from '@misc/img/eyes_8.png';
import eyes9 from '@misc/img/eyes_9.png';
import eyes10 from '@misc/img/eyes_10.png';
import eyes11 from '@misc/img/eyes_11.png';
import eyes12 from '@misc/img/eyes_12.png';
import eyes13 from '@misc/img/eyes_13.png';
import eyes14 from '@misc/img/eyes_14.png';
import eyes15 from '@misc/img/eyes_15.png';
import mouth1 from '@misc/img/mouth_1.png';
import mouth2 from '@misc/img/mouth_2.png';
import mouth3 from '@misc/img/mouth_3.png';
import mouth4 from '@misc/img/mouth_4.png';
import mouth5 from '@misc/img/mouth_5.png';
import mouth6 from '@misc/img/mouth_6.png';
import mouth7 from '@misc/img/mouth_7.png';
import mouth8 from '@misc/img/mouth_8.png';
import mouth9 from '@misc/img/mouth_9.png';
import mouth10 from '@misc/img/mouth_10.png';

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

const body = [
	[body1],
	[body2],
	[body3],
	[body4],
	[body5],
	[body6],
	[body7],
	[body8],
	[body9],
	[body10],
	[body11],
	[body12],
	[body13],
	[body14],
	[body15]
];

const fur = [
	[fur1],
	[fur2],
	[fur3],
	[fur4],
	[fur5],
	[fur6],
	[fur7],
	[fur8],
	[fur9],
	[fur10]
];

const eyes = [
	[eyes1],
	[eyes2],
	[eyes3],
	[eyes4],
	[eyes5],
	[eyes6],
	[eyes7],
	[eyes8],
	[eyes9],
	[eyes10],
	[eyes11],
	[eyes12],
	[eyes13],
	[eyes14],
	[eyes15]
];

const mouth = [
	[mouth1],
	[mouth2],
	[mouth3],
	[mouth4],
	[mouth5],
	[mouth6],
	[mouth7],
	[mouth8],
	[mouth9],
	[mouth10]
];

/**
 * Generate buffer of random avatar by seed
 */
export function genAvatar(seed: string, stream: WriteStream): Promise<void> {
	const rand = gen.create(seed);

	// throw the dice for body parts
	const parts = [
		[body[rand(15)]],
		[fur[rand(10)]],
		[eyes[rand(15)]],
		[mouth[rand(10)]]
	];

	const canvas = p.make(size, size);
	const ctx = canvas.getContext('2d');

	ctx.fillStyle = colors[rand(colors.length)];
	ctx.beginPath();
	ctx.fillRect(0, 0, size, size);

	// add parts
	for (let part of parts) {
		p.decodePNGFromStream(fs.createReadStream(part)).then((img) => {
			ctx.drawImage(img,
				0, 0, 256, 256
			);
		});
	}

	return p.encodePNGToStream(canvas, stream);
}
