const mongoose = require('mongoose');
const mealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: { type: String, required: true },
  image: { type: String }, // for image filename
  type: { type: String },
  category: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('AddMeal', mealSchema);