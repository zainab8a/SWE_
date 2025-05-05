const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

// Import route files
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const planRoutes = require('./routes/planRoutes');
const mapRoutes = require('./routes/mapRoutes');
const communityRoutes = require('./routes/communityRoutes');
const addChallengeRoutes = require('./routes/AddChallengeRoutes');
const createSessionRoutes = require('./routes/CreateSessionRoutes');
const addMealRoutes = require('./routes/AddMealRoutes'); // For adding individual meals
const exerciseVideoRoutes = require('./routes/ExerciseVideoRoutes');
const weeklyMealRoutes = require('./routes/mealRoutes'); // For weekly structured plans
const workoutRoutes = require('./routes/workoutRoutes');
const coachingRoutes = require('./routes/coachingRoutes');


// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (images from uploads folder)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/maps', mapRoutes);
app.use('/api/communities', communityRoutes);
app.use('/api/challenges', addChallengeRoutes);
app.use('/api/sessions', createSessionRoutes);
app.use('/api/meals', addMealRoutes);             
app.use('/api/weeklymeals', weeklyMealRoutes);    
app.use('/api/exercises', exerciseVideoRoutes);
app.use('/api/weeklyworkouts', workoutRoutes);
app.use('/api/coaching', coachingRoutes);



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
