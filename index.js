import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import * as line from '@line/bot-sdk';
// import showcase01 from './showcase01.json';
// import mongodbStart from './db';
// import LineUser from './models/lineUser-model';
// import lineUserRouter from './src/routes/lineUser-router';
import cors from 'cors';
// import richMenu01 from './assets/richMenu01.jpeg';
import fs from 'fs';

// mongodbStart();

dotenv.config();
const port = process.env.PORT || 4000;

const LINE_USER_ID = 'U34389e783bcf766420c58bfab3f4e9e2';

const config = {
	channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
	channelSecret: process.env.CHANNEL_SECRET,
};
const client = new line.Client(config);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.post('/webhook2', (req, res) => {
	const payload = req.body.payload;
	const { pic, ...rest } = payload;

	client.pushMessage(LINE_USER_ID, {
		type: 'text',
		text: JSON.stringify(rest),
	});
});

// const webhook = (req, res) => {
// 	console.log('User id: ' + req.body.events[0].source.userId);
// 	Promise.all(req.body.events.map(handleEvent)).catch((e) => {
// 		console.log(e);
// 	});
// 	return res.json({ status: 'ok' });
// };
// app.post('/webhook', line.middleware(config), webhook);

app.post('/webhook', line.middleware(config), (req, res) => {
	try {
		Promise.all(req.body.events.map(handleEvent)).catch((e) => {
			console.log(e);
		});
		return res.json({ status: 'ok' });
	} catch (e) {
		console.log('e', e);
	}
});

// function handleEvent(event) {
// 	if (event.type !== 'message' || event.message.type !== 'text') {
// 		return Promise.resolve(null);
// 	}

// 	return client.replyMessage(event.replyToken, {
// 		type: 'text',
// 		text: event.message.text,
// 	});
// }

// app.post('/webhook3', (req, res) => {
// 	Promise.all(req.body.events.map((e) => handleEvent(e)))
// 		.then((result) => res.json(result))
// 		.catch((e) => {
// 			console.log('e', e.statusCode);
// 			console.log('e', e.statusMessage);
// 			console.log('e', e);
// 			res.status(e.statusCode).send(e.statusMessage);
// 		});
// });

async function handleEvent(event) {
	console.log('event', event);
	let userId = null;
	switch (event.type) {
		// case 'follow':
		// 	console.log('user add bot');
		// 	userId = event.source.userId;
		// 	const userInfo = await client.getProfile(userId);
		// 	const newLineUser = new LineUser(userInfo);
		// 	console.log('newLineUser', newLineUser);
		// 	newLineUser.save();

		// 	const registerLink = `${process.env.WEB_APP_URL}/register/${userId}`;

		// 	return client.replyMessage(event.replyToken, {
		// 		type: 'template',
		// 		altText: 'register',
		// 		template: {
		// 			type: 'buttons',
		// 			thumbnailImageUrl:
		// 				'https://images.unsplash.com/photo-1533745848184-3db07256e163?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1789&q=80',
		// 			imageAspectRatio: 'rectangle',
		// 			imageSize: 'cover',
		// 			imageBackgroundColor: '#5BC3EA',
		// 			title: 'บอทนะจ้ะ',
		// 			text: 'กรุณาลงทะเบียน',
		// 			actions: [
		// 				{
		// 					type: 'uri',
		// 					label: 'Register',
		// 					uri: registerLink,
		// 				},
		// 			],
		// 		},
		// 	});

		// case 'unfollow':
		// 	console.log('user block bot');
		// 	userId = event.source.userId;
		// 	const response = await LineUser.deleteOne({ userId });
		// 	console.log('response', response);

		// 	return;
		case 'message':
			if (event.message.type === 'text') {
				return client.replyMessage(event.replyToken, {
					type: 'text',
					text: event.message.text,
				});
			}

		case 'postback':
			window.location;
			return client.replyMessage(event.replyToken, {
				type: 'text',
				text: 'https://www.google.co.th',
			});

		default:
			Promise.resolve(null);
			break;
	}
}

app.get('/createRichMenu', async (req, res) => {
	try {
		const response = await client.createRichMenu({
			size: {
				width: 2500,
				height: 1686,
			},
			selected: true,
			name: 'Rich Menu 1',
			chatBarText: 'Bulletin',
			areas: [
				{
					bounds: {
						x: 0,
						y: 0,
						width: 833,
						height: 843,
					},
					action: {
						type: 'uri',
						uri: 'https://liff.line.me/1655106289-EMMPpmxP',
					},
				},
				{
					bounds: {
						x: 834,
						y: 0,
						width: 833,
						height: 843,
					},
					action: {
						type: 'uri',
						uri: 'line://https://www.google.co.th',
					},
				},
				{
					bounds: {
						x: 1667,
						y: 0,
						width: 833,
						height: 843,
					},
					action: {
						type: 'uri',
						uri: 'https://www.google.co.th',
					},
				},
				{
					bounds: {
						x: 0,
						y: 844,
						width: 833,
						height: 843,
					},
					action: {
						type: 'message',
						text: 'Area 4',
					},
				},
				{
					bounds: {
						x: 834,
						y: 844,
						width: 833,
						height: 843,
					},
					action: {
						type: 'message',
						text: 'Area 5',
					},
				},
				{
					bounds: {
						x: 1667,
						y: 844,
						width: 833,
						height: 843,
					},
					action: {
						type: 'postback',
						data: 'postbacktest',
						label: 'confirm',
					},
				},
			],
		});

		console.log('response', response);
		res.sendStatus(200);
	} catch (e) {
		console.log('e', e);
		res.sendStatus(400);
	}
});

app.get('/setRichMenuImage', async (req, res) => {
	try {
		const response = await client.setRichMenuImage(
			'richmenu-b415a842bb225aca978c06df13fe5be8',
			fs.createReadStream('./assets/richMenu01.jpeg')
		);
		console.log('response', response);
		res.sendStatus(200);
	} catch (e) {
		console.log('e', e);
		res.sendStatus(400);
	}
});

app.get('/setDefaultRichMenu', async (req, res) => {
	try {
		const response = await client.setDefaultRichMenu('richmenu-b415a842bb225aca978c06df13fe5be8');
		console.log('response', response);
		res.sendStatus(200);
	} catch (e) {
		console.log('e', e);
		res.sendStatus(400);
	}
});

app.get('/hello', async (req, res) => {
	try {
		const userInfo = await client.getProfile(LINE_USER_ID);
		console.log('userInfo', userInfo);
		// await client.multicast([LINE_USER_ID], { type: 'text', text: `hello, ${userInfo.displayName}` });
		await client.broadcast([
			{
				type: 'template',
				sender: {
					name: 'Haoui',
					iconUrl: 'https://picsum.photos/id/2/200',
				},
				altText: 'this is a buttons template',
				template: {
					type: 'buttons',
					imageAspectRatio: 'square',
					imageSize: 'cover',
					imageBackgroundColor: '#96DF1B',
					title: 'HELLO',
					text: 'haouitest',
					actions: [
						{
							type: 'datetimepicker',
							label: 'Action 1',
							data: 'Data 1',
							mode: 'datetime',
							initial: '2020-10-20T13:41',
							max: '2021-10-20T13:41',
							min: '2019-10-20T13:41',
						},
						{
							type: 'message',
							label: 'Action 2',
							text: 'Action 2',
						},
					],
				},
			},
		]);

		await client.broadcast([
			{
				sender: {
					name: 'OuiOui',
					iconUrl: 'https://picsum.photos/id/1/200',
				},
				type: 'text',
				text: `hello, ${userInfo.displayName}`,
			},
		]);

		res.sendStatus(200);
	} catch (e) {
		console.log('e', e);
		res.sendStatus(400);
	}
});

// app.use('/api', lineUserRouter);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
