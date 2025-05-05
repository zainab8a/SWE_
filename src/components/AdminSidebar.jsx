import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiUser,
  FiFileText,
  FiMap,
  FiBell,
  FiUsers,
  FiGift,
  FiLogOut,
  FiBookOpen,
} from 'react-icons/fi';

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); 
  };

  return (
    <div className="w-64 bg-white border-r h-screen p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-6">
          Admin <span className="block text-sm font-normal">panel</span>
        </h1>

        <ul className="space-y-2">
          <li>
            <Link
              to="/usermanagement"
              className="flex items-center gap-3 py-2 text-gray-700 hover:text-black"
            >
              <FiUser className="text-xl" />
              <span>User Management</span>
            </Link>
          </li>

          <li>
            <Link
              to="/plans"
              className="flex items-center gap-3 py-2 text-gray-700 hover:text-black"
            >
              <FiFileText className="text-xl" />
              <span>Plans Management</span>
            </Link>
          </li>

          <li>
            <Link
              to="/maps"
              className="flex items-center gap-3 py-2 text-gray-700 hover:text-black"
            >
              <FiMap className="text-xl" />
              <span>Maps</span>
            </Link>
          </li>

          <li>
            <Link
              to="/notification/settings"
              className="flex items-center gap-3 py-2 text-gray-700 hover:text-black"
            >
              <FiBell className="text-xl" />
              <span>Share Push Notifications</span>
            </Link>
          </li>
          
          <li>
            <Link
              to="/community"
              className="flex items-center gap-3 py-2 text-gray-700 hover:text-black"
            >
              <FiUsers className="text-xl" />
              <span>Community Managment</span>
            </Link>
          </li>

          <li>
            <Link
              to="/rewards"
              className="flex items-center gap-3 py-2 text-gray-700 hover:text-black"
            >
              <FiGift className="text-xl" />
              <span>Rewards</span>
            </Link>
          </li>

          <li>
            <Link
              to="/report"
              className="flex items-center gap-3 py-2 text-gray-700 hover:text-black"
            >
              <FiBookOpen className="text-xl" />
              <span>Reports</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Log out button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 text-gray-600 hover:text-black"
      >
        <FiLogOut className="text-xl" />
        <span>Log out</span>
      </button>
    </div>
  );
};

export default AdminSidebar;
