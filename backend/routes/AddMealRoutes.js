const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage });

// Model
const Meal = require('../models/AddMeal');

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, ingredients, type, category } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!name  || !ingredients  || !type  || !category  || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const meal = new Meal({ name, ingredients, type, category, image });
    await meal.save();

    res.status(201).json({ message: 'Meal added successfully', meal });
  } catch (err) {
    console.error('Add meal error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;