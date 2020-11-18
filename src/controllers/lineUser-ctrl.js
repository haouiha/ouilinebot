import LineUser from '../db/models/lineUser-model';
import Student from '../db/models/student-model';

export const createLineUser = (req, res) => {
	const body = req.body;
	if (!body) res.statusCode(400);

	const lineUser = new LineUser(body);
	if (!lineUser) {
		return res.status(400).json({ error: err });
	}

	lineUser
		.save()
		.then(() => {
			return res.status(201).json({
				success: true,
				message: 'lineUser created!',
			});
		})
		.catch((error) => {
			res.status(400).json({
				error,
				message: 'lineUser can not created!',
			});
		});
};

export const updateLineUser = async (req, res) => {
	const body = req.body;

	if (!body) {
		return res.status(400).json({
			success: false,
			error: 'You must provide a body to update',
		});
	}

	console.log('req.params.id ', req.params.id);
	if (!body.students) {
		const studentInfo = await Student.findOne({ studentId: body.studentId });

		LineUser.findOne({ userId: req.params.id }, (err, lineUser) => {
			if (err) {
				return res.status(404).json({
					err,
					message: 'lineUser not found!',
				});
			}

			lineUser.firstName = body.firstName;
			lineUser.lastName = body.lastName;
			lineUser.students = studentInfo._id;

			lineUser
				.save()
				.then(async (data) => {
					console.log('data', data);
					try {
						await Student.findOneAndUpdate({ studentId: body.studentId }, { parents: [lineUser._id] });
						const lineUser = await LineUser.findOne({ userId: req.params.id })
							.populate('students')
							.then((lineUser) => {
								console.log('lineUser', lineUser);
							})
							.catch((e) => console.log('e', e));

						return res.status(200).json({
							success: true,
							data: lineUser,
							message: 'updated!',
						});
					} catch (error) {
						return res.sendStatus(400);
					}
				})
				.catch((error) => {
					console.log('error', error);
					return res.status(404).json({
						error,
						message: 'not updated!',
					});
				});
		});
	}
};
