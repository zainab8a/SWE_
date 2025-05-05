const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },

  // General fields
  height: { type: Number },
  weight: { type: Number },
  phoneNumber: { type: String },
  programSelected: { type: String },
  level: { type: String }, // user's workout level
  joinedChallenges: [String],

  // Role: user, trainer, or admin
  role: { type: String, enum: ['user', 'trainer', 'admin'], default: 'user' },

  // Trainer-specific fields
  specialization: { type: String },
  experience: { type: Number }, // years of experience
  focus: { type: String },       // workout focus
  trainerLevel: { type: String }, 

  // Requests sent to this trainer
  trainerRequests: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: String,
      email: String,
      trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      status: { type: String, default: 'pending' }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
