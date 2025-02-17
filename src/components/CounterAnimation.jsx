import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CounterAnimation = () => {
  const [counts, setCounts] = useState({
    questions: 0,
    topics: 0,
    sets: 0
  });

  useEffect(() => {
    const duration = 2000; // 2 seconds animation
    const steps = 50;
    const interval = duration / steps;
    
    const timer = setInterval(() => {
      setCounts(prev => ({
        questions: prev.questions < 14000000 ? prev.questions + 280000 : 14000000,
        topics: prev.topics < 64 ? prev.topics + 1 : 64,
        sets: prev.sets < 8 ? prev.sets + 1 : 8
      }));
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-lg hover:bg-gray-700 transition-all duration-300"
          >
            <div className="text-4xl font-bold text-cyan-400 mb-2">
              {Math.floor(counts.questions).toLocaleString()}+
            </div>
            <div className="text-gray-300">Unique Sets</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 rounded-lg hover:bg-gray-700 transition-all duration-300"
          >
            <div className="text-4xl font-bold text-cyan-400 mb-2">
              {counts.topics}+
            </div>
            <div className="text-gray-300">Questions</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-6 rounded-lg hover:bg-gray-700 transition-all duration-300"
          >
            <div className="text-4xl font-bold text-cyan-400 mb-2">
              {counts.sets}+
            </div>
            <div className="text-gray-300">Topics</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CounterAnimation;