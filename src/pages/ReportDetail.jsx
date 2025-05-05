import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/AdminLayout';

const ReportDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { reportType, data } = location.state || {};

  const handlePrint = () => {
    window.print();
  };

  if (!data) {
    return <div className="text-center mt-10 text-[#2D6A4F]">No data to show.</div>;
  }

  return (
    <Layout pageTitle="Report Details">
      <div className="max-w-2xl mx-auto bg-[#E9F5EC] p-6 rounded-xl shadow mt-6">
        <h2 className="text-2xl font-bold mb-4 text-[#2D6A4F]">Report for {data.name}</h2>

        <div className="space-y-3 text-[#2D6A4F]">
          {/* USER REPORT */}
          {reportType === 'user' && (
            <>
              <p><strong>Total Steps:</strong> {data.steps}</p>
              <p><strong>Challenges Joined:</strong> {data.challenges}</p>
              <p><strong>Calories Burned:</strong> {data.calories}</p>
              <p><strong>Active Days:</strong> {data.activeDays}</p>
              <p><strong>Goals Achieved:</strong> {data.goals}</p>
              <p><strong>Average Progress:</strong> {data.progress}%</p>
            </>
          )}

          {/* TRAINER REPORT */}
          {reportType === 'trainer' && (
            <>
              <p><strong>Clients:</strong> {data.clients}</p>
              <p><strong>Plans Created:</strong> {data.plans}</p>
              <p><strong>Training Sessions:</strong> {data.sessions}</p>
              <p><strong>Average Client Progress:</strong> {data.avgProgress}%</p>
              <p><strong>Rating:</strong> {data.rating} / 5</p>
            </>
          )}

          {/* COMMUNITY REPORT */}
          {reportType === 'community' && (
            <>
              <p><strong>Community Name:</strong> {data.name}</p>

              <p><strong>Trainer:</strong> {data.trainer?.name || 'N/A'}</p>

              <div>
                <strong>Members:</strong>
                <ul className="list-disc pl-5">
                  {data.members && data.members.length > 0 ? (
                    data.members.map((member, index) => (
                      <li key={index}>{member.name}</li>
                    ))
                  ) : (
                    <li>No members yet.</li>
                  )}
                </ul>
              </div>

              <div>
                <strong>Challenges:</strong>
                <ul className="list-disc pl-5">
                  {data.challenges && data.challenges.length > 0 ? (
                    data.challenges.map((challenge, index) => (
                      <li key={index}>
                        <strong>Title:</strong> {challenge.title} <br />
                        <strong>Description:</strong> {challenge.description} <br />
                        <strong>Duration:</strong> {challenge.duration}
                      </li>
                    ))
                  ) : (
                    <li>No challenges yet.</li>
                  )}
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-white border border-[#2D6A4F] text-[#2D6A4F] px-4 py-2 rounded font-semibold hover:bg-[#2D6A4F] hover:text-white transition"
          >
            Back
          </button>

          <button
            onClick={handlePrint}
            className="bg-[#95D5B2] hover:bg-[#74C69D] text-black px-4 py-2 rounded font-semibold shadow"
          >
            Print Report
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ReportDetail;