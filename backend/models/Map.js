const mongoose = require('mongoose');

const mapSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  distance: { type: String, required: true },
  track: { type: String } 
}, { timestamps: true });

module.exports = mongoose.model('Map', mapSchema);
