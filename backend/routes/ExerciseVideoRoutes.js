const express = require('express');
const router = express.Router();
const ExerciseVideo = require('../models/ExerciseVideo');

// POST: Upload new video
router.post('/', async (req, res) => {
  try {
    const { title, details, videoLink, imageUrl, type } = req.body;
    const newVideo = new ExerciseVideo({ title, details, videoLink, imageUrl, type });
    await newVideo.save();
    res.status(201).json({ message: 'Video saved successfully', video: newVideo });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET: Fetch all videos
router.get('/', async (req, res) => {
  try {
    const videos = await ExerciseVideo.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;