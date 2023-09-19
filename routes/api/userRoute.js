// Import the Express.js router
const router = require("express").Router();

// Import the userController functions
const {
  get_all_users,
  get_user_by_id,
  add_user,
  update_user,
  remove_user,
  add_friend,
  remove_friend
} = require("../../controllers/userController");

// Define routes for handling user-related operations
router
  .route("/")
  .get(get_all_users) // Get all users
  .post(add_user); // Add a new user

router
  .route("/:id")
  .get(get_user_by_id) // Get a user by their ID
  .put(update_user) // Update a user by their ID
  .delete(remove_user); // Remove a user by their ID

router
  .route("/:id/friends/:friendId")
  .post(add_friend); // Add a friend to a user's friend list

router
  .route("/:id/friends/:friendId")
  .delete(remove_friend); // Remove a friend from a user's friend list

// Export the router for use in your application
module.exports = router;
