import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { openai } from '../lib/openai';

const AssignmentSubmission: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) return;

    setUploading(true);
    try {
      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('assignments')
        .upload(`${Date.now()}_${file.name}`, file);

      if (error) throw error;

      // Get the public URL of the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('assignments')
        .getPublicUrl(data.path);

      // Generate AI feedback
      const feedback = await generateAIFeedback(publicUrl);

      // Save assignment and feedback to Supabase database
      const { data: assignment, error: dbError } = await supabase
        .from('assignments')
        .insert({ file_url: publicUrl, feedback })
        .select();

      if (dbError) throw dbError;

      console.log('Assignment submitted successfully:', assignment);
      // TODO: Update UI to show success message and/or redirect to feedback page
    } catch (error) {
      console.error('Error submitting assignment:', error);
      // TODO: Show error message to user
    } finally {
      setUploading(false);
    }
  };

  const generateAIFeedback = async (fileUrl: string): Promise<string> => {
    // TODO: Implement actual OpenAI API call to generate feedback
    // For now, we'll return a mock response
    return "This is a mock AI feedback response. In a real implementation, we would analyze the document and provide detailed feedback.";
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Submit Your Assignment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assignment">
            Upload Assignment (PDF or DOCX)
          </label>
          <input
            type="file"
            id="assignment"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="assignment"
            className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600"
          >
            <Upload className="mr-2" size={20} />
            {file ? file.name : 'Choose file'}
          </label>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-400"
          disabled={!file || uploading}
        >
          {uploading ? 'Submitting...' : 'Submit for AI Critique'}
        </button>
      </form>
    </div>
  );
};

export default AssignmentSubmission;