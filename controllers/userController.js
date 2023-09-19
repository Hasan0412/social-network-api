// Import the required User model
const { User } = require("../models");

// Define the userController object to handle user-related operations
const userController = {
  // Get all users
  get_all_users(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .then(db_user_data => res.json(db_user_data))
      .catch(error => {
        console.log(error);
        res.status(500).json(error);
      });
  },

  // Get a user by their ID
  get_user_by_id({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .then(db_user_data => {
        if (!db_user_data) {
          res.status(404).json({ message: 'Error! No user with this id' });
          return;
        }
        res.json(db_user_data);
      })
      .catch(error => {
        console.log(error);
        res.status(400).json(error);
      });
  },

  // Add a new user
  add_user({ body }, res) {
    User.create(body)
      .then(db_user_data => res.json(db_user_data))
      .catch(error => res.status(400).json(error));
  },

  // Update a user by their ID
  update_user({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(db_user_data => {
        if (!db_user_data) {
          res.status(404).json({ message: 'Error! No user with this id' });
          return;
        }
        res.json(db_user_data);
      })
      .catch(error => res.status(400).json(error));
  },

  // Remove a user by their ID
  remove_user({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(db_user_data => {
        if (!db_user_data) {
          res.status(404).json({ message: 'Error! No user with this id' });
          return;
        }
        res.json(db_user_data);
      })
      .catch(error => res.status(400).json(error));
  },

  // Add a friend to a user's friend list
  add_friend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendId } },
      { runValidators: true, new: true }
    )
      .then(db_user_data => {
        if (!db_user_data) {
          res.status(404).json({ message: 'Error! No user found with this id!' });
          return;
        }
        res.json(db_user_data);
      })
      .catch(error => res.status(400).json(error));
  },

  // Remove a friend from a user's friend list
  remove_friend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then(db_user_data => {
        if (!db_user_data) {
          res.status(404).json({ message: 'Error! No user found with this id!' });
          return;
        }
        res.json(db_user_data);
      })
      .catch(error => res.json(error));
  }
};

// Export the userController for use in your application
module.exports = userController;
