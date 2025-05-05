import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/AdminLayout';

const Maps = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    distance: '',
    track: '',
  });

  const [routes, setRoutes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', description: '', distance: '', track: '' });

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/maps`);
      setRoutes(res.data);
    } catch (err) {
      console.error('Failed to fetch maps:', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/maps`, form);
      setRoutes([res.data]); 
      setForm({ name: '', description: '', distance: '', track: '' });
    } catch (err) {
      console.error('Error saving route:', err);
      alert('Failed to save route');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this route?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/maps/${id}`);
        setRoutes([]);
        setEditingId(null);
      } catch (err) {
        console.error('Delete failed:', err);
        alert('Delete failed');
      }
    }
  };

  const handleEdit = (route) => {
    setEditingId(route._id);
    setEditForm({ ...route });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/maps/${editingId}`, editForm);
      setRoutes([res.data]);
      setEditingId(null);
    } catch (err) {
      console.error('Update failed:', err);
      alert('Update failed');
    }
  };

  return (
    <Layout pageTitle="Maps">
      <div className="max-w-4xl mx-auto">
        {/* Add Route Form (only shown when no routes saved) */}
        {routes.length === 0 && (
          <form className="space-y-4 mb-10" onSubmit={handleSubmit}>
            <h3 className="text-xl font-bold text-[#2D6A4F]">Add Route</h3>
            {['name', 'description', 'distance', 'track'].map((field) => (
              <div key={field}>
                <label className="block text-[#2D6A4F] font-semibold capitalize">{field}</label>
                <input
                  type="text"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={field}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  required={field !== 'track'}
                />
              </div>
            ))}
            <button
              type="submit"
              className="bg-[#95D5B2] hover:bg-[#74C69D] px-6 py-2 rounded text-black font-semibold shadow"
            >
              Save
            </button>
          </form>
        )}

        {/* Show saved route */}
        {routes.map((route) =>
          editingId === route._id ? (
            <div key={route._id} className="bg-white p-8 rounded-xl shadow mb-8 border border-gray-300 w-full text-lg">
              <h4 className="text-xl font-semibold text-[#2D6A4F] mb-4">Edit Route</h4>
              {['name', 'description', 'distance', 'track'].map((field) => (
                <div key={field} className="mb-3">
                  <label className="block text-[#2D6A4F] font-semibold capitalize">{field}</label>
                  <input
                    type="text"
                    name={field}
                    value={editForm[field]}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    required={field !== 'track'}
                  /></div>
                ))}
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={handleEditSubmit}
                    className="bg-[#95D5B2] hover:bg-[#74C69D] px-6 py-2 rounded text-black font-semibold shadow"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded text-black font-semibold shadow"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div key={route._id} className="bg-white p-8 rounded-xl shadow mb-8 border border-gray-300 w-full text-lg">
                <h3 className="text-2xl font-bold text-[#2D6A4F] mb-3">{route.name}</h3>
                <p className="mb-2"><strong>Description:</strong> {route.description}</p>
                <p className="mb-2"><strong>Distance:</strong> {route.distance}</p>
                <p className="mb-2"><strong>Track:</strong> {route.track}</p>
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => handleEdit(route)}
                    className="bg-[#95D5B2] hover:bg-[#74C69D] px-6 py-2 rounded text-black font-semibold shadow"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(route._id)}
                    className="bg-[#95D5B2] hover:bg-red-400 px-6 py-2 rounded text-black font-semibold shadow"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </Layout>
    );
  };
  
  export default Maps;
  