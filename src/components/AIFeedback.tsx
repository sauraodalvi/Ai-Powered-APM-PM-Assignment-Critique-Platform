import React, { useEffect, useState } from 'react';
import { ThumbsUp, ThumbsDown, BookOpen } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Feedback {
  strengths: string[];
  improvements: string[];
  resources: { title: string; url: string }[];
}

const AIFeedback: React.FC = () => {
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  useEffect(() => {
    fetchLatestFeedback();
  }, []);

  const fetchLatestFeedback = async () => {
    try {
      const { data, error } = await supabase
        .from('assignments')
        .select('feedback')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;

      if (data) {
        // Assuming the feedback is stored as a JSON string
        setFeedback(JSON.parse(data.feedback));
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
      // TODO: Show error message to user
    }
  };

  if (!feedback) {
    return <div>Loading feedback...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">AI Feedback</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <ThumbsUp className="mr-2 text-green-500" size={24} />
          Strengths
        </h3>
        <ul className="list-disc pl-6">
          {feedback.strengths.map((strength, index) => (
            <li key={index} className="mb-1">
              {strength}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <ThumbsDown className="mr-2 text-red-500" size={24} />
          Areas for Improvement
        </h3>
        <ul className="list-disc pl-6">
          {feedback.improvements.map((improvement, index) => (
            <li key={index} className="mb-1">
              {improvement}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <BookOpen className="mr-2 text-blue-500" size={24} />
          Recommended Resources
        </h3>
        <ul className="list-disc pl-6">
          {feedback.resources.map((resource, index) => (
            <li key={index} className="mb-1">
              <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {resource.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AIFeedback;