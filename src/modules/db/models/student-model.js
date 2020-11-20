import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const studentSchema = Schema({
	studentId: Number,
	name: String,
	parents: [{ type: Schema.Types.ObjectId, ref: 'LineUser' }],
	logs: [{ type: Schema.Types.ObjectId, ref: 'logs' }],
});

export default mongoose.model('Student', studentSchema);

//--------------------------------------//
// const logsSchema = Schema({
// 	timestamp: String,
// 	info: String,
// 	refer: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
// });
// export const Logs = mongoose.model('Logs', logsSchema);
