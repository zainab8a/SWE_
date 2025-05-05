import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/AdminLayout';

const EditPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    category: '',
    exercise: '',
    videoLink: '',
    meal: {
      breakfast: '',
      lunch: '',
      dinner: '',
      snacks: ''
    }
  });

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}plans/${id}`);
        const data = res.data;
        setForm({
          name: data.name || '',
          category: data.category || '',
          exercise: data.exercise || '',
          videoLink: data.videoLink || '',
          meal: {
            breakfast: data.meal?.breakfast || '',
            lunch: data.meal?.lunch || '',
            dinner: data.meal?.dinner || '',
            snacks: data.meal?.snacks || ''
          }
        });
      } catch (error) {
        console.error('Error fetching plan:', error);
        alert('Failed to fetch plan data.');
      }
    };
    fetchPlan();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['breakfast', 'lunch', 'dinner', 'snacks'].includes(name)) {
      setForm((prev) => ({
        ...prev,
        meal: {
          ...prev.meal,
          [name]: value
        }
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}plans/${id}`, form);
      alert('Plan updated successfully!');
      navigate('/plans');
    } catch (error) {
      console.error('Error updating plan:', error);
      alert('Failed to update plan.');
    }
  };

  return (
    <Layout pageTitle="Edit Plan">
      <div className="max-w-xl mx-auto">
        <div className="bg-[#B7E4C7] text-center text-[#2D6A4F] font-bold py-3 rounded-lg mb-6 shadow">
          Edit Plan
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#2D6A4F] font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-[#2D6A4F] font-semibold">Category</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-[#2D6A4F] font-semibold">Exercises</label>
            <input
              type="text"
              name="exercise"
              value={form.exercise}
              onChange={handleChange}
              placeholder="e.g. Push-ups, Squats"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-[#2D6A4F] font-semibold">YouTube Link</label>
            <input
              type="text"
              name="videoLink"
              value={form.videoLink}
              onChange={handleChange}
              placeholder="e.g. https://youtube.com/..."
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-[#2D6A4F] font-semibold mb-2">Meal Suggestions</label>

            <input
              type="text"
              name="breakfast"
              value={form.meal.breakfast}
              onChange={handleChange}
              placeholder="Breakfast"
              className="w-full mb-2 px-4 py-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="lunch"
              value={form.meal.lunch}
              onChange={handleChange}
              placeholder="Lunch"
              className="w-full mb-2 px-4 py-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="dinner"
              value={form.meal.dinner}
              onChange={handleChange}
              placeholder="Dinner"
              className="w-full mb-2 px-4 py-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="snacks"
              value={form.meal.snacks}
              onChange={handleChange}
              placeholder="Snacks"
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-[#95D5B2] hover:bg-[#74c69d] px-6 py-2 rounded text-black font-semibold shadow"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditPlan;