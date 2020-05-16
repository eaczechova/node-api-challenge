import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Project = ({ project, getData }) => {
	const deleteProject = (id) => {
		axios
			.delete(`http://localhost:4000/api/projects/${id}`)
			.then((res) => {
				console.log(res.data);
				getData();
			})
			.catch((err) => console.log(err));
	};

	return (
		<li>
			<div>
				<h2>{project.name}</h2>
				<p>{project.description}</p>
				<label>
					{' '}
					Project status:
					<input type="checkbox" />
				</label>
				<button onClick={() => deleteProject(project.id)}>Delete</button>
				{/* <a>Actions</a> */}
			</div>
		</li>
	);
};

export default Project;
