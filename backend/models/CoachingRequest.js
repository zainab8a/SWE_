const mongoose = require('mongoose');

const coachingRequestSchema = new mongoose.Schema({
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'approved' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CoachingRequest', coachingRequestSchema);

