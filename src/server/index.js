const express = require('express');
const cors = require('cors');
const path = require('path'); // You forgot to require this

const routes = require('./routes');

const server = express();
const port = 3001;

// Middleware
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// Serve static files (like uploaded images)
server.use('/images', express.static(path.join(__dirname, '../../public/images')));

// Routes
server.get('/', (req, res) => {
  res.send("Hello");
});
server.use('/', routes);

// Start server
server.listen(port, () => {
  console.log(`server running on port ${port}`);
});
