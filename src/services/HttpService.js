'use strict';

import * as line from '@line/bot-sdk';
import { createServer, plugins } from 'restify';


const config = {
	channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
	channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);

const app = createServer();
app.use(plugins.bodyParser());

app.post('/webhook', (req, res) => {
	if (req.body.events.length > 0) {
		Promise.all(req.body.events.map(handleEvent)).catch((err) => {
			console.error(err);
			res.status(500).end();
		});
	}
	return res.send(200);
});

// event handler
async function handleEvent(event) {
	let userId = null;
	switch (event.type) {
		case 'follow':
			console.log('user add bot');
			userId = event.source.userId;
			const userInfo = await client.getProfile(userId);
			const newLineUser = new LineUser(userInfo);
			console.log('newLineUser', newLineUser);
			newLineUser.save();

			const registerLink = `${process.env.WEB_APP_URL}/register/${userId}`;

			return client.replyMessage(event.replyToken, {
				type: 'template',
				altText: 'register',
				template: {
					type: 'buttons',
					thumbnailImageUrl:
						'https://images.unsplash.com/photo-1533745848184-3db07256e163?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1789&q=80',
					imageAspectRatio: 'rectangle',
					imageSize: 'cover',
					imageBackgroundColor: '#5BC3EA',
					title: 'บอทนะจ้ะ',
					text: 'กรุณาลงทะเบียน',
					actions: [
						{
							type: 'uri',
							label: 'Register',
							uri: registerLink,
						},
					],
				},
			});

		case 'unfollow':
			console.log('user block bot');
			userId = event.source.userId;
			const response = await LineUser.deleteOne({ userId });
			console.log('response', response);

			return;
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

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`listening on ${port}`);
});
