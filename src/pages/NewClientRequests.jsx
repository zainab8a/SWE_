import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TrainerLayout from '../components/TrainerLayout';

const NewClientRequests = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleAssign = async (e) => {
    e.preventDefault();
    const trainer = JSON.parse(localStorage.getItem('user'));
  
    if (!trainer || !trainer._id) {
      alert('Trainer not logged in');
      return;
    }
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}coaching/assign`, {
        trainerId: trainer._id,
        clientEmail: email,
      });
  
      alert(response.data.message);
      navigate('/oneCoaching');
    } catch (err) {
      console.error('Assignment error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Assignment failed');
    }
  };
  


  return (
    <TrainerLayout pageTitle="Assign New Client">
      <div className="max-w-md mx-auto mt-12 bg-white p-6 shadow rounded-lg">
        <h2 className="text-xl font-bold text-center mb-4 text-[#2D6A4F]">Assign New Client</h2>
        <form onSubmit={handleAssign} className="space-y-4">
          <input
            type="email"
            placeholder="Client Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#2D6A4F] text-white font-semibold py-2 rounded hover:bg-[#1B4332]"
          >
            Assign Client
          </button>
        </form>
      </div>
    </TrainerLayout>
  );
};

export default NewClientRequests;
