import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email || !newPassword) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/auth/forget-password`, {
        email,
        newPassword,
      });

      alert(res.data.message);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Password reset failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Logo Panel */}
        <div className="w-full md:w-1/2 bg-green-100 flex items-center justify-center p-6">
          <img src="/6048832881293379231.png" alt="FitTrack Logo" className="w-48 h-auto" />
        </div>

        {/* Right Form Panel */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-4 text-center">Reset Your Password</h2>

          <form onSubmit={handleReset} className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none"
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-300 text-black font-semibold py-2 rounded hover:bg-green-400"
            >
              Update Password
            </button>
          </form>

          <p
            onClick={() => navigate('/')}
            className="mt-4 text-center text-blue-700 underline cursor-pointer"
          >
            Back to login
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
