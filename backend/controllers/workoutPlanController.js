const WeeklyWorkoutPlan = require('../models/WeeklyWorkoutPlans');

// Get all workout plans
const getAllWeeklyWorkoutPlans = async (req, res) => {
  try {
    const plans = await WeeklyWorkoutPlan.find();
    res.status(200).json(plans);
  } catch (error) {
    console.error('Error fetching workout plans:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get workout plan by goal
const getWeeklyWorkoutPlan = async (req, res) => {
  try {
    const { goal } = req.params;
    const plan = await WeeklyWorkoutPlan.findOne({ programSelected: goal });

    if (!plan) {
      return res.status(404).json({ message: 'Workout plan not found for this goal' });
    }

    res.json(plan.week);
  } catch (error) {
    console.error('Workout fetch error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete workout plan
const deleteWeeklyWorkoutPlan = async (req, res) => {
  try {
    const { id } = req.params;
    await WeeklyWorkoutPlan.findByIdAndDelete(id);
    res.status(200).json({ message: 'Workout plan deleted successfully' });
  } catch (error) {
    console.error('Delete workout plan error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllWeeklyWorkoutPlans,
  getWeeklyWorkoutPlan,
  deleteWeeklyWorkoutPlan
};
