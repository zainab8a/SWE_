import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TrainerLayout from '../components/TrainerLayout';

const CreateTrainingSession = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    workoutType: '',
    time: '',
    location: '',
    price: '',
    availableSeats: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trainer = JSON.parse(localStorage.getItem('user'));
    if (!trainer?._id) {
      alert('Trainer not found in session');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          trainerId: trainer._id // send trainer ID with session
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Error submitting session');
      } else {
        alert('Session created successfully');
        navigate('/training-sessions');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <TrainerLayout pageTitle="Training Sessions">
      <div className="w-full max-w-lg mx-auto mt-4">
        {/* Title Bar */}
        <div className="bg-[#95D5B2] text-center py-3 rounded shadow-md text-lg font-semibold mb-6">
          Create a Session
        </div>

        {/* Form Box */}
        <form onSubmit={handleSubmit} className="bg-white space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Session Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Type of Workout</label>
            <input
              type="text"
              name="workoutType"
              placeholder="Type of Workout"
              value={formData.workoutType}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Price</label>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Available Seats</label>
            <input
              type="number"
              name="availableSeats"
              placeholder="Available Seats"
              value={formData.availableSeats}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="bg-[#95D5B2] hover:bg-[#74C69D] text-black font-semibold px-6 py-2 rounded shadow"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </TrainerLayout>
  );
};

export default CreateTrainingSession;
