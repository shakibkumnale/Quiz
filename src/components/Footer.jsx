import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Facebook, Mail, Heart,Chrome,Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">QuizMaster</h3>
            <p className="text-gray-400 mb-4">Empowering knowledge through interactive learning experiences.</p>
            <div className="flex space-x-4">
              <a href="https://github.com/shakibkumnale" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="https://shakibkumnale.ipolitycal.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Chrome size={20} />
              </a>
              <a href="https://www.youtube.com/@shakibkumnali" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><Link to="/topics" className="text-gray-400 hover:text-cyan-400 transition-colors">Topics</Link></li>
              <li><Link to="/leaderboard" className="text-gray-400 hover:text-cyan-400 transition-colors">Leaderboard</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-cyan-400 transition-colors">About Us</Link></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-gray-400 hover:text-cyan-400 transition-colors">FAQ</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates.</p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
              <button
                type="submit"
                className="w-full px-3 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} QuizMaster. All rights reserved.
          </p>
          <div className="flex items-center text-gray-400 text-sm">
            <span>Made with</span>
            <Heart size={14} className="mx-1 text-red-500" />
            <span>by Shakib Kumnale </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
