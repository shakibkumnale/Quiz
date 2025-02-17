import React from 'react';
import { motion } from 'framer-motion';

const technologies = [
  'MERN', 'React', 'Tailwind', 'Postman', 'Vite', 'Vercel'
];

const TechShowcase = () => {
  return (
    <div className="overflow-x-auto py-8">
      <div className="flex space-x-8">
        {technologies.map((tech, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-gray-800 rounded-lg p-4 text-center text-white"
          >
            {tech}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TechShowcase;