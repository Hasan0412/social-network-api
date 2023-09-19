// Import the Express.js router
const router = require("express").Router();

// Import user and thought routes
const userRoutes = require("./user-routes"); 
const thoughtRoutes = require("./thought-routes");

// Use the imported routes with their respective base paths
router.use("/users", userRoutes); 
router.use("/thoughts", thoughtRoutes); 

// Export the combined router for use in your application
module.exports = router;
