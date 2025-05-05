import React, { useState, useEffect } from 'react';
import Layout from '../components/UserLayout';
import axios from 'axios';

const CommunityParticipation = () => {
  const [selected, setSelected] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [joined, setJoined] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = JSON.parse(localStorage.getItem('user'))?._id;

  useEffect(() => {
    if (!userId) {
      console.warn("User ID not found in localStorage.");
      setLoading(false);
      return;
    }

    axios.get(`${process.env.REACT_APP_API_URL}/api/communities/user/${userId}/challenges`)
      .then(res => {
        setChallenges(res.data || []);
      })
      .catch(err => {
        console.error('Error fetching challenges:', err);
        setChallenges([]);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const handleJoin = () => {
    if (selected === null) {
      alert('Please select a challenge to join.');
      return;
    }

    const challenge = challenges[selected];

    axios.post(`${process.env.REACT_APP_API_URL}/api/communities/user/${userId}/join-challenge`, {
      title: challenge.title
    })
    .then(() => {
      alert(`You have joined: ${challenge.title}`);
      setJoined([...joined, challenge.title]);
    })
    .catch(err => {
      console.error('Join error:', err);
      alert('Could not join the challenge.');
    });
  };

  return (
    <Layout pageTitle="Community Participation">
      <div className="flex flex-col items-center gap-8">
        <h2 className="text-xl font-semibold text-green-700">Join a challenge</h2>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : challenges.length === 0 ? (
          <p className="text-gray-500">No challenges found for your community.</p>
        ) : (
          <div className="w-full max-w-xl space-y-2">
            {challenges.map((c, index) => (
              <div
                key={index}
                onClick={() => setSelected(index)}
                className={`cursor-pointer px-6 py-4 rounded border transition-all ${
                  selected === index
                    ? 'bg-green-700 text-white'
                    : 'bg-green-200 hover:bg-green-300'
                }`}
              >
                <div className="font-bold">{c.title}</div>
                <div className="text-sm">{c.description}</div>
                {joined.includes(c.title) && (
                  <div className="text-xs text-green-800 mt-1">Already joined</div>
                )}
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleJoin}
          className="bg-green-500 text-white font-semibold px-8 py-2 rounded hover:bg-green-600"
          disabled={selected === null}
        >
          Join
        </button>
      </div>
    </Layout>
  );
};

export default CommunityParticipation;
