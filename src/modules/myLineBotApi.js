const request = require('request-promise');

const LINE_HEADER = {
	'Content-Type': 'application/json',
	Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
};

const LINE_USER_ID = 'U34389e783bcf766420c58bfab3f4e9e2';

const reply = async (reply_token, msg) => {
	return await request.post({
		uri: `${process.env.LINE_MESSAGING_API}/message/reply`,
		headers: LINE_HEADER,
		body: JSON.stringify({
			replyToken: reply_token,
			messages: [{ type: 'text', text: msg ? JSON.stringify(msg) : '' }],
		}),
	});
};

const push = async (targetId, msg) => {
	await request.post({
		uri: `${process.env.LINE_MESSAGING_API}/message/push`,
		headers: LINE_HEADER,
		body: JSON.stringify({
			to: targetId,
			messages: [{ type: 'text', text: msg }],
		}),
	});
	return res.status(200).send({ message: `Push: ${msg}` });
};

const multicast = async (res, msg) => {
	await request.post({
		uri: `${process.env.LINE_MESSAGING_API}/message/multicast`,
		headers: LINE_HEADER,
		body: JSON.stringify({
			to: [LINE_USER_ID, 'Ua0e8dd654eeb56790bc0e342bfd46e1c'],
			messages: [{ type: 'text', text: msg }],
		}),
	});
	return res.status(200).send({ message: `Multicast: ${msg}` });
};

const broadcast = async (res, msg) => {
	await request.post({
		uri: `${process.env.LINE_MESSAGING_API}/message/broadcast`,
		headers: LINE_HEADER,
		body: JSON.stringify({
			messages: [{ type: 'text', text: msg }],
		}),
	});
	return res.status(200).send({ message: `Broadcast: ${msg}` });
};

exports = { reply, push, multicast, broadcast };
