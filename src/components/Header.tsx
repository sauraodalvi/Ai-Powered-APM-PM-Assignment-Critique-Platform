import React from 'react';
import { Brain } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex items-center">
        <Brain className="mr-2" size={32} />
        <h1 className="text-2xl font-bold">AI-Powered APM/PM Assignment Critique</h1>
      </div>
    </header>
  );
};

export default Header;