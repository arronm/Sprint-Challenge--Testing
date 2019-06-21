const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const db = require('./data/models');
const errorRef = require('./utils/errorRef');

const middleware = [
  express.json(),
  helmet(),
  cors(),
];

server = express();
server.use(middleware);

server.get('/', (req, res) => {
  res.json({ message: "API is running, better go catch it!" });
});

server.get('/games', async (req, res) => {
  try {
    let games = await db.get();
    res.json(games);
  } catch (error) {
    res.status(500).json(errorRef(error));
  }
});

module.exports = server;
