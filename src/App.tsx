import React, { useState } from 'react';
import { FileText, Upload, User, Key, BarChart } from 'lucide-react';
import Header from './components/Header';
import AssignmentSubmission from './components/AssignmentSubmission';
import AIFeedback from './components/AIFeedback';
import UserProfile from './components/UserProfile';
import ProgressTracker from './components/ProgressTracker';

function App() {
  const [currentView, setCurrentView] = useState('submit');

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex mb-8">
          <button
            className={`flex items-center px-4 py-2 mr-2 ${
              currentView === 'submit' ? 'bg-blue-500 text-white' : 'bg-white'
            }`}
            onClick={() => setCurrentView('submit')}
          >
            <Upload className="mr-2" size={20} />
            Submit Assignment
          </button>
          <button
            className={`flex items-center px-4 py-2 mr-2 ${
              currentView === 'feedback' ? 'bg-blue-500 text-white' : 'bg-white'
            }`}
            onClick={() => setCurrentView('feedback')}
          >
            <FileText className="mr-2" size={20} />
            AI Feedback
          </button>
          <button
            className={`flex items-center px-4 py-2 mr-2 ${
              currentView === 'profile' ? 'bg-blue-500 text-white' : 'bg-white'
            }`}
            onClick={() => setCurrentView('profile')}
          >
            <User className="mr-2" size={20} />
            Profile
          </button>
          <button
            className={`flex items-center px-4 py-2 ${
              currentView === 'progress' ? 'bg-blue-500 text-white' : 'bg-white'
            }`}
            onClick={() => setCurrentView('progress')}
          >
            <BarChart className="mr-2" size={20} />
            Progress
          </button>
        </div>

        {currentView === 'submit' && <AssignmentSubmission />}
        {currentView === 'feedback' && <AIFeedback />}
        {currentView === 'profile' && <UserProfile />}
        {currentView === 'progress' && <ProgressTracker />}
      </div>
    </div>
  );
}

export default App;