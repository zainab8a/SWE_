const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: String,
}, { _id: false });

const communitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  description: { type: String, default: 'No details provided' },
  challenges: [challengeSchema],
}, { timestamps: true });

module.exports = mongoose.model('Community', communitySchema);
