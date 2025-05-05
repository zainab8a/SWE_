import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TrainerLayout from '../components/TrainerLayout';

const TrainingSessions = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);

  const trainer = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetch('http://localhost:8080/api/sessions')
      .then(res => res.json())
      .then(data => {
        // Filter sessions by trainer ID
        const mySessions = data.filter(s => s.trainer?._id === trainer._id);
        setSessions(mySessions);
      })
      .catch(err => console.error('Fetch error:', err));
  }, [trainer]);

  return (
    <TrainerLayout pageTitle="Training Sessions">
      <div className="w-full max-w-5xl mx-auto">
        <div className="bg-[#B7E4C7] p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Sessions</h2>
            <button
              onClick={() => navigate('/training-sessions/create')}
              className="bg-white border border-gray-400 px-4 py-2 rounded hover:shadow"
            >
              +Create Session
            </button>
          </div>

          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-700 font-semibold border-b border-green-400">
                <th className="py-2">Name</th>
                <th>Location</th>
                <th>Time</th>
                <th>Price</th>
                <th>Available Seats</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session, index) => (
                <tr key={index} className="border-t border-green-300">
                  <td className="py-2">{session.name}</td>
                  <td>{session.location}</td>
                  <td>{session.time}</td>
                  <td>{session.price}</td>
                  <td>{session.availableSeats}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </TrainerLayout>
  );
};

export default TrainingSessions;
