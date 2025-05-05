const express = require('express');
const router = express.Router();
const Challenge = require('../models/AddChallenge'); 

router.post('/', async (req, res) => {
  try {
    const { name, detail, community } = req.body;

    if (!name  ||!detail|| !community) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const challenge = new Challenge({ name, detail, community });
    await challenge.save();

    res.status(201).json({ message: 'Challenge added successfully', challenge });
  } catch (err) {
    console.error('Challenge creation error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.status(200).json(challenges);
  } catch (err) {
    console.error('Fetch challenges error:', err.message);
    res.status(500).json({ message: 'Failed to fetch challenges' });
  }
});

module.exports = router;