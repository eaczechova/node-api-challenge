const express = require('express');
const actions = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
	// console.log(req.params.id);
	actions.get(req.query).then((action) => {
		res.status(200).json(action);
	});
});

// project_id

router.get('/:id/actions', (req, res) => {
	actions
		.get(req.params.id)
		.then((action) => {
			if (!action) {
				res
					.status(404)
					.json({ message: 'The action with the specified ID does not exist.' });
			} else {
				res.status(200).json(project);
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				error: 'The action information could not be retrieved.',
			});
		});
});

router.post('/:id/actions', (req, res) => {
	const newAction = req.body;
	const projectId = req.params.id;
	// if (!newProject.name || !newProject.description) {
	// 	return res.status(400).json({
	// 		errorMessage: 'Please provide name and description for the project.',
	// 	});
	// }
	actions
		.insert(newAction, projectId)
		.then((action) => {
			res.status(200).json(newProject);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				error: 'There was an error while saving the project to the database.',
			});
		});
});

module.exports = router;
