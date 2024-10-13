import React, { useState, useEffect } from 'react';
import { Key, Save } from 'lucide-react';
import { supabase } from '../lib/supabase';

const UserProfile: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchApiKey();
  }, []);

  const fetchApiKey = async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('api_key')
        .single();

      if (error) throw error;

      if (data && data.api_key) {
        setApiKey(data.api_key);
      }
    } catch (error) {
      console.error('Error fetching API key:', error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({ api_key: apiKey }, { onConflict: 'user_id' });

      if (error) throw error;

      console.log('API Key saved successfully');
      // TODO: Show success message to user
    } catch (error) {
      console.error('Error saving API key:', error);
      // TODO: Show error message to user
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apiKey">
            ChatGPT API Key
          </label>
          <div className="flex">
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your ChatGPT API Key"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r flex items-center disabled:bg-gray-400"
              disabled={saving}
            >
              <Save className="mr-2" size={20} />
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </form>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">API Key Instructions</h3>
        <ol className="list-decimal pl-6">
          <li>Go to the OpenAI website and sign in to your account.</li>
          <li>Navigate to the API section and create a new API key.</li>
          <li>Copy the API key and paste it into the field above.</li>
          <li>Click "Save" to securely store your API key.</li>
        </ol>
        <p className="mt-2 text-sm text-gray-600">
          Your API key is used to generate AI feedback for your assignments. It's stored securely and never shared.
        </p>
      </div>
    </div>
  );
};

export default UserProfile;