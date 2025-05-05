import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserLayout from '../components/UserLayout';

const TrainerDetails = () => {
  const { id } = useParams(); // Trainer ID from URL
  const [trainer, setTrainer] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    // Fetch trainer info
    axios.get(`${process.env.REACT_APP_API_URL}/api/users/trainer/${id}`)
      .then(res => setTrainer(res.data))
      .catch(err => console.error('Trainer fetch error:', err));

    // Fetch sessions for trainer
    axios.get(`${process.env.REACT_APP_API_URL}/api/sessions/trainer/${id}`)
      .then(res => setSessions(res.data))
      .catch(err => console.error('Session fetch error:', err));
  }, [id]);

  const handleRegister = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Please log in first');
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/coaching/assign`, {
        trainerId: id,
        clientEmail: user.email
      });

      setRequested(true);
      alert('Successfully registered for one-on-one coaching!');
    } catch (err) {
      console.error('Request error:', err);
      alert(err.response?.data?.message || 'Failed to send coaching request');
    }
  };

  if (!trainer) {
    return (
      <UserLayout pageTitle="Trainer Details">
        <div className="text-center mt-10">Loading trainer information...</div>
      </UserLayout>
    );
  }

  return (
    <UserLayout pageTitle={`Trainer: ${trainer.name}`}>
      <div className="max-w-4xl mx-auto space-y-6 mt-10">

        {/* Trainer Info */}
        <div className="bg-green-100 p-6 rounded-xl shadow space-y-2">
          <h2 className="text-xl font-bold text-green-900 mb-2">Trainer Information</h2>
          <p><strong>Specialization:</strong> {trainer.specialization || 'N/A'}</p>
          <p><strong>Experience:</strong> {trainer.experience || 'N/A'}</p>
          <p><strong>Focus:</strong> {trainer.focus || 'N/A'}</p>
          <p><strong>Level:</strong> {trainer.trainerLevel || 'N/A'}</p>
        </div>

        {/* One-on-One Coaching */}
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-bold text-green-800 mb-4">One-on-One Coaching</h2>
          <button
            onClick={handleRegister}
            disabled={requested}
            className={`w-full py-2 rounded ${requested ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white font-semibold`}
          >
            {requested ? 'Request Sent' : 'Register for One-on-One Coaching'}
          </button>
        </div>

        {/* Training Sessions */}
        <div className="bg-[#E9F5EC] p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold text-green-900 mb-4">Training Sessions</h2>
          {sessions.length === 0 ? (
            <p className="text-gray-600">No sessions available.</p>
          ) : (
            sessions.map(session => (
              <div key={session._id} className="bg-white p-4 rounded shadow mb-4">
                <p><strong>Name:</strong> {session.name}</p>
                <p><strong>Type:</strong> {session.workoutType}</p>
                <p><strong>Time:</strong> {session.time}</p>
                <p><strong>Location:</strong> {session.location}</p>
                <p><strong>Price:</strong> {session.price} SAR</p>
              </div>
            ))
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default TrainerDetails;
