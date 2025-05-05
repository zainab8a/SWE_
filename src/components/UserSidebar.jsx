import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FiUser,
  FiActivity,
  FiCalendar,
  FiGift,
  FiLogOut,
  FiUsers,
  FiBarChart2,
} from 'react-icons/fi';

import {
  FaUsers,
  FaHandshake
} from 'react-icons/fa';

const UserSidebar = () => {
  const [userName, setUserName] = useState('User');
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/users/${userId}`)
        .then((res) => {
          const capitalizeFirstLetter = (str) =>
            str.charAt(0).toUpperCase() + str.slice(1);
          setUserName(capitalizeFirstLetter(res.data.name));
        })
        .catch((err) => console.error('Error fetching user:', err));
    } else {
      console.warn('No userId found in localStorage.');
    }
  }, []);

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
          <div className="text-xl font-bold">{userName},</div>
        </div>

        <nav className="space-y-6 text-sm font-medium">
          <Link to="/account" className="flex items-center gap-3 text-gray-700 hover:text-black">
            <FiUser className="text-xl" />
            Account
          </Link>

          <Link to="/progress" className="flex items-center gap-3 text-gray-700 hover:text-black">
            <FiBarChart2 className="text-xl" />
            Progress
          </Link>

          <Link to="/meal" className="flex items-center gap-3 text-gray-700 hover:text-black">
            <FiCalendar className="text-xl" />
            Meal
          </Link>

          <Link to="/workout" className="flex items-center gap-3 text-gray-700 hover:text-black">
            <FiActivity className="text-xl" />
            Workout
          </Link>

          <Link to="/communityParticipation" className="flex items-center gap-3 text-gray-700 hover:text-black">
            <FaUsers className="text-xl" />
            Community Participation
          </Link>

          <Link to="/trainers" className="flex items-center gap-3 py-2 text-gray-700 hover:text-black">
            <FiUsers className="text-xl" />
            Trainers
          </Link>

          <Link to="/my-coaching" className="flex items-center gap-3 text-gray-700 hover:text-black">
          <FaHandshake className="text-xl" />
          One-on-One Coaching
          </Link>
        </nav>
      </div>

      {/* Log out */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 text-gray-600 hover:text-black"
      >
        <FiLogOut className="text-xl" />
        Log out
      </button>
    </div>
  );
};

export default UserSidebar;
