// Import the required models
const { Thought, User } = require("../models");

// Define the thoughtController object to handle thought-related operations
const thoughtController = {
  // Get all thoughts
  get_all_thoughts(req, res) {
    Thought.find({})
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(error => {
        console.log(error);
        res.status(500).json(error);
      });
  },

  // Get a thought by its ID
  get_thought_by_id({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'Error! No thoughts found with the chosen id' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(error => {
        console.log(error);
        res.status(400).json(error);
      });
  },

  // Add a new thought
  add_thought({ body }, res) {
    Thought.create(body)
      .then(dbThoughtData => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then(db_user_data => {
        if (!db_user_data) {
          res.status(404).json({ message: 'Error! No user with this id' });
          return;
        }
        res.json(db_user_data);
      })
      .catch(error => res.json(error));
  },

  // Update a thought by its ID
  update_thought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'Error! No thoughts found with the chosen id' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(error => res.status(400).json(error));
  },

  // Remove a thought by its ID
  remove_thought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'Error! No thoughts found with the chosen id' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(error => res.status(400).json(error));
  },

  // Add a reaction to a thought
  add_reaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'Error! No thoughts found with the chosen id' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(error => res.json(error));
  },

  // Remove a reaction from a thought
  remove_reaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'Error! No thoughts found with the chosen id' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(error => res.json(error));
  }
};

// Export the thoughtController for use in your application
module.exports = thoughtController;
