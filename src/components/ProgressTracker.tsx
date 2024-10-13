import React from 'react';
import { BarChart2, TrendingUp, Award } from 'lucide-react';

const ProgressTracker: React.FC = () => {
  // TODO: Fetch actual progress data from the backend
  const mockProgress = {
    assignmentsSubmitted: 5,
    averageRating: 7.8,
    improvementRate: 15,
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Progress Tracker</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <BarChart2 className="mr-2 text-blue-500" size={24} />
            <h3 className="text-lg font-semibold">Assignments Submitted</h3>
          </div>
          <p className="text-3xl font-bold text-blue-700">{mockProgress.assignmentsSubmitted}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Award className="mr-2 text-green-500" size={24} />
            <h3 className="text-lg font-semibold">Average AI Rating</h3>
          </div>
          <p className="text-3xl font-bold text-green-700">{mockProgress.averageRating.toFixed(1)}/10</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <TrendingUp className="mr-2 text-purple-500" size={24} />
            <h3 className="text-lg font-semibold">Improvement Rate</h3>
          </div>
          <p className="text-3xl font-bold text-purple-700">{mockProgress.improvementRate}%</p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Recent Improvements</h3>
        <ul className="list-disc pl-6">
          <li>Better problem statement clarity (+20%)</li>
          <li>Improved user story structure (+15%)</li>
          <li>More comprehensive competitive analysis (+25%)</li>
        </ul>
      </div>
    </div>
  );
};

export default ProgressTracker;