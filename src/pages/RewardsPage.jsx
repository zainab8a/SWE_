import React, { useState, useEffect } from 'react';
import Layout from '../components/AdminLayout';
import axios from 'axios';

const RewardsPage = () => {
  const [communities, setCommunities] = useState([]);
  const [selectedCommunityId, setSelectedCommunityId] = useState('');
  const [members, setMembers] = useState([]);
  const [selectedWinnerId, setSelectedWinnerId] = useState('');

  // Fetch communities
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/communities`)
      .then(res => setCommunities(res.data))
      .catch(err => console.error('Failed to load communities:', err));
  }, []);

  // Load members for selected community
  useEffect(() => {
    if (!selectedCommunityId) return;
    axios.get(`${process.env.REACT_APP_API_URL}/communities`)
      .then(res => {
        const community = res.data.find(c => c._id === selectedCommunityId);
        setMembers(community?.members || []);
      })
      .catch(err => console.error('Failed to load members:', err));
  }, [selectedCommunityId]);

  const handleAnnounceWinner = () => {
    const winner = members.find(m => m._id === selectedWinnerId);
    if (!selectedCommunityId || !winner) {
      return alert('Please select a community and winner.');
    }

    alert(`🎉 Congratulations ${winner.name}! You are the weekly challenge winner in your community.`);
  };

  return (
    <Layout pageTitle="Rewards">

      {/* Community dropdown */}
      <div className="max-w-xl mx-auto mb-6">
        <label className="block font-semibold text-[#2D6A4F] mb-2">Select Community</label>
        <select
          value={selectedCommunityId}
          onChange={(e) => setSelectedCommunityId(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded"
        >
          <option value="">-- Select a Community --</option>
          {communities.map(c => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Member selection */}
      {members.length > 0 && (
        <div className="bg-[#E9F5EC] p-6 rounded-lg shadow max-w-3xl mx-auto mb-6">
          <h3 className="text-xl font-bold mb-4 text-[#2D6A4F]">Select Winner</h3>
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="border-b text-[#2D6A4F]">
                <th className="py-2">Select</th>
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
              </tr>
            </thead>
            <tbody className="text-[#2D6A4F]">
              {members.map((user, idx) => (
                <tr key={idx} className="border-b hover:bg-[#B7E4C7] transition">
                  <td className="py-2">
                    <input
                      type="radio"
                      name="winner"
                      value={user._id}
                      onChange={() => setSelectedWinnerId(user._id)}
                    />
                  </td>
                  <td className="py-2">{user.name}</td>
                  <td className="py-2">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Announce winner */}
      <div className="text-center">
        <button
          onClick={handleAnnounceWinner}
          className="bg-[#95D5B2] hover:bg-[#74C69D] text-black font-semibold px-6 py-2 rounded shadow"
        >
          Announce the Winner
        </button>
      </div>
    </Layout>
  );
};

export default RewardsPage;
