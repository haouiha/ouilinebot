import express from 'express';
import bodyParser from 'body-parser';
const port = process.env.PORT || 4000;
const request = require('request-promise');

const LINE_MESSAGING_API = 'https://api.line.me/v2/bot';
const LINE_USER_ID = 'U34389e783bcf766420c58bfab3f4e9e2';
const LINE_HEADER = {
	'Content-Type': 'application/json',
	Authorization:
		'Bearer O2I9Dl393WUeSNM91KGIAy8zoJsByxfhrA40Yz14J3t4g4sbtRQiyVYHnmk8vj9RVBEm+mQdf0jLZ0n9dESDOoAcHhG1Nbukdfw3cshQuLuaxUUmL7ipEaLFNQAF51njDlWtnIgcPvx/JHtF5Y64VgdB04t89/1O/w1cDnyilFU=',
};
const OPENWEATHER_API = 'https://api.openweathermap.org/data/2.5/weather/';
const OPENWEATHER_APPID = 'd3933ed20a22f4b7b79699a029ea615f';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const reply = (reply_token, msg) => {
	console.log('reply_token', reply_token);
	console.log('msg', msg);
	return request.post({
		uri: `${LINE_MESSAGING_API}/message/reply`,
		headers: LINE_HEADER,
		body: JSON.stringify({
			replyToken: reply_token,
			messages: [{ type: 'text', text: msg ? JSON.stringify(msg) : '' }],
		}),
	});
};

app.post('/webhook', (req, res) => {
	console.log('req.body', req.body);
	const reply_token = req?.body?.events?.[0]?.replyToken;
	const msg = req?.body?.events?.[0].message?.text;
	if (reply_token) {
		reply(reply_token, msg);
	}

	return res.sendStatus(200);
});

// exports.LineBotPush = functions.https.onRequest(async (req, res) => {
// 	let response = await request.get({
// 		uri: `${OPENWEATHER_API}?appid=${OPENWEATHER_APPID}&units=metric&type=accurate&zip=10330,th`,
// 		json: true,
// 	});
// 	const message = `City: ${response.name}\nWeather: ${response.weather[0].description}\nTemperature: ${response.main.temp}`;
// 	return push(LINE_USER_ID, message);
// });

const push = async (targetId, msg) => {
	await request.post({
		uri: `${LINE_MESSAGING_API}/message/push`,
		headers: LINE_HEADER,
		body: JSON.stringify({
			to: targetId,
			messages: [{ type: 'text', text: msg }],
		}),
	});
	return res.status(200).send({ message: `Push: ${msg}` });
};

// exports.LineBotMulticast = functions.https.onRequest((req, res) => {
// 	const text = req.query.text;
// 	if (text !== undefined && text.trim() !== '') {
// 		return multicast(res, text);
// 	} else {
// 		return res.status(400).send({ message: 'Text not found' });
// 	}
// });

const multicast = async (res, msg) => {
	await request.post({
		uri: `${LINE_MESSAGING_API}/message/multicast`,
		headers: LINE_HEADER,
		body: JSON.stringify({
			to: [LINE_USER_ID, 'Ua0e8dd654eeb56790bc0e342bfd46e1c'],
			messages: [{ type: 'text', text: msg }],
		}),
	});
	return res.status(200).send({ message: `Multicast: ${msg}` });
};

// exports.LineBotBroadcast = functions.https.onRequest((req, res) => {
// 	const text = req.query.text;
// 	if (text !== undefined && text.trim() !== '') {
// 		return broadcast(res, text);
// 	} else {
// 		const ret = { message: 'Text not found' };
// 		return res.status(400).send(ret);
// 	}
// });

const broadcast = async (res, msg) => {
	await request.post({
		uri: `${LINE_MESSAGING_API}/message/broadcast`,
		headers: LINE_HEADER,
		body: JSON.stringify({
			messages: [{ type: 'text', text: msg }],
		}),
	});
	return res.status(200).send({ message: `Broadcast: ${msg}` });
};

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
