const mongoose = require('mongoose');

const ExerciseVideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  details: { type: String },
  videoLink: { type: String },
  imageUrl: { type: String },
  type: { type: String }, 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ExerciseVideo', ExerciseVideoSchema);