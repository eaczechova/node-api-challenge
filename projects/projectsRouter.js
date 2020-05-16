const express = require('express');
const projects = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
	projects.get().then((project) => {
		res.status(200).json(project);
	});
});

router.post('/', (req, res) => {
	const newProject = req.body;

	if (!newProject.name || !newProject.description) {
		return res.status(400).json({
			errorMessage: 'Please provide name and description for the project.',
		});
	}
	projects
		.insert(newProject)
		.then((newProject) => {
			res.status(200).json(newProject);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				error: 'There was an error while saving the project to the database.',
			});
		});
});

router.delete('/:id', (req, res) => {
	projects
		.remove(req.params.id)
		.then((project) => {
			console.log(project);
			if (project > 0) {
				res.status(200).json({ id: Number(req.params.id) });
			} else {
				res
					.status(404)
					.json({ message: 'The project with the specified ID does not exist.' });
			}
		})
		.catch((error) => {
			res.status(500).json({
				error: 'The project could not be removed',
			});
		});
});

router.put('/:id', (req, res) => {
	const changedProject = req.body;

	projects
		.update(req.params.id, changedProject)
		.then((project) => {
			if (!project) {
				res
					.status(404)
					.json({ message: 'The project with the specified ID does not exist.' });
			} else if (!changedProject.name || !changedProject.description) {
				res.status(400).json({
					errorMessage: 'Please provide name and description for the project.',
				});
			} else {
				res.status(200).json(project);
			}
		})
		.catch((error) => {
			res.status(500).json({
				error: 'The project information could not be modified.',
			});
		});
});

router.get('/:id/actions', (req, res) => {
	projects
		.get(req.params.id)
		.then((projects) => {
			console.log(projects);
			projects.getProjectActions(req.params.id).then((actions) => {
				res.status(200).json(actions);
			});
		})
		.catch((error) => {
			res.status(500).json({
				error: 'The comments information could not be retrieved.',
			});
		});
});

module.exports = router;
