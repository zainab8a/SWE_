import React, { useEffect, useState } from 'react';
import UserLayout from '../components/UserLayout';
import axios from 'axios';

const MyCoaching = () => {
  const [trainer, setTrainer] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user?._id) return;

    axios.get(`${process.env.REACT_APP_API_URL}coaching/client/${user._id}/trainer`)
      .then(res => setTrainer(res.data))
      .catch(err => console.error('No coach found:', err));
  }, [user]);

  return (
    <UserLayout pageTitle="My One-on-One Coaching">
      {trainer ? (
        <div className="bg-green-100 p-6 rounded-xl max-w-lg mx-auto mt-10 shadow">
          <h2 className="text-xl font-bold mb-4">Your Assigned Trainer</h2>
          <p><strong>Name:</strong> {trainer.name}</p>
          <p><strong>Email:</strong> {trainer.email}</p>
          <p><strong>Specialization:</strong> {trainer.specialization || 'N/A'}</p>
          <p><strong>Experience:</strong> {trainer.experience || 'N/A'} years</p>
        </div>
      ) : (
        <div className="bg-green-50 p-4 text-center rounded mt-10 text-gray-700 max-w-md mx-auto">
          You have not registered for one-on-one coaching yet.
        </div>
      )}
    </UserLayout>
  );
};

export default MyCoaching;
