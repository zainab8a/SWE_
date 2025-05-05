import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const TrainerPersonalInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location.state || {};

  const [form, setForm] = useState({
    name: '',
    age: '',
    experience: '',
    specialization: '',
    focus: '',
    level: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Missing email or password. Please start registration again.');
      navigate('/create-account');
      return;
    }

    try {
      const payload = {
        name: form.name,
        email,
        password,
        height: '',
        weight: '',
        phoneNumber: '',
        programSelected: form.focus,
        role: 'trainer',

        // Trainer-specific fields
        specialization: form.specialization,
        experience: parseInt(form.experience),
        focus: form.focus,
        trainerLevel: form.level,
      };

      console.log("sending payload to backend:", payload);

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, payload);

      console.log('Trainer registered:', response.data);
      alert('Trainer registered successfully!');
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9f8] px-4 py-10">
      <div className="bg-green-800 text-white text-center py-4 text-2xl font-bold rounded-b-[100px] w-full max-w-6xl mx-auto mb-10">
        Create Account
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-center text-xl font-bold mb-6">Trainer Personal Information</h2>

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
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            className="w-full bg-green-200 px-4 py-3 rounded-md text-sm"
            required
          />
          <input
            type="text"
            name="experience"
            placeholder="Years of Experience"
            value={form.experience}
            onChange={handleChange}
            className="w-full bg-green-200 px-4 py-3 rounded-md text-sm"
            required
          />
          <input
            type="text"
            name="specialization"
            placeholder="Specialization (e.g., Lose Weight, Flexibility)"
            value={form.specialization}
            onChange={handleChange}
            className="w-full bg-green-200 px-4 py-3 rounded-md text-sm"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold mb-3">Workout Focus</h3>
              {['Maintain a healthy lifestyle', 'Lose weight', 'Build muscle'].map((option) => (
                <div
                  key={option}
                  onClick={() => handleSelect('focus', option)}
                  className={`cursor-pointer px-3 py-2 rounded hover:bg-green-100 ${
                    form.focus === option ? 'bg-green-200 font-semibold' : ''
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold mb-3">Trainer Level</h3>
              {['Intermediate', 'Advanced'].map((level) => (
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

          <div className="text-center">
            <button
              type="submit"
              className="bg-green-400 hover:bg-green-500 px-6 py-2 rounded-lg font-semibold text-white"
            >
              Create Trainer Account
            </button>
          </div>
        </form>
      </div>

      <div className="text-center mt-10 text-sm text-gray-700">
        Already have an account?{' '}
        <Link to="/" className="text-black font-semibold underline hover:text-green-700">
          Login
        </Link>
      </div>
    </div>
  );
};

export default TrainerPersonalInfo;
