const express = require('express');
const router = express.Router();
const Map = require('../models/Map');

// GET all maps
router.get('/', async (req, res) => {
  try {
    const maps = await Map.find();
    res.json(maps);
  } catch (err) {
    console.error('Error fetching maps:', err);
    res.status(500).json({ error: 'Failed to fetch maps' });
  }
});

// CREATE a new map
router.post('/', async (req, res) => {
    try {
      console.log('Route received:', req.body); 
      const newMap = new Map(req.body);
      await newMap.save();
      res.status(201).json(newMap);
    } catch (err) {
      console.error('Error creating map:', err);
      res.status(500).json({ error: 'Failed to create map' });
    }
  });

// UPDATE a map by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Map.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Map not found' });
    res.json(updated);
  } catch (err) {
    console.error('Error updating map:', err);
    res.status(500).json({ error: 'Update failed' });
  }
});

// DELETE a map by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Map.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Map not found' });
    res.json({ message: 'Map deleted' });
  } catch (err) {
    console.error('Error deleting map:', err);
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;
