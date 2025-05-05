import React, { useState, useEffect } from 'react';
import Layout from '../components/AdminLayout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReportSelection = () => {
  const navigate = useNavigate();
  const [reportType, setReportType] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (reportType) {
      fetchData();
    }
  }, [reportType]);

  const fetchData = async () => {
    try {
      let endpoint = '';
      if (reportType === 'user') endpoint = 'auth/report/users';
      else if (reportType === 'community') endpoint = 'communities/report/communities';
      else if (reportType === 'trainer') endpoint = 'auth/report/trainers';

      const res = await axios.get(`${process.env.REACT_APP_API_URL}${endpoint}`);
      setData(res.data);
    } catch (error) {
      console.error('Fetch report data error:', error.message);
    }
  };

  const handleView = (item) => {
    navigate('/report/detail', { state: { reportType, data: item } });
  };

  return (
    <Layout pageTitle="Reports">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#2D6A4F]">Generate Reports</h2>

      <div className="max-w-xl mx-auto mb-8">
        <label className="block font-semibold text-[#2D6A4F] mb-2">Report For</label>
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none"
        >
          <option value="">-- Select --</option>
          <option value="user">User</option>
          <option value="community">Community</option>
          <option value="trainer">Trainer</option>
        </select>
      </div>

      {reportType && data.length > 0 && (
        <div className="max-w-4xl mx-auto bg-[#E9F5EC] p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4 capitalize text-[#2D6A4F]">{reportType} List</h3>
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="text-[#2D6A4F] border-b font-semibold">
                <th className="py-2">Name</th>
                <th className="py-2">Details</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody className="text-[#2D6A4F]">
              {data.map((item, index) => (
                <tr key={index} className="border-b hover:bg-[#B7E4C7] transition">
                  <td className="py-2">{item.name}</td>
                  <td className="py-2">
                    {/* customize these details further */}
                    {reportType === 'user' && <>Email: {item.email}</>}
                    {reportType === 'community' && <>Members: {item.members.length}, Challenges: {item.challenges.length}</>}
                    {reportType === 'trainer' && <>Email: {item.email}</>}
                  </td>
                  <td className="py-2">
                    <button
                      onClick={() => handleView(item)}
                      className="bg-[#95D5B2] hover:bg-[#74C69D] text-black px-4 py-1 rounded text-sm font-semibold shadow"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default ReportSelection;