const User = require("../models");

const userController = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findById(req.params.userId)
        .populate("thoughts")
        .populate("friends");
      if (!user) return res.status(404).json("No user with that Id");
      res.json(user);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: req.body,
        },
        {
          runValidators: true,
          new: true,
        }
      );
      if (!user) return res.status(404).json("No user with that Id");
      res.json(user);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);
      if (!user) return res.status(404).json("No user with that Id");
      res.json(user);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
};

module.exports = userController;
