import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserLayout from '../components/UserLayout';

const Account = () => {
  const [user, setUser] = useState(null);
  const [communities, setCommunities] = useState([]);
  const [userCommunity, setUserCommunity] = useState(null);
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [isJoining, setIsJoining] = useState(false);

  const userId = localStorage.getItem('userId');

  // Fetch user profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/users/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };
    fetchUser();
  }, [userId]);

  // Fetch communities and match with user goal
  useEffect(() => {
    if (!user || user.role !== 'user') return;

    axios.get('http://localhost:8080/api/communities')
      .then(res => {
        const allCommunities = res.data;

        const joined = allCommunities.find(c =>
          c.members.some(member => member._id === user._id)
        );
        setUserCommunity(joined || null);

        if (!joined) {
          const filtered = allCommunities.filter(c =>
            c.name.toLowerCase().includes(user.programSelected?.toLowerCase())
          );
          setCommunities(filtered);
        }
      })
      .catch(err => console.error('Error loading communities:', err));
  }, [user]);

  const handleJoinCommunity = async () => {
    if (!selectedCommunity) return;

    try {
      await axios.put(`http://localhost:8080/api/communities/${selectedCommunity}/add-member`, {
        email: user.email
      });
      alert('Joined successfully!');
      window.location.reload();
    } catch (err) {
      alert('Join failed');
      console.error(err);
    }
  };

  if (!user) return <div className="p-8 text-center text-gray-500">Loading profile...</div>;

  return (
    <UserLayout pageTitle="User Account">
      <div className="flex flex-col lg:flex-row justify-between gap-10">

        {/* Personal Information */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-center bg-green-300 text-black font-bold py-2 rounded-md mb-4">
            Personal Information
          </h2>
          <div className="space-y-2 text-gray-700">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Weight:</strong> {user.weight} kg</p>
            <p><strong>Height:</strong> {user.height} cm</p>
            <p><strong>Goal:</strong> {user.programSelected}</p>
            <p><strong>Workout Level:</strong> {user.level || 'Not set'}</p>
            <p><strong>Account Type:</strong> {user.role}</p>
          </div>
        </div>

        {/* Community Participation */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-center bg-green-300 text-black font-bold py-2 rounded-md mb-4">
            Community Participation
          </h2>

          {userCommunity ? (
            <div className="space-y-2 text-gray-700">
              <p><strong>Name:</strong> {userCommunity.name}</p>
              <p><strong>Description:</strong> {userCommunity.description || 'No details provided'}</p>
              <p><strong>Trainer:</strong> {userCommunity.trainer?.name || 'N/A'}</p>
            </div>
          ) : (
            <div className="text-center">
              <button
                onClick={() => setIsJoining(true)}
                className="bg-green-500 text-white px-4 py-2 rounded font-semibold shadow"
              >
                Join Community
              </button>

              {isJoining && (
                <div className="mt-4 space-y-2">
                  <select
                    value={selectedCommunity}
                    onChange={(e) => setSelectedCommunity(e.target.value)}
                    className="w-full border px-4 py-2 rounded"
                  >
                    <option value="">Select a Community</option>
                    {communities.map(c => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                  <button
                    onClick={handleJoinCommunity}
                    className="bg-green-600 text-white px-4 py-2 rounded font-semibold"
                  >
                    Join Selected Community
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default Account;
