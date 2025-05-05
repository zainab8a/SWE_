const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  updateUser,
  getAllTrainers,
  getAllUsersReport,
  getAllTrainersReport,
  resetPassword,
  assignTrainer,
  getClientsByTrainer
} = require('../controllers/authController');

// Authentication Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// User Management
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser);

// Trainer dropdown list
router.get('/trainers', getAllTrainers);

// Reports
router.get('/report/users', getAllUsersReport);
router.get('/report/trainers', getAllTrainersReport);

router.put('/reset-password', resetPassword); // oute for password reset

router.post('/assign-trainer', assignTrainer);
router.get('/trainers/:id/clients', getClientsByTrainer);


module.exports = router;