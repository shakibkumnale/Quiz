import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';

const Leaderboard = () => {
  const [email, setEmail] = useState('');
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  
  // Set launch date (example: 3 months from now)
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 10);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();
      
      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);
      
      setDays(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);
      
      if (difference <= 0) {
        clearInterval(interval);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    alert(`Thank you for subscribing with: ${email}`);
    setEmail('');
  };
  
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Navigation Link */}
      <div className="p-6">
        <Link to="/" className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          <span>Back to Home</span>
        </Link>
      </div>
      
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-4xl w-full text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Coming <span className="text-cyan-400">Soon</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            We're working hard to bring you an amazing new experience. 
            Stay tuned for the launch of our new feature.
          </p>
          
          {/* Countdown Timer */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-1">{days}</div>
              <div className="text-gray-400">Days</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-1">{hours}</div>
              <div className="text-gray-400">Hours</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-1">{minutes}</div>
              <div className="text-gray-400">Minutes</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-1">{seconds}</div>
              <div className="text-gray-400">Seconds</div>
            </div>
          </div>
          
          {/* Notification Form */}
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-white mb-4">Get notified when we launch</h3>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-grow">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors"
              >
                Notify Me
              </button>
            </form>
            <p className="text-sm text-gray-500 mt-2">
              We'll never share your email with anyone else.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;