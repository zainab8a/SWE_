import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const CreateAccountDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password, accountType } = location.state || {};

  const [form, setForm] = useState({
    name: '',
    weight: '',
    height: '',
    goal: '',
    level: '',
    specialization: '',
    experience: '',
    focus: '',
    trainerLevel: '',
  });

  useEffect(() => {
    if (!email || !password || !accountType) {
      alert('Missing account information. Please restart registration.');
      navigate('/create-account');
    }
  }, [email, password, accountType, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Validate trainer-specific fields if trainer
    if (accountType === 'trainer') {
      const missing = !form.specialization || !form.experience || !form.focus || !form.trainerLevel;
      if (missing) {
        alert('Please fill in all trainer-specific fields.');
        return;
      }
    }

    // Build payload dynamically based on account type
    const payload = {
      name: form.name,
      email,
      password,
      height: parseFloat(form.height),
      weight: parseFloat(form.weight),
      phoneNumber: '',
      programSelected: form.goal,
      level: form.level,
      role: accountType,
      ...(accountType === 'trainer' && {
        specialization: form.specialization,
        experience: parseInt(form.experience),
        focus: form.focus,
        trainerLevel: form.trainerLevel,
      }),
    };

    console.log('Payload being sent to backend:', payload);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, payload);
      console.log('Registration successful:', response.data);
      alert('Registration successful! Please login.');
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9f8] px-4 py-10">
      <div className="bg-green-800 text-white text-center py-4 text-2xl font-bold rounded-b-[100px] w-full max-w-6xl mx-auto mb-10">
        Create Account
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-center text-xl font-bold mb-6">Personal Information</h2>

        <form onSubmit={handleSubmit} className="space-y-4 mb-10">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full bg-green-200 px-4 py-3 rounded-md text-sm"
            required
          />
          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            value={form.weight}
            onChange={handleChange}
            className="w-full bg-green-200 px-4 py-3 rounded-md text-sm"
            required
          />
          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            value={form.height}
            onChange={handleChange}
            className="w-full bg-green-200 px-4 py-3 rounded-md text-sm"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold mb-3">Goal</h3>
              {['Maintain a healthy lifestyle', 'Lose weight', 'Build muscle'].map((goal) => (
                <div
                  key={goal}
                  onClick={() => handleSelect('goal', goal)}
                  className={`cursor-pointer px-3 py-2 rounded hover:bg-green-100 ${
                    form.goal === goal ? 'bg-green-200 font-semibold' : ''
                  }`}
                >
                  {goal}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold mb-3">Workout Level</h3>
              {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                <div
                  key={level}
                  onClick={() => handleSelect('level', level)}
                  className={`cursor-pointer px-3 py-2 rounded hover:bg-green-100 ${
                    form.level === level ? 'bg-green-200 font-semibold' : ''
                  }`}
                >
                  {level}
                </div>
              ))}
            </div>
          </div>

          {/* Trainer-specific fields */}
          {accountType === 'trainer' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Trainer Details</h3>
              <input
                type="text"
                name="specialization"
                placeholder="Specialization"
                value={form.specialization}
                onChange={handleChange}
                className="w-full bg-green-100 px-4 py-3 rounded-md text-sm"
                required
              />
              <input
                type="number"
                name="experience"
                placeholder="Years of Experience"
                value={form.experience}
                onChange={handleChange}
                className="w-full bg-green-100 px-4 py-3 rounded-md text-sm"
                required
              />
              <input
                type="text"
                name="focus"
                placeholder="Focus Area (e.g., fat loss, strength)"
                value={form.focus}
                onChange={handleChange}
                className="w-full bg-green-100 px-4 py-3 rounded-md text-sm"
                required
              />
              <input
                type="text"
                name="trainerLevel"
                placeholder="Trainer Level (e.g., Certified, Expert)"
                value={form.trainerLevel}
                onChange={handleChange}
                className="w-full bg-green-100 px-4 py-3 rounded-md text-sm"
                required
              />
            </div>
          )}

          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-green-400 hover:bg-green-500 px-6 py-2 rounded-lg font-semibold text-white"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccountDetails;
