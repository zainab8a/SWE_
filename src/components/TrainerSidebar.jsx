import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaDumbbell,
  FaUsers,
  FaHandshake,
  FaSignOutAlt,
} from 'react-icons/fa';

const TrainerSidebar = () => {
  const navigate = useNavigate();

  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const name = user?.name || 'Trainer';

  const handleLogout = () => {
    localStorage.clear(); 
    navigate('/');
  };

  return (
    <div className="w-64 h-screen bg-white border-r flex flex-col justify-between px-6 py-8">
      {/* Top Section */}
      <div>
        <div className="mb-10">
          <div className="text-sm text-gray-500">Hello</div>
          <div className="text-xl font-bold">Trainer {name},</div>
        </div>

        <nav className="space-y-6 text-sm font-medium">
          <Link to="/training-sessions" className="flex items-center gap-3 text-gray-700 hover:text-black">
            <FaDumbbell className="text-lg" />
            Training Sessions
          </Link>

          <Link to="/trainer/community" className="flex items-center gap-3 text-gray-700 hover:text-black">
            <FaUsers className="text-lg" />
            Community
          </Link>

          <Link to="/oneCoaching" className="flex items-center gap-3 text-gray-700 hover:text-black">
            <FaHandshake className="text-lg" />
            One on One Coaching
          </Link>
        </nav>
      </div>

      {/* Log out */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 text-gray-600 hover:text-black"
      >
        <FaSignOutAlt className="text-lg" />
        Log out
      </button>
    </div>
  );
};

export default TrainerSidebar;
