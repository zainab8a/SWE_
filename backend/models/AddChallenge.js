const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  detail: { type: String, required: true },
  community: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('AddChallenge', challengeSchema);