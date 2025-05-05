const express = require('express');
const router = express.Router();
const Community = require('../models/Community');
const User = require('../models/User');

// Get all communities with trainer & members
router.get('/', async (req, res) => {
  try {
    const communities = await Community.find()
      .populate('trainer', 'name email')
      .populate('members', 'name email');
    res.json(communities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new community
router.post('/', async (req, res) => {
  try {
    const newCommunity = new Community(req.body);
    await newCommunity.save();
    const populated = await newCommunity.populate('trainer');
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update community
router.put('/:id', async (req, res) => {
  try {
    const updated = await Community.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('trainer');
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete community
router.delete('/:id', async (req, res) => {
  try {
    await Community.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add member by email
router.put('/:id/add-member', async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    const user = await User.findOne({ email: req.body.email });
    if (!community || !user) return res.status(404).json({ message: 'Not found' });

    if (!community.members.includes(user._id)) {
      community.members.push(user._id);
      await community.save();
    }

    const populated = await Community.findById(req.params.id).populate('members trainer');
    res.json(populated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove member by ID
router.put('/:id/remove-member', async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    community.members = community.members.filter(id => id.toString() !== req.body.userId);
    await community.save();

    const populated = await Community.findById(req.params.id).populate('members trainer');
    res.json(populated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add challenge
router.put('/:id/add-challenge', async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) return res.status(404).json({ message: 'Community not found' });

    const { title, description, duration } = req.body;
    if (!title || !description || !duration) {
      return res.status(400).json({ message: 'All challenge fields are required' });
    }

    community.challenges.push({ title, description, duration });
    await community.save();
    res.json(community);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove challenge
router.put('/:id/remove-challenge', async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    community.challenges = community.challenges.filter(ch => ch.title !== req.body.title);
    await community.save();
    res.json(community);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/report/communities', async (req, res) => {
    try {
      const communities = await Community.find()
        .populate('trainer', 'name')
        .populate('members', 'name');
      res.status(200).json(communities);
    } catch (error) {
      console.error('Error fetching communities for report:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  });


// Get challenges for the community where the user is a member
router.get('/user/:userId/challenges', async (req, res) => {
  try {
    const userId = req.params.userId;
    const community = await Community.findOne({ members: userId });

    if (!community) {
      return res.status(404).json({ message: 'User is not in any community' });
    }

    res.status(200).json(community.challenges);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Join a challenge (add to user's joinedChallenges)
router.post('/user/:userId/join-challenge', async (req, res) => {
  try {
    const { title } = req.body;
    const user = await User.findById(req.params.userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.joinedChallenges) user.joinedChallenges = [];
    if (!user.joinedChallenges.includes(title)) {
      user.joinedChallenges.push(title);
      await user.save();
    }

    res.json({ message: 'Challenge joined' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;