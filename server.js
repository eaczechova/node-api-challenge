const express = require('express');
const CORS = require('cors');
const projectsRouter = require('./projects/projectsRouter');
const actionsRouter = require('./actions/actionsRouter');
const server = express();
server.use(express.json());

server.use(CORS());

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
	res.send(`<h2>Hello from the app!</h2>`);
});

module.exports = server;
