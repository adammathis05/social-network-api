const Thought = require("../models");

const thoughtController = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) return res.status(404).json("No thought with that id");
      res.json(thought);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        {
          $set: req.body,
        },
        {
          runValidators: true,
          new: true,
        }
      );
      if (!thought) return res.status(404).json("No thought with that id");
      res.json(thought);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!thought) return res.status(404).json("No thought with that Id");
      res.json(thought);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
};

module.exports = thoughtController;
