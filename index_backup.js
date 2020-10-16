const express = require('express');
const line = require('@line/bot-sdk');
const JSONParseError = require('@line/bot-sdk').JSONParseError;
const SignatureValidationFailed = require('@line/bot-sdk').SignatureValidationFailed;
const bodyParser = require('body-parser');

const port = process.env.PORT || 4000;

const app = express();

const config = {
	channelAccessToken:
		'O2I9Dl393WUeSNM91KGIAy8zoJsByxfhrA40Yz14J3t4g4sbtRQiyVYHnmk8vj9RVBEm+mQdf0jLZ0n9dESDOoAcHhG1Nbukdfw3cshQuLuaxUUmL7ipEaLFNQAF51njDlWtnIgcPvx/JHtF5Y64VgdB04t89/1O/w1cDnyilFU=',
	channelSecret: '52dbb515ebde7581403ee6bd82aba7c1',
};

// app.post('/webhook', line.middleware(config), (req, res) => {
// 	//   req.body.events // webhook event objects
// 	//   req.body.destination // user ID of the bot (optional)

// 	console.log('req.body', req.body);
// 	res.sendStatus(200);
// 	// res.json(req.body.events);
// });

app.post('/webhook', line.middleware(config), (req, res) => {
	Promise.all(req.body.events.map(handleEvent)).then((result) => res.json(result));
});

const client = new line.Client(config);

function handleEvent(event) {
	if (event.type !== 'message' || event.message.type !== 'text') {
		return Promise.resolve(null);
	}

	return client.replyMessage(event.replyToken, {
		type: 'text',
		text: event.message.text,
	});
}

app.use((err, req, res, next) => {
	if (err instanceof SignatureValidationFailed) {
		res.status(401).send(err.signature);
		return;
	} else if (err instanceof JSONParseError) {
		res.status(400).send(err.raw);
		return;
	}
	next(err); // will throw default 500
});

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.use(bodyParser.json());

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
