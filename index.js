const express = require('express');
const line = require('@line/bot-sdk');

const config = {
	channelAccessToken:
		'O2I9Dl393WUeSNM91KGIAy8zoJsByxfhrA40Yz14J3t4g4sbtRQiyVYHnmk8vj9RVBEm+mQdf0jLZ0n9dESDOoAcHhG1Nbukdfw3cshQuLuaxUUmL7ipEaLFNQAF51njDlWtnIgcPvx/JHtF5Y64VgdB04t89/1O/w1cDnyilFU=',
	channelSecret: '52dbb515ebde7581403ee6bd82aba7c1',
};

const app = express();

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

app.listen(4000);
