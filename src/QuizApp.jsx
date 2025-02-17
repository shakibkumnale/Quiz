import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { User, LogIn, Menu, ChevronDown, Star, Shield, Globe,LockIcon,UserPen } from 'lucide-react';
import { logout, fetchUser } from './api';
import { logout as logoutAction, setAuthState } from './slices/authSlice';
import CounterAnimation from './components/CounterAnimation';
import TopicCard from './components/TopicCard';
import TechShowcase from './components/TechShowcase';
import Footer from './components/Footer';
// import AnchorLink from "react-anchor-link-smooth-scroll";

const features = [
  {
    icon: <Star className="w-10 h-10 text-cyan-400" />,
    title: 'High Quality Questions',
    description: 'Our quizzes are crafted by experts to ensure high quality and relevance.'
  },
  {
    icon: <Shield className="w-10 h-10 text-cyan-400" />,
    title: 'Secure and Private',
    description: 'Your data is secure with us. We prioritize your privacy and security.'
  },
  {
    icon: <Globe className="w-10 h-10 text-cyan-400" />,
    title: 'Global Reach',
    description: 'Join a community of learners from around the world and expand your knowledge.'
  }
];

const QuizApp = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetchUser();
  //       if (response.data.success) {
  //         dispatch(setAuthState({ isAuthenticated: true, user: response.data.data }));
  //       } else {
  //         dispatch(setAuthState({ isAuthenticated: false }));
  //       }
  //     } catch (error) {
  //       dispatch(setAuthState({ isAuthenticated: false }));
  //     }
  //   };

  //   fetchUserData();
  // }, [dispatch]);

  const handleLogout = () => {
    logout();
    dispatch(logoutAction());
    // navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-cyan-400">QuizMaster</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <Link to='/' className="px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">Home</Link>
                <a href='#topics' className="px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">Topics</a>
                <Link to='/leaderboard' className="px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">Leaderboard</Link>
                {isAuthenticated ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                      className="flex items-center space-x-2 px-4 py-2 bg-cyan-500 rounded-md hover:bg-cyan-600 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>{user.Fname}</span>
                    </button>
                    {isProfileMenuOpen && (
                      <div className="absolute z-50 right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1">
                        <Link to="/profile" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">Profile</Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to='/login' className="flex items-center space-x-2 px-4 py-2 bg-cyan-500 rounded-md hover:bg-cyan-600 transition-colors">
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-gray-800"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 w-full text-left">Home</button>
              <button className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 w-full text-left">Topics</button>
              <button className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 w-full text-left">Leaderboard</button>
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => navigate('/profile')}
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 w-full text-left"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block px-3 py-2 rounded-md text-base font-medium bg-cyan-500 hover:bg-cyan-600 w-full text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="block px-3 py-2 rounded-md text-base font-medium bg-cyan-500 hover:bg-cyan-600 w-full text-left"
                >
                  Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="relative flex justify-center items-center overflow-hidden bg-[url('/img/bg_5.jpg')] bg-opacity-0 bg-cover bg-center bg-no-repeat h-[calc(100vh-4rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Master Your Knowledge with 
              <span className="text-cyan-400"> Interactive Quizzes</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Challenge yourself with our extensive collection of MCQs across various topics
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
            {isAuthenticated ? ( <><Link to='/quiz-selection' className="px-8 py-3 bg-cyan-500 rounded-md hover:bg-cyan-600 transition-colors font-medium">
                Get Started
              </Link>
              <Link to='/profile' className="px-8 py-3 border border-cyan-500 rounded-md hover:bg-gray-800 transition-colors font-medium flex items-center ">
                Edit Topics <UserPen className="w-6 h-6 m2 ml-3 transform group-hover/button:rotate-15 group-hover/button:scale-110 transition-transform" />
              </Link></>):(<><Link to='/register' className="px-8 py-3 bg-cyan-500 rounded-md hover:bg-cyan-600 transition-colors font-medium ">
                Get Started
              </Link><a href='#topics' className="px-8 py-3 border border-cyan-500 rounded-md hover:bg-gray-800 transition-colors font-medium">
            View Topics
          </a> </>)}
              
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="p-6 bg-gray-800 rounded-lg"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Counter Animation */}
      <CounterAnimation />

      {/* Topic Cards */}
      <div id='topics'>

      <TopicCard />
      </div>

      {/* Tech Showcase */}


      {/* Footer */}
      <Footer/>
      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-cyan-400"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </div>
  );
};

export default QuizApp;