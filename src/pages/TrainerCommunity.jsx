import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TrainerLayout from '../components/TrainerLayout';

const TrainerCommunity = () => {
  const [challenges, setChallenges] = useState([]);
  const [communityId, setCommunityId] = useState(null);
  const [communityName, setCommunityName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');

  const trainer = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!trainer?._id) return;

    axios.get('http://localhost:8080/api/communities')
      .then((res) => {
        const myCommunity = res.data.find(c => c.trainer?._id === trainer._id);
        if (myCommunity) {
          setChallenges(myCommunity.challenges || []);
          setCommunityId(myCommunity._id);
          setCommunityName(myCommunity.name);
        } else {
          setChallenges([]);
        }
      })
      .catch((err) => console.error('Error fetching community:', err));
  }, [trainer]);

  const handleAddChallenge = async () => {
    if (!title || !description || !duration) {
      alert('Please fill all fields');
      return;
    }

    try {
      const res = await axios.put(`http://localhost:8080/api/communities/${communityId}/add-challenge`, {
        title, description, duration
      });

      setChallenges(res.data.challenges);
      setTitle('');
      setDescription('');
      setDuration('');
      alert('Challenge added successfully!');
    } catch (err) {
      console.error('Error adding challenge:', err);
      alert('Failed to add challenge');
    }
  };

  const handleDeleteChallenge = async (titleToDelete) => {
    try {
      const res = await axios.put(`http://localhost:8080/api/communities/${communityId}/remove-challenge`, {
        title: titleToDelete
      });

      setChallenges(res.data.challenges);
      alert('Challenge deleted successfully!');
    } catch (err) {
      console.error('Error deleting challenge:', err);
      alert('Failed to delete challenge');
    }
  };

  return (
    <TrainerLayout pageTitle="Community">
      <div className="flex flex-col md:flex-row justify-center mt-12 gap-8 px-4">

        {/* Left: Challenges List */}
        <div className="bg-[#E9F5EC] rounded-xl px-6 py-6 w-full md:w-1/2 shadow-md">
          <h2 className="text-lg font-bold text-[#2D6A4F] mb-4">
            {communityName ? `${communityName} Challenges` : 'No Community Assigned'}
          </h2>

          {challenges.length === 0 ? (
            <p className="text-gray-600">No challenges added yet.</p>
          ) : (
            <div className="space-y-4">
              {challenges.map((challenge, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg px-4 py-3 text-sm shadow text-[#2D6A4F] relative border border-green-100"
                >
                  <div className="font-semibold">{challenge.title}</div>
                  <div className="text-gray-700">{challenge.description}</div>
                  <div className="text-gray-500 text-xs mt-1">Duration: {challenge.duration}</div>
                  <button
                    onClick={() => handleDeleteChallenge(challenge.title)}
                    className="absolute top-2 right-2 text-red-500 text-xs hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Add Challenge Form */}
        <div className="bg-[#E9F5EC] rounded-xl px-6 py-6 w-full md:w-1/2 shadow-md">
          <h2 className="text-lg font-bold text-[#2D6A4F] mb-4">Add New Challenge</h2>

          <input
            type="text"
            placeholder="Challenge Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-3 border border-gray-300 px-4 py-2 rounded"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mb-3 border border-gray-300 px-4 py-2 rounded"
          />

          <input
            type="text"
            placeholder="Duration (e.g., 1 Week)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full mb-5 border border-gray-300 px-4 py-2 rounded"
          />

          <button
            onClick={handleAddChallenge}
            className="bg-[#2D6A4F] text-white px-6 py-2 rounded hover:bg-[#1B4332] font-semibold"
          >
            Add Challenge
          </button>
        </div>
      </div>
    </TrainerLayout>
  );
};

export default TrainerCommunity;
