import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Project from './components/Project';
import './App.css';

function App() {
	const initialProject = { name: '', description: '' };
	const [projects, setProjects] = useState([]);
	const [newProject, setNewProject] = useState(initialProject);

	const getData = () => {
		axios
			.get('http://localhost:4000/api/projects')
			.then((res) => {
				console.log(res.data);
				setProjects(res.data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	const handleProjectInput = (e) => {
		setNewProject({ ...newProject, [e.target.name]: e.target.value });
	};

	const addProject = (e) => {
		e.preventDefault();
		axios
			.post('http://localhost:4000/api/projects', newProject)
			.then(() => {
				getData();
				setNewProject(initialProject);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="App">
			<h1>List of projects</h1>
			<form onSubmit={addProject}>
				<input
					type="text"
					name="name"
					value={newProject.name}
					onChange={handleProjectInput}
				/>
				<input
					type="text"
					name="description"
					value={newProject.description}
					onChange={handleProjectInput}
				/>
				<button>Add</button>
			</form>
			<ul>
				{projects &&
					projects.map((project) => (
						<Project
							projects={projects}
							project={project}
							getData={getData}
							key={project.id}
						/>
					))}
			</ul>
		</div>
	);
}

export default App;
