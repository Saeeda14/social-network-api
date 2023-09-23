const Thought = require('../models/Thought');
const { validationResult } = require('express-validator');

// Controller to get all thoughts
const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find().populate('reactions.username');
    res.json(thoughts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to get a single thought by ID
const getThoughtById = async (req, res) => {
  const thoughtId = req.params.id;

  try {
    const thought = await Thought.findById(thoughtId).populate(
      'reactions.username'
    );

    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to create a new thought
const createThought = async (req, res) => {
  const { thoughtText, username } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newThought = await Thought.create({ thoughtText, username });
    res.status(201).json(newThought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to update a thought by ID
const updateThought = async (req, res) => {
  const thoughtId = req.params.id;
  const { thoughtText } = req.body;

  try {
    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { thoughtText },
      { new: true }
    );

    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to delete a thought by ID
const deleteThought = async (req, res) => {
  const thoughtId = req.params.id;

  try {
    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    await thought.remove();
    res.json({ message: 'Thought deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to add a reaction to a thought
const addReaction = async (req, res) => {
  const thoughtId = req.params.thoughtId;
  const { reactionBody, username } = req.body;

  try {
    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    thought.reactions.push({ reactionBody, username });
    await thought.save();

    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to remove a reaction from a thought
const removeReaction = async (req, res) => {
  const thoughtId = req.params.thoughtId;
  const reactionId = req.params.reactionId;

  try {
    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    thought.reactions = thought.reactions.filter(
      (reaction) => reaction._id.toString() !== reactionId
    );
    await thought.save();

    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
};
