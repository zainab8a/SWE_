import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/AdminLayout';

const PlansManagement = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const [mealRes, workoutRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}weeklymeals`),
          axios.get(`${process.env.REACT_APP_API_URL}weeklyworkouts`)
        ]);

        const meals = mealRes.data.map(plan => ({ ...plan, type: 'Meal' }));
        const workouts = workoutRes.data.map(plan => ({ ...plan, type: 'Workout' }));

        setPlans([...meals, ...workouts]);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchPlans();
  }, []);

  const handleDelete = async (id, type) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      try {
        const endpoint =
          type === 'Meal'
            ? `${process.env.REACT_APP_API_URL}weeklymeals/${id}`
            : `${process.env.REACT_APP_API_URL}weeklyworkouts/${id}`;

        await axios.delete(endpoint);
        setPlans(plans.filter(plan => plan._id !== id));
      } catch (error) {
        console.error('Error deleting plan:', error);
        alert('Failed to delete plan.');
      }
    }
  };

  return (
    <Layout pageTitle="Plans Management">
      <div className="flex justify-end mb-4">
        {/* Create page not included for these two collections */}
        {/* <Link to="/plans/create"> 
          <button className="bg-[#95D5B2] hover:bg-[#74C69D] text-black font-semibold px-4 py-2 rounded shadow">
            + Create Plan
          </button>
        </Link> */}
      </div>

      <div className="bg-[#E9F5EC] p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-bold mb-4 text-[#2D6A4F]">Weekly Plans</h2>

        <table className="w-full text-left">
          <thead className="text-[#2D6A4F] font-semibold">
            <tr>
              <th className="pb-3">Program</th>
              <th className="pb-3">Type</th>
              <th className="pb-3">Delete</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {plans.map((plan, index) => (
              <tr key={index} className="border-t border-gray-300">
                <td className="py-2">{plan.programSelected}</td>
                <td className="py-2">{plan.type}</td>
                <td className="py-2">
                  <button
                    onClick={() => handleDelete(plan._id, plan.type)}
                    className="bg-white border border-red-400 text-red-600 px-3 py-1 rounded text-sm hover:bg-red-400 hover:text-white transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default PlansManagement;
