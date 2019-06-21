const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

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

module.exports = server;
