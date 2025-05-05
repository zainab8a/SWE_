const express = require('express');
const router = express.Router();
const CreateSession = require('../models/CreateSession');

// Create a new training session
router.post('/', async (req, res) => {
  try {
    const { name, workoutType, time, location, price, availableSeats, trainerId } = req.body;

    if (!name || !workoutType || !time || !location || !price || !availableSeats || !trainerId) {
      return res.status(400).json({ message: 'All fields are required including trainerId' });
    }

    const newSession = new CreateSession({
      name,
      workoutType,
      time,
      location,
      price,
      availableSeats,
      trainer: trainerId
    });

    await newSession.save();

    res.status(201).json({ message: 'Session created successfully', session: newSession });
  } catch (err) {
    console.error('Session creation error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch all training sessions and populate trainer name
router.get('/', async (req, res) => {
  try {
    const sessions = await CreateSession.find().populate('trainer', 'name');
    res.status(200).json(sessions);
  } catch (err) {
    console.error('Error fetching sessions:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/trainer/:id', async (req, res) => {
  try {
    const sessions = await CreateSession.find({ trainer: req.params.id });
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
