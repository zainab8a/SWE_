import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/AdminLayout';

const NotificationSettings = () => {
  const navigate = useNavigate();
  const [type, setType] = useState('');
  const [method, setMethod] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/notification/send');
  };

  return (
    <Layout pageTitle="Notification Settings">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#2D6A4F]">
        Share and Push Notifications
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-[#E9F5EC] p-6 rounded-xl shadow-md max-w-xl mx-auto space-y-6"
      >
        <div>
          <label className="block text-lg font-semibold text-[#2D6A4F] mb-2">Type</label>
          <div className="space-y-2">
            {[
              "Challenge Updates",
              "Reminders",
              "User Registration",
              "System Announcements",
              "Reward Announcements",
            ].map((option) => (
              <label className="flex items-center gap-2 text-[#2D6A4F]" key={option}>
                <input
                  type="radio"
                  name="type"
                  value={option}
                  onChange={() => setType(option)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-lg font-semibold text-[#2D6A4F] mb-2">Delivery Method</label>
          <div className="space-y-2">
            {["SMS", "Email", "Push notification"].map((methodOption) => (
              <label className="flex items-center gap-2 text-[#2D6A4F]" key={methodOption}>
                <input
                  type="radio"
                  name="method"
                  value={methodOption}
                  onChange={() => setMethod(methodOption)}
                />
                {methodOption}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#95D5B2] hover:bg-[#74C69D] text-black px-6 py-2 rounded font-semibold shadow"
        >
          Save Settings
        </button>
      </form>
    </Layout>
  );
};

export default NotificationSettings;