const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const db = require('./data/models');
const errorRef = require('./utils/errorRef');
const validateBody = require('./middleware/validateBody');
const validateId = require('./middleware/validateId');

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

const bodyShape = {
  title: {
    required: true,
    type: 'string',
  },
  genre: {
    required: true,
    type: 'string',
  },
  releaseYear: {
    required: false,
    type: 'number',
  },
};

server.post('/games', validateBody(bodyShape), async (req, res) => {
  try {
    const game = await db.add(req.body);
    res.status(201).json(game);
  } catch (error) {
    if (error.message.match(/unique constraint failed/i)) {
      return res.status(405).json({ message: `Provided title must be unique, the title: \`${req.body.title}\` already exists in the database` });
    }
    return res.status(500).json(errorRef(error));
  }
});

server.get('/games/:id', validateId(db), async (req, res) => {
  res.json(req.resource);
});

module.exports = server;
