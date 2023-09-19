// Import the Express.js router
const router = require("express").Router();

// Import API routes
const apiRoutes = require("./api"); 

// Use the imported API routes under the base path '/api'
router.use("/api", apiRoutes); 

module.exports = router;
