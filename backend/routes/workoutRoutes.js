const express = require('express');
const router = express.Router();
const {
  getAllWeeklyWorkoutPlans,
  getWeeklyWorkoutPlan,
  deleteWeeklyWorkoutPlan
} = require('../controllers/workoutPlanController');

router.get('/', getAllWeeklyWorkoutPlans);
router.get('/:goal', getWeeklyWorkoutPlan);
router.delete('/:id', deleteWeeklyWorkoutPlan);

module.exports = router;
