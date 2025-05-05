import React, { useEffect, useState } from 'react';
import UserLayout from '../components/UserLayout';
import axios from 'axios';

const Meal = () => {
  const [mealPlan, setMealPlan] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user?.programSelected) {
      axios.get(`${process.env.REACT_APP_API_URL}/weeklymeals/${encodeURIComponent(user.programSelected)}`)
      .then(res => setMealPlan(res.data))
        .catch(err => console.error('Meal fetch error:', err));
    }
  }, [user]);

  return (
    <UserLayout pageTitle="Weekly Meal Plan">
      <div className="max-w-5xl mx-auto mt-6">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Weekly Meal Plan</h2>

        {!mealPlan ? (
          <p className="text-center text-gray-500">No meal plan available for your goal.</p>
        ) : (
          Object.entries(mealPlan).map(([day, meals], idx) => (
            <div key={idx} className="mb-6 border bg-green-50 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-green-700 capitalize mb-2">{day}</h3>
              {['breakfast', 'lunch', 'dinner', 'snacks'].map((type) => (
                meals[type]?.length > 0 && (
                  <div key={type} className="mb-2">
                    <strong className="capitalize">{type}:</strong>
                    <ul className="ml-4 list-disc">
                      {meals[type].map((item, i) => (
                        <li key={i}>{item.name} - {item.description}</li>
                      ))}
                    </ul>
                  </div>
                )
              ))}
            </div>
          ))
        )}
      </div>
    </UserLayout>
  );
};

export default Meal;
