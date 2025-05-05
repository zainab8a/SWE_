const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user or trainer
const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      height,
      weight,
      phoneNumber,
      programSelected,
      level,
      role,
      specialization,
      experience,
      focus,
      trainerLevel
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      height,
      weight,
      phoneNumber,
      programSelected,
      level,
      role,
      specialization,
      experience,
      focus,
      trainerLevel,
      joinedChallenges: []
    });

    await newUser.save();
    console.log('User registered successfully');
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Register Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        height: user.height,
        weight: user.weight,
        phoneNumber: user.phoneNumber,
        programSelected: user.programSelected,
        level: user.level,
        specialization: user.specialization,
        experience: user.experience,
        focus: user.focus,
        trainerLevel: user.trainerLevel,
        joinedChallenges: user.joinedChallenges || []
      }
    });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get All Non-Admin Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: 'admin' } }, '-password');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error getting users:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update User Info
const updateUser = async (req, res) => {
  try {
    const { name, weight, height, programSelected, level } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, weight, height, programSelected, level },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Update user error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get All Trainers
const getAllTrainers = async (req, res) => {
  try {
    const trainers = await User.find({ role: 'trainer' }, '-password');
    res.status(200).json(trainers);
  } catch (error) {
    console.error('Trainer fetch error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Reports
const getAllUsersReport = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }, '-password');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users for report:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllTrainersReport = async (req, res) => {
  try {
    const trainers = await User.find({ role: 'trainer' }, '-password');
    res.status(200).json(trainers);
  } catch (error) {
    console.error('Error fetching trainers for report:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific trainer by ID
const getTrainerById = async (req, res) => {
  try {
    const trainer = await User.findById(req.params.id);
    if (!trainer || trainer.role !== 'trainer') {
      return res.status(404).json({ message: 'Trainer not found' });
    }
    res.json(trainer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// PUT /api/users/reset-password
const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Reset password error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};


const assignTrainer = async (req, res) => {
  const { trainerId, clientEmail } = req.body;

  try {
    const client = await User.findOne({ email: clientEmail.toLowerCase().trim() });
    if (!client || client.role !== 'user') {
      return res.status(404).json({ message: 'Client not found or not a user' });
    }

    client.trainer = trainerId;
    await client.save();

    res.status(200).json({ message: 'Trainer assigned to client successfully' });
  } catch (error) {
    console.error('Assign trainer error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};



// Get all clients assigned to a trainer
const getClientsByTrainer = async (req, res) => {
  try {
    const clients = await User.find({ trainer: req.params.id, role: 'user' }, '-password');
    res.status(200).json(clients);
  } catch (err) {
    console.error('Error fetching clients:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};




module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  updateUser,
  getAllTrainers,
  getAllUsersReport,
  getAllTrainersReport,
  getTrainerById, 
  resetPassword, 
  assignTrainer,
  getClientsByTrainer
};
