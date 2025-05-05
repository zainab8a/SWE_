const WeeklyMealPlan = require('../models/WeeklyMealPlans');

// Get all meal plans
const getAllWeeklyMealPlans = async (req, res) => {
  try {
    const plans = await WeeklyMealPlan.find();
    res.status(200).json(plans);
  } catch (error) {
    console.error('Error fetching meal plans:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get plan by goal
const getWeeklyMealPlan = async (req, res) => {
  try {
    const { goal } = req.params;
    const plan = await WeeklyMealPlan.findOne({ programSelected: goal });

    if (!plan) {
      return res.status(404).json({ message: 'Meal plan not found for this goal' });
    }

    res.json(plan.week);
  } catch (error) {
    console.error('Meal fetch error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete meal plan
const deleteWeeklyMealPlan = async (req, res) => {
  try {
    const { id } = req.params;
    await WeeklyMealPlan.findByIdAndDelete(id);
    res.status(200).json({ message: 'Meal plan deleted successfully' });
  } catch (error) {
    console.error('Delete meal plan error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllWeeklyMealPlans,
  getWeeklyMealPlan,
  deleteWeeklyMealPlan
};
