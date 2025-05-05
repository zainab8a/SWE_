const mongoose = require('mongoose');

const mealItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String
}, { _id: false });

const daySchema = new mongoose.Schema({
  breakfast: [mealItemSchema],
  lunch: [mealItemSchema],
  dinner: [mealItemSchema],
  snacks: [mealItemSchema]
}, { _id: false });

const weeklyMealPlanSchema = new mongoose.Schema({
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
}, { collection: 'weeklymealplans' });

module.exports = mongoose.model('WeeklyMealPlans', weeklyMealPlanSchema);
