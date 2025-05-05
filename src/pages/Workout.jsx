import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserLayout from '../components/UserLayout';

const Workout = () => {
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user?.programSelected) {
      axios.get(`${process.env.REACT_APP_API_URL}weeklyworkouts/${encodeURIComponent(user.programSelected)}`)
        .then(res => setWorkoutPlan(res.data))
        .catch(err => console.error('Workout fetch error:', err));
    }
  }, [user]);

  return (
    <UserLayout pageTitle="Workout">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Weekly Workout Plan</h2>

        {!workoutPlan ? (
          <p className="text-center text-gray-500">No workout plan available for your goal.</p>
        ) : (
          Object.entries(workoutPlan).map(([day, categories], idx) => (
            <div key={idx} className="mb-6">
              <h3 className="text-lg font-semibold text-green-700 capitalize mb-2">{day}</h3>
              {['strength', 'cardio', 'stretching'].map((type) => (
                categories[type]?.length > 0 && (
                  <div key={type} className="mb-4">
                    <strong className="capitalize">{type}:</strong>
                    <ul className="ml-4 list-disc">
                      {categories[type].map((item, i) => (
                        <li key={i}>
                          <a href={item.video} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                            {item.name}
                          </a> – {item.description}
                        </li>
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

export default Workout;
