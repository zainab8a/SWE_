const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  workoutType: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
}, { timestamps: true });

module.exports = mongoose.model('CreateSession', sessionSchema);