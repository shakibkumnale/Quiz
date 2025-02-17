import React from 'react';
import { motion } from 'framer-motion';
import { Book, Clock, Award, ArrowRight,Lock,LockIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const TopicCard = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const topics = [
    {
      title: "Python",
      description: "Master Python programming with questions covering basics to advanced concepts like OOP, Django, and data science.",
      imageUrl: "/img/Python.png",
      questionCount: 8,
      timeLimit: "60 min",
      difficulty: "Beginner to Advanced",
      topScore: 98,
      url:'/quiz/Python'
    },
    {
      title: "HTML",
      description: "Test your HTML knowledge with questions on tags, attributes, and best practices for web development.",
      imageUrl: "/img/HTML.png",
      questionCount: 8,
      timeLimit: "45 min",
      difficulty: "Intermediate",
      topScore: 95,
      url:'/quiz/HTML',
    },
    {
      title: "Java",
      description: "Comprehensive Java questions covering core concepts, Spring framework, and enterprise development.",
      imageUrl: "/img/Java.png",
      questionCount: 8,
      timeLimit: "50 min",
      difficulty: "Advanced",
      topScore: 92,
      url:'/quiz/Java'
    },
    {
      title: "C",
      description: "Challenge yourself with C problems focusing on memory management, STL, and object-oriented programming.",
      imageUrl: "/img/c.jpeg",
      questionCount: 8,
      timeLimit: "55 min",
      difficulty: "Intermediate",
      topScore: 89,
      url:'/quiz/C'
    },
    {
      title: "MERN Stack",
      description: "Master MERNG stack with questions covering MongoDB, Express, React, and Node.js, ",
      imageUrl: "/img/MERN.png",
      questionCount: 8,
      timeLimit: "55 min",
      difficulty: "Intermediate",
      topScore: 75,
      url:'/quiz/MERN'

    },
    {
      title: "Logics",
      description: "check logic skills with questions on algorithms, data structures, and problem-solving.",
      imageUrl: "/img/Logics.png",
      questionCount: 8,
      timeLimit: "55 min",
      difficulty: "Intermediate",
      topScore: 66,
      url:'/quiz/Programming-Logic'
    },
    {
      title: "React-Native",
      description: "Test your React Native knowledge with questions on components, navigation, and state management.",
      imageUrl: "/img/React-Native.png",
      questionCount: 8,
      timeLimit: "55 min",
      difficulty: "Intermediate",
      topScore: 89,
      url:'/quiz/React-Native'
    },{
      title: "JavaScript",
      description: "Test your JavaScript knowledge with questions on array, events, and loops, variable.",
      imageUrl: "/img/js.png",
      questionCount: 8,
      timeLimit: "55 min",
      difficulty: "Intermediate",
      topScore: 89,
      url:'/quiz/JavaScript'
    }
  ];

  return (
    <div className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4">Programming Quizzes</h2>
        <p className="text-gray-400 text-center mb-12">Test your programming skills across different languages and frameworks</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl overflow-hidden group hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300"
            >
              {/* Image Container with Glow Effect */}
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent z-10" />
                <img 
                  src={topic.imageUrl} 
                  alt={topic.title}
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-cyan-500 text-white px-3 py-1 rounded-full text-sm z-20">
                  {topic.difficulty}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-2">
                  {topic.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center text-gray-400">
                    <Book className="w-4 h-4 mr-2 text-cyan-400" />
                    <span className="text-sm">{topic.questionCount} Q</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Clock className="w-4 h-4 mr-2 text-cyan-400" />
                    <span className="text-sm">{topic.timeLimit}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Award className="w-4 h-4 mr-2 text-cyan-400" />
                    <span className="text-sm">{topic.topScore}%</span>
                  </div>
                </div>

                {/* Start Quiz Button */}
                {isAuthenticated && <Link to={topic.url} className="w-full bg-gray-700 hover:bg-cyan-500 text-white py-3 px-4 rounded-lg flex items-center justify-center group/button transition-all duration-300">
                  <span>Start Quiz</span>
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover/button:translate-x-1 transition-transform" />
                </Link>}
                {!isAuthenticated && <Link to='/login' className="w-full bg-gray-700  text-white py-3 px-4 rounded-lg flex items-center justify-center group/button transition-all duration-300">
                  <span>Unlock</span>
                  <LockIcon className="w-4 h-4 ml-2 transform group-hover/button:rotate-15 group-hover/button:scale-110 transition-transform" />
                </Link>}
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Topics Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors">
            View All Topics
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;