// Import required packages
const express = require("express");
const mongoose = require("mongoose");

// Create an Express.js application instance
const app = express();

// Set the port for the server to listen on, using the environment variable or default to 3001
const PORT = process.env.PORT || 3001;

// Import your API routes 
const routes = require("./routes");

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use your defined routes
app.use(routes);

// Connect to the MongoDB database, using the environment variable or a local database URL
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Enable Mongoose debugging for better error messages during development
mongoose.set('debug', true);

// Start the Express.js server and listen on the specified port
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
