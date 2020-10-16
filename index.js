const express = require('express');
const middleware = require('@line/bot-sdk').middleware;

const port = process.env.PORT || 4000;

const app = express();

const config = {
	channelAccessToken:
		'O2I9Dl393WUeSNM91KGIAy8zoJsByxfhrA40Yz14J3t4g4sbtRQiyVYHnmk8vj9RVBEm+mQdf0jLZ0n9dESDOoAcHhG1Nbukdfw3cshQuLuaxUUmL7ipEaLFNQAF51njDlWtnIgcPvx/JHtF5Y64VgdB04t89/1O/w1cDnyilFU=',
	channelSecret: '52dbb515ebde7581403ee6bd82aba7c1',
};

app.post('/webhook', middleware(config), (req, res) => {
	//   req.body.events // webhook event objects
	//   req.body.destination // user ID of the bot (optional)

	console.log('req.body', req.body);
	res.sendStatus(200);
	// res.json(req.body.events);
});

app.listen(port);
