const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  exercise: {
    type: String,
    required: true
  },
  videoLink: {
    type: String,
    required: true
  },
  meal: {
    breakfast: { type: String },
    lunch: { type: String },
    dinner: { type: String },
    snacks: { type: String }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Plan', planSchema);