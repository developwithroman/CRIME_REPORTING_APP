// index.js

require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const sequelize = require('./config/database'); // Import Sequelize instance
const app = express();

// Middleware setup
app.use(express.json()); // For parsing application/json

// Test database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch(err => {
    console.log('Error: ' + err);
  });

// Import routes
const appRoutes = require('./routes');

// Use routes
app.use('/', appRoutes);


// Set up the server to listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

