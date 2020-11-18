import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const mongodbStart = () => {
	mongoose.connect('mongodb://localhost:27017/LINE', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: true,
	});

	const db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function () {
		console.log('mongodb is connnected');
	});
};
export default mongodbStart;
