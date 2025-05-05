import React, { useState } from 'react';
import Layout from '../components/AdminLayout';

const NotificationSending = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [audience, setAudience] = useState('');
  const [dateTime, setDateTime] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    console.log({ title, message, audience, dateTime });
    alert("Notification sent!");
  };

  return (
    <Layout pageTitle="Send Notification">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#2D6A4F]">
        Share and Push Notifications
      </h2>

      <form
        onSubmit={handleSend}
        className="bg-[#E9F5EC] p-6 rounded-xl shadow-md max-w-xl mx-auto space-y-6"
      >
        <div>
          <label className="block text-[#2D6A4F] font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded mt-2 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[#2D6A4F] font-semibold">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded mt-2 focus:outline-none resize-none"
            rows="4"
          />
        </div>

        <div>
          <label className="block text-[#2D6A4F] font-semibold">Audience</label>
          <select
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded mt-2 focus:outline-none"
          >
            <option value="">Select Audience</option>
            <option value="Community Members">Community Members</option>
            <option value="Challenge Participation">Challenge Participation</option>
            <option value="Trainers only">Trainers only</option>
            <option value="Everyone">Everyone</option>
          </select>
        </div>

        <div>
          <label className="block text-[#2D6A4F] font-semibold">Date and Time</label>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded mt-2 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="bg-[#95D5B2] hover:bg-[#74c69d] text-black px-6 py-2 rounded font-semibold shadow"
        >
          Send Notification
        </button>
      </form>
    </Layout>
  );
};

export default NotificationSending;