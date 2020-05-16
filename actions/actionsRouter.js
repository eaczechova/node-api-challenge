const express = require('express');
const actions = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
	actions.get(req.project_id).then((actions) => {
		res.status(200).json(actions);
	});
});

router.post('/:id', (req, res) => {
	const newAction = req.body;
	const projectId = req.params.id;

	if (!newAction.description || !newAction.notes) {
		return res.status(400).json({
			errorMessage: 'Please provide description and notes for the action.',
		});
	}

	actions
		.insert(newAction, projectId)
		.then((newAction) => {
			res.status(200).json(newAction);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				error: 'There was an error while saving the action to the database.',
			});
		});
});

router.put('/:id', (req, res) => {
	const changedActions = req.body;

	actions
		.update(req.params.id, changedActions)
		.then((action) => {
			if (!action) {
				res
					.status(404)
					.json({ message: 'The action with the specified ID does not exist.' });
			} else if (!changedActions.notes || !changedActions.description) {
				res.status(400).json({
					errorMessage: 'Please provide notes and description for the project.',
				});
			} else {
				res.status(200).json(action);
			}
		})
		.catch((error) => {
			res.status(500).json({
				error: 'The action information could not be modified.',
			});
		});
});

router.delete('/:id', (req, res) => {
	actions
		.remove(req.params.id)
		.then((action) => {
			console.log(action);
			if (action > 0) {
				res.status(200).json({ id: Number(req.params.id) });
			} else {
				res
					.status(404)
					.json({ message: 'The action with the specified ID does not exist.' });
			}
		})
		.catch((error) => {
			res.status(500).json({
				error: 'The action information could not be modified.',
			});
		});
});

module.exports = router;
