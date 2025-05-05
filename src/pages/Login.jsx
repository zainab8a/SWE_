import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Debug log
      console.log("Attempting login with:", email, password);

      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password
      });

      const { token, user } = response.data;

      // Save user info
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user._id);
      localStorage.setItem('user', JSON.stringify(user));

      // Navigate based on role
      if (user.role === 'admin') {
        navigate('/usermanagement');
      } else if (user.role === 'trainer') {
        navigate('/oneCoaching');
      } else {
        navigate('/account');
      }

    } catch (err) {
      console.error("Login error:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-[900px] bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="w-1/2 bg-green-100 flex items-center justify-center p-10">
          <img
            src="/6048832881293379231.png"
            alt="FitTrack Logo"
            className="max-w-full h-auto"
          />
        </div>

        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
            <div className="flex justify-between text-sm text-blue-900 font-semibold">
              <Link to="/forgot-password" className="hover:underline">Forget Password</Link>
              <Link to="/create-account" className="hover:underline">Create Account</Link>
            </div>
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}
            <button
              type="submit"
              className="w-full bg-green-300 py-2 rounded font-semibold hover:bg-green-400"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
