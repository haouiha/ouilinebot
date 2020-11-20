import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const lineUserSchema = Schema({
	userId: { type: String, required: true },
	displayName: String,
	pictureUrl: String,
	language: String,
	//---
	firstName: String,
	lastName: String,
	students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
});

export default mongoose.model('LineUser', lineUserSchema);
//--------------------------------------//

// const studentSchema = Schema({
// 	studentId: String,
// 	name: String,
// 	parents: [{ type: Schema.Types.ObjectId, ref: 'LineUser' }],
// 	logs: [{ type: Schema.Types.ObjectId, ref: 'logs' }],
// });

// const logsSchema = Schema({
// 	timestamp: String,
// 	info: String,
// 	refer: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
// });

// export const Student = mongoose.model('Student', studentSchema);
// export const Logs = mongoose.model('Logs', logsSchema);
