import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';
import UserLayout from '../components/UserLayout';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const Progress = () => {
  // Example step data
  const stepData = [2000, 5000, 6000, 4000, 7000, 3000, 4000];
  const stepLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Calories burned logic
  const goalCalories = 2000;
  const currentCalories = 1200;
  const caloriePercent = Math.round((currentCalories / goalCalories) * 100);

  const chartData = {
    labels: stepLabels,
    datasets: [
      {
        label: 'Steps',
        data: stepData,
        fill: false,
        borderColor: '#047857',
        tension: 0.3,
      },
    ],
  };

  return (
    <UserLayout pageTitle="Progress">
      <div className="flex flex-col items-center space-y-12 mt-6">
        {/* Steps Section */}
        <div className="text-center">
          <h3 className="bg-green-300 text-black px-4 py-2 rounded-lg font-semibold mb-4">Steps</h3>
          <div className="w-[300px] sm:w-[400px]">
            <Line data={chartData} />
          </div>
        </div>

        {/* Calories Section */}
        <div className="text-center">
          <h3 className="bg-green-300 text-black px-4 py-2 rounded-lg font-semibold mb-4">Calories</h3>
          <div className="relative w-40 h-40">
            <svg className="transform rotate-[-90deg]" width="100%" height="100%" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" stroke="#d1fae5" strokeWidth="10" fill="none" />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#047857"
                strokeWidth="10"
                strokeDasharray={`${caloriePercent} ${100 - caloriePercent}`}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-green-900 text-2xl font-bold">
              {caloriePercent}%
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Progress;