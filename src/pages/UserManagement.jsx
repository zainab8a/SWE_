import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // moved inside
  const [editForm, setEditForm] = useState({
    name: '',
    weight: '',
    height: '',
    programSelected: '',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/auth/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:8080/api/auth/users/${id}`);
        setUsers(users.filter(user => user._id !== id));
        alert('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user.');
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditForm({
      name: user.name || '',
      weight: user.weight || '',
      height: user.height || '',
      programSelected: user.programSelected || '',
    });
  };

  const handleSaveEdit = async () => {
    try {
      const updatedUser = {
        ...editingUser,
        ...editForm,
      };

      await axios.put(`http://localhost:8080/api/auth/users/${editingUser._id}`, updatedUser);

      setUsers(users.map(u => (u._id === editingUser._id ? updatedUser : u)));
      setEditingUser(null);
      alert('User updated successfully.');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user.');
    }
  };

  return (
    <AdminLayout pageTitle="User Management">
      <div className="bg-[#E9F5EC] p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-bold mb-4 text-[#2D6A4F]">Users</h2>
        <table className="w-full text-left">
          <thead className="text-[#2D6A4F] font-semibold">
            <tr>
              <th className="pb-3">Name</th>
              <th className="pb-3">Email</th>
              <th className="pb-3">Role</th>
              <th className="pb-3">Program</th>
              <th className="pb-3">Modify</th>
              <th className="pb-3">Delete</th>
            </tr>
          </thead>
          <tbody className="text-[#2D6A4F]">
            {users
              .filter(user => user.role !== 'admin') // Exclude admin
              .map((user, index) => (
                <tr key={index} className="border-t border-gray-300 hover:bg-[#B7E4C7] transition">
                  <td className="py-2">{user.name}</td>
                  <td className="py-2">{user.email}</td>
                  <td className="py-2 capitalize">{user.role}</td>
                  <td className="py-2">{user.programSelected || '-'}</td>
                  <td className="py-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-white border border-[#2D6A4F] text-[#2D6A4F] px-3 py-1 rounded text-sm hover:bg-[#2D6A4F] hover:text-white transition"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="py-2">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-white border border-red-400 text-red-600 px-3 py-1 rounded text-sm hover:bg-red-400 hover:text-white transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Edit Modal */}
        {editingUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-md">
              <h2 className="text-lg font-bold mb-6 text-center text-green-700">Edit User</h2>

              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Weight"
                  value={editForm.weight}
                  onChange={(e) => setEditForm({ ...editForm, weight: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Height"
                  value={editForm.height}
                  onChange={(e) => setEditForm({ ...editForm, height: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Program Selected"
                  value={editForm.programSelected}
                  onChange={(e) => setEditForm({ ...editForm, programSelected: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </form>

              <div className="flex justify-end mt-6 space-x-4">
                <button
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default UserManagement;      