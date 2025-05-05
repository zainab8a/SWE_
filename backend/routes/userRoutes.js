const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Trainer receives a request from a user
router.post('/:trainerId/request', async (req, res) => {
  try {
    const trainer = await User.findById(req.params.trainerId);
    if (!trainer || trainer.role !== 'trainer') {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    const { userId, name, email } = req.body;

    trainer.trainerRequests.push({ userId, name, email });
    await trainer.save();

    res.status(200).json({ message: 'Request sent to trainer' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/trainer/:id', async (req, res) => {
    try {
      const trainer = await User.findById(req.params.id).select('-password');
      if (!trainer || trainer.role !== 'trainer') {
        return res.status(404).json({ message: 'Trainer not found' });
      }
      res.json(trainer);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  

module.exports = router;
