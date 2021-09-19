/**
 * Random avatar generator
 */

import * as p from 'pureimage';
import * as gen from 'random-seed';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { WriteStream } from 'fs';

//const _filename = fileURLToPath(import.meta.url);
const _filename = __filename;
const _dirname = dirname(_filename);

//const imgurl = `${_dirname}/img/body_1.png`

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
	const canvas = p.make(size, size);
	const ctx = canvas.getContext('2d');

	/*
	// throw the dice for body parts
	const parts = [
		['body', rand(15)],
		['fur', rand(10)],
		['eyes', rand(15)],
		['mouth', rand(10)]
	];
	*/

	ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
	ctx.beginPath();
	ctx.fillRect(0, 0, size, size);

	p.decodePNGFromStream(fs.createReadStream(`${_dirname}/img/body_1.png`)).then((layer1) => {
		ctx.drawImage(layer1, 0, 0, size, size);
		p.decodePNGFromStream(fs.createReadStream(`${_dirname}/img/fur_2.png`)).then((layer2) => {
			ctx.drawImage(layer2, 0, 0, size, size);
			p.decodePNGFromStream(fs.createReadStream(`${_dirname}/img/eyes_3.png`)).then((layer3) => {
				ctx.drawImage(layer3, 0, 0, size, size);
				p.decodePNGFromStream(fs.createReadStream(`${_dirname}/img/mouth_4.png`)).then((layer4) => {
					ctx.drawImage(layer4, 0, 0, size, size);
					p.encodePNGToStream(canvas, fs.createWriteStream(`${_dirname}/../../files/avatar.png`)).then(() => {
						console.log('done');
					});
				});
			});
		});
	})

	/*
	// add parts
	for (let part of parts) {
		let imgurl = 'img/'+part[0]+'_'+String(part[1])+'.png';
		p.decodePNGFromStream(fs.createReadStream(`${_dirname}/imgurl`)).then((img) => {
			ctx.drawImage(img, 0, 0, size, size);
		});
	}
	*/

	return p.encodePNGToStream(canvas, stream);
}
