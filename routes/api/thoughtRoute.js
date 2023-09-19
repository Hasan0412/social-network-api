// Import the Express.js router
const router = require("express").Router();

// Import the thoughtController functions
const {
  get_all_thoughts,
  get_thought_by_id,
  add_thought,
  update_thought,
  remove_thought,
  add_reaction,
  remove_reaction
} = require("../../controllers/thoughtController");

// Define routes for handling thought-related operations
router
  .route("/")
  .get(get_all_thoughts) // Get all thoughts
  .post(add_thought); // Add a new thought

router
  .route("/:id")
  .get(get_thought_by_id) // Get a thought by its ID
  .put(update_thought) // Update a thought by its ID
  .delete(remove_thought); // Remove a thought by its ID

router
  .route("/:thoughtId/reactions")
  .post(add_reaction); // Add a reaction to a thought

router
  .route("/:thoughtId/reactions/:reactionId")
  .delete(remove_reaction); // Remove a reaction from a thought

// Export the router for use in your application
module.exports = router;
