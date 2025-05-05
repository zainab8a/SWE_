const express = require('express');
const router = express.Router();
const {
  getAllWeeklyMealPlans,
  getWeeklyMealPlan,
  deleteWeeklyMealPlan
} = require('../controllers/mealPlanController');

router.get('/', getAllWeeklyMealPlans);
router.get('/:goal', getWeeklyMealPlan);
router.delete('/:id', deleteWeeklyMealPlan);

module.exports = router;
