import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-cyan-400 text-9xl font-bold mb-4">404</h1>
        <h2 className="text-white text-2xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors"
          >
            <Home size={18} />
            <span>Back to Home</span>
          </Link>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 border border-cyan-500 text-cyan-400 rounded-md hover:bg-gray-800 transition-colors"
          >
            <Search size={18} />
            <span>Browse Topics</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;