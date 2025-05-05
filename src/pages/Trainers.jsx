import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserLayout from '../components/UserLayout';

const Trainers = () => {
  const navigate = useNavigate();
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/auth/trainers')
      .then(res => setTrainers(res.data))
      .catch(err => console.error('Failed to fetch trainers:', err));
  }, []);

  return (
    <UserLayout pageTitle="Trainers">
      <div className="flex justify-center mt-10">
        <div className="bg-green-300 p-10 rounded-xl shadow-lg w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-8 text-center">Available Trainers</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {trainers.map(trainer => (
              <button
                key={trainer._id}
                onClick={() => navigate(`/trainers/${trainer._id}`)}
                className="bg-white py-4 px-6 rounded-lg shadow text-base font-semibold hover:bg-gray-100 transition-all"
              >
                {trainer.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Trainers;
