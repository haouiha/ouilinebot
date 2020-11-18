import Student from '../models/student-model';

export const createStudent = (req, res) => {
	const body = req.body;
	if (!body) res.statusCode(400);

	const student = new Student(body);
	if (!student) {
		return res.status(400).json({ error: err });
	}

	student
		.save()
		.then(() => {
			return res.status(201).json({
				success: true,
				message: 'student created!',
			});
		})
		.catch((error) => {
			res.status(400).json({
				error,
				message: 'student can not created!',
			});
		});
};

export const updateStudent = async (req, res) => {
	const body = req.body;
	console.log('body', body);
	if (!body) {
		return res.status(400).json({
			success: false,
			error: 'You must provide a body to update',
		});
	}

	Student.findOne({ studentId: req.params.id }, (err, student) => {
		if (err) {
			return res.status(404).json({
				err,
				message: 'not found!',
			});
		}
		console.log('student', student);

		student
			.save()
			.then((data) => {
				console.log('data', data);

				return res.status(200).json({
					success: true,
					message: 'updated!',
				});
			})
			.catch((error) => {
				console.log('error', error);
				return res.status(404).json({
					error,
					message: 'not updated!',
				});
			});
	});
};
