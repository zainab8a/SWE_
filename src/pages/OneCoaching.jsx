import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TrainerLayout from '../components/TrainerLayout';
import axios from 'axios';

const OneCoaching = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const trainer = JSON.parse(localStorage.getItem('user'));

  const fetchClients = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/coaching/${trainer._id}/clients`);
      setClients(res.data);
    } catch (err) {
      console.error('Error loading clients:', err);
    }
  };

  useEffect(() => {
    if (trainer?._id) fetchClients();
  }, [trainer]);

  const handleRemove = async (clientId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/coaching/${trainer._id}/${clientId}`);
      setClients(prev => prev.filter(c => c._id !== clientId));
    } catch (err) {
      console.error('Failed to remove client:', err);
      alert('Could not remove client');
    }
  };

  return (
    <TrainerLayout pageTitle="One on One Coaching">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Registered Clients</h2>
        <button
          onClick={() => navigate('/new-client-requests')}
          className="bg-[#95D5B2] hover:bg-[#74c69d] text-black font-semibold px-4 py-2 rounded shadow-sm"
        >
          New Clients Request
        </button>
      </div>

      <div className="space-y-6">
        {clients.length === 0 ? (
          <p className="text-gray-600">No clients assigned yet.</p>
        ) : (
          clients.map((client, index) => (
            <div
              key={client._id}
              className="bg-[#B7E4C7] p-4 rounded-xl flex justify-between items-center shadow-sm"
            >
              <div>
                <p className="font-bold">{client.name}</p>
                <p className="text-sm">Email: {client.email}</p>
                <p className="text-sm">Plan: {client.programSelected || 'N/A'}</p>
              </div>
              <button
                className="bg-white text-black font-medium px-4 py-1 rounded shadow"
                onClick={() => handleRemove(client._id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </TrainerLayout>
  );
};

export default OneCoaching;
