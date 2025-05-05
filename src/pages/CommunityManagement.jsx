import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/AdminLayout';

const CommunityManagement = () => {
  const [communities, setCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [trainers, setTrainers] = useState([]);
  const [newCommunity, setNewCommunity] = useState({ name: '', trainer: '' });
  const [memberEmail, setMemberEmail] = useState('');
  const [challenge, setChallenge] = useState({ title: '', description: '', duration: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [res1, res2] = await Promise.all([
      axios.get(`${process.env.REACT_APP_API_URL}/api/communities`),
      axios.get(`${process.env.REACT_APP_API_URL}/api/auth/trainers`)
    ]);
    setCommunities(res1.data);
    setTrainers(res2.data);
  };

  const handleCreate = async () => {
    if (!newCommunity.name || !newCommunity.trainer) {
      return alert('Please fill all fields.');
    }

    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/communities`, newCommunity);
    setCommunities([...communities, res.data]);
    setNewCommunity({ name: '', trainer: '' });
  };

  const handleDeleteCommunity = async (id) => {
    if (!window.confirm('Are you sure you want to delete this community?')) return;
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/communities/${id}`);
    setCommunities(communities.filter(c => c._id !== id));
  };

  const handleAddMember = async () => {
    if (!memberEmail.trim()) {
      alert('Please enter a valid email.');
      return;
    }
  
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/communities/${selectedCommunity._id}/add-member`, {
        email: memberEmail.trim()
      });
  
      setSelectedCommunity(res.data); // Update community with new member
      setMemberEmail(''); // Clear input
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add member.';
      alert(message);
      console.error('Add member error:', error);
    }
  };

  const handleRemoveMember = async (userId) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/communities/${selectedCommunity._id}/remove-member`, { userId });
    setSelectedCommunity(res.data);
    setCommunities(communities.map(c => c._id === res.data._id ? res.data : c));
  };

  const handleAddChallenge = async () => {
    if (!challenge.title  ||  !challenge.description || !challenge.duration) return;
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/communities/${selectedCommunity._id}/add-challenge`, challenge);
    setSelectedCommunity(res.data);
    setCommunities(communities.map(c => c._id === res.data._id ? res.data : c));
    setChallenge({ title: '', description: '', duration: '' });
  };

  const handleRemoveChallenge = async (title) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/communities/${selectedCommunity._id}/remove-challenge`, { title });
    setSelectedCommunity(res.data);
    setCommunities(communities.map(c => c._id === res.data._id ? res.data : c));
  };

  return (
    <Layout pageTitle="Community Management">

      {/* Create Community */}
      <div className="mb-8 p-4 bg-white rounded shadow max-w-xl mx-auto">
        <h3 className="font-semibold text-[#2D6A4F] mb-2">Create New Community</h3>
        <input
          type="text"
          placeholder="Community Name"
          value={newCommunity.name}
          onChange={(e) => setNewCommunity({ ...newCommunity, name: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        />
        <select
          value={newCommunity.trainer}
          onChange={(e) => setNewCommunity({ ...newCommunity, trainer: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        >
          <option value="">Select Trainer</option>
          {trainers.map((t) => (
            <option key={t._id} value={t._id}>{t.name}</option>
          ))}
        </select>
        <button onClick={handleCreate} className="bg-[#52B788] text-white px-4 py-2 rounded">
          Create
        </button>
      </div>

      {/* Community Table */}
      <div className="bg-[#E9F5EC] rounded-lg p-6 shadow-md max-w-5xl mx-auto">
        <h3 className="text-xl font-semibold mb-4 text-[#2D6A4F]">Community List</h3>
        <table className="w-full table-auto text-left border-collapse">
          <thead>
            <tr className="border-b text-[#2D6A4F]">
              <th className="py-2">Name</th>
              <th className="py-2">Trainer</th>
              <th className="py-2"># Members</th>
              <th className="py-2"># Challenges</th>
              <th className="py-2">View</th>
              <th className="py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {communities.map((c) => (
              <tr key={c._id} className="border-b hover:bg-[#95D5B2]">
                <td className="py-2">{c.name}</td>
                <td className="py-2">{c.trainer?.name || '-'}</td>
                <td className="py-2">{c.members?.length || 0}</td>
                <td className="py-2">{c.challenges?.length || 0}</td>
                <td className="py-2">
                  <button onClick={() => setSelectedCommunity(c)} className="text-[#2D6A4F] hover:underline text-sm">View</button>
                </td>
                <td className="py-2">
                  <button onClick={() => handleDeleteCommunity(c._id)} className="text-red-500 hover:underline text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for selected community */}
      {selectedCommunity && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-2xl w-full shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-[#2D6A4F]">
              {selectedCommunity.name} – Managed by {selectedCommunity.trainer?.name || 'N/A'}
            </h3>

            {/* Members */}
            <div className="mb-4">
              <h4 className="font-semibold text-[#2D6A4F] mb-2">Members</h4>
              <ul className="list-disc pl-5 space-y-1">
                {selectedCommunity.members?.map((m, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{m.name || m.email}</span>
                    <button onClick={() => handleRemoveMember(m._id)} className="text-red-500 text-sm">Remove</button>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex">
                <input
                  type="email"
                  value={memberEmail}
                  onChange={(e) => setMemberEmail(e.target.value)}
                  placeholder="User email"
                  className="w-full mr-2 p-2 border rounded"
                />
                <button onClick={handleAddMember} className="bg-[#52B788] text-white px-4 rounded">Add</button>
              </div>
            </div>

            {/* Challenges */}
            <div className="mb-4">
              <h4 className="font-semibold text-[#2D6A4F] mb-2">Challenges</h4>
              <ul className="list-disc pl-5 space-y-1">
                {selectedCommunity.challenges?.map((c, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{c.title} – {c.duration}</span>
                    <button onClick={() => handleRemoveChallenge(c.title)} className="text-red-500 text-sm">Remove</button>
                  </li>
                ))}
              </ul>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Title"
                  value={challenge.title || ''}
                  onChange={(e) => setChallenge({ ...challenge, title: e.target.value })}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={challenge.duration || ''}
                  onChange={(e) => setChallenge({ ...challenge, duration: e.target.value })}
                  className="p-2 border rounded"
                />
              </div>
              <button onClick={handleAddChallenge} className="mt-3 bg-[#52B788] text-white px-4 py-2 rounded">Add Challenge</button>
            </div>

            <div className="text-right">
              <button onClick={() => setSelectedCommunity(null)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Close</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CommunityManagement;