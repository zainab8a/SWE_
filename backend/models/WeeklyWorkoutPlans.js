const mongoose = require('mongoose');

const workoutItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  videoUrl: String,
  image: String
}, { _id: false });

const daySchema = new mongoose.Schema({
  upperBody: [workoutItemSchema],
  cardio: [workoutItemSchema],
  stretching: [workoutItemSchema]
}, { _id: false });

const weeklyWorkoutPlanSchema = new mongoose.Schema({
  programSelected: {
    type: String,
    enum: ['Lose weight', 'Build muscle', 'Maintain a healthy lifestyle'],
    required: true
  },
  week: {
    day1: daySchema,
    day2: daySchema,
    day3: daySchema,
    day4: daySchema,
    day5: daySchema,
    day6: daySchema,
    day7: daySchema
  }
}, { collection: 'weeklyworkoutplans' });

module.exports = mongoose.model('WeeklyWorkoutPlans', weeklyWorkoutPlanSchema);
