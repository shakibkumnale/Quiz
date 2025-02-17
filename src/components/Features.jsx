import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Shield, Trophy, Users, Target, Clock } from 'lucide-react';

const features = [
  {
    icon: <Brain className="w-10 h-10 text-cyan-400" />,
    title: 'Adaptive Learning',
    description: 'Our intelligent system adjusts question difficulty based on your performance, ensuring optimal learning and skill development at your own pace.'
  },
  {
    icon: <Target className="w-10 h-10 text-cyan-400" />,
    title: 'Industry-Aligned Content',
    description: 'Questions are regularly updated to match current tech industry standards and best practices, helping you prepare for real-world programming challenges.'
  },
  {
    icon: <Users className="w-10 h-10 text-cyan-400" />,
    title: 'Active Community',
    description: 'Compare scores, discuss solutions, and learn from peers in our growing community of over 10,000 developers. Get detailed explanations for every answer.'
  },
  {
    icon: <Trophy className="w-10 h-10 text-cyan-400" />,
    title: 'Skill Assessment',
    description: 'Track your progress with detailed performance analytics. Identify strengths and areas for improvement across different programming concepts.'
  },
  {
    icon: <Shield className="w-10 h-10 text-cyan-400" />,
    title: 'Verified Content',
    description: 'Each question undergoes rigorous review by senior developers and tech leads from top companies to ensure accuracy and relevance.'
  },
  {
    icon: <Clock className="w-10 h-10 text-cyan-400" />,
    title: 'Timed Challenges',
    description: 'Practice under exam-like conditions with our timed quizzes. Improve your problem-solving speed and prepare for technical interviews.'
  }
];

const FeaturesSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Why Choose QuizMaster?</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Level up your programming skills with our comprehensive learning platform designed for both beginners and experienced developers.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="p-6 bg-gray-800 rounded-lg hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;