import React, { useState, useEffect } from 'react';
import { fetchUser, selectTopic } from '../api';
import { useAlert } from './Alert';
import withAuth from '../withAuth';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft } from 'lucide-react';
const topicsList = ["HTML", "Python", "Java", "MERN", "C Programming", "React Native", "Programming Logic", "JavaScript"];

const Profile = () => {
  const [userStats, setUserStats] = useState({
    totalQuizzes: 0,
    avgScore: 0,
    topPerformance: '',
    recentActivity: [],
    topics: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const { showAlert } = useAlert();
  const user = useSelector((state) => state.auth.user);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // const response = await fetchUser();
        setUserStats({
          ...user,
          recentActivity: user.recentActivity || [],
          topics: user.Topics || []
        });
        setSelectedTopics(user.Topics || []);
      } catch (error) {
        console.error(error);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTopicChange = (topic) => {
    setSelectedTopics((prevTopics) =>
      prevTopics.includes(topic)
        ? prevTopics.filter((t) => t !== topic)
        : [...prevTopics, topic]
    );
  };

  const handleSubmit = async () => {
    try {
      const response = await selectTopic({ topics: selectedTopics });
      if (response.data.success) {
        showAlert(response.data.message, 'success');
        setUserStats((prevStats) => ({
          ...prevStats,
          topics: selectedTopics
        }));
        setIsModalOpen(false);
      } else {
        showAlert(response.data.message, 'error');
      }
    } catch (error) {
      showAlert('Failed to update topics', 'error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="animate-pulse text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-red-500 bg-red-100 p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-4 sm:p-6 lg:p-8">
      
        <Link to="/" className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          <span>Back </span>
        </Link>
    
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur rounded-xl p-6">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <div className="text-white text-4xl">
                  {userStats.Fname?.[0] || 'U'}
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-gray-800" />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-3xl font-bold text-white mb-2">{userStats.Fname} {userStats.Lname}</h2>
              <p className="text-gray-400">{userStats.Email}</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-700/50 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <div className="w-6 h-6 text-blue-400">📚</div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Quizzes</p>
                  <p className="text-2xl font-bold text-white">{userStats.totalQuizzes}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-700/50 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <div className="w-6 h-6 text-green-400">📊</div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Average Score</p>
                  <p className="text-2xl font-bold text-white">{userStats.avgScore}%</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-700/50 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <div className="w-6 h-6 text-purple-400">🏆</div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Top Performance</p>
                  <p className="text-2xl font-bold text-white">{userStats.topPerformance}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Topics Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <h3 className="text-xl font-bold text-white mb-2 sm:mb-0">Selected Topics</h3>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 text-white font-medium shadow-lg"
              >
                Edit Topics
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {userStats.topics.map((topic, index) => (
                <span 
                  key={index} 
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-md"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {userStats.recentActivity.length > 0 ? (
                userStats.recentActivity.map((activity, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-700/50 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                  >
                    <div>
                      <div className="text-white font-medium mb-1">{activity.topic}</div>
                      <div className="text-gray-400 text-sm">{activity.date}</div>
                    </div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                      {activity.score}%
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-400 text-center py-8 bg-gray-700/50 rounded-lg">
                  No recent activity
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
    <div 
      className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-8 max-w-2xl w-full shadow-2xl transform transition-all duration-300 scale-100 animate-slideUp"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Modal Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Choose Your Learning Path</h3>
          <p className="text-gray-400 text-sm">Select the topics you want to master</p>
        </div>
        <button
          onClick={() => setIsModalOpen(false)}
          className="h-8 w-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200"
        >
          ×
        </button>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {topicsList.map((topic) => (
          <div 
            key={topic} 
            onClick={() => handleTopicChange(topic)}
            className={`
              relative p-4 rounded-xl cursor-pointer transition-all duration-200
              ${selectedTopics.includes(topic) 
                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500'
                : 'bg-gray-700/50 hover:bg-gray-700 border-2 border-transparent'}
            `}
          >
            <div className="flex items-center gap-3">
              <div className={`
                w-5 h-5 rounded-md border-2 flex items-center justify-center
                transition-all duration-200
                ${selectedTopics.includes(topic)
                  ? 'border-cyan-500 bg-cyan-500'
                  : 'border-gray-500'}
              `}>
                {selectedTopics.includes(topic) && (
                  <span className="text-white text-sm">✓</span>
                )}
              </div>
              <label className="flex-1 cursor-pointer">
                <span className={`
                  font-medium transition-colors duration-200
                  ${selectedTopics.includes(topic) ? 'text-cyan-400' : 'text-white'}
                `}>
                  {topic}
                </span>
              </label>
            </div>
            
            {/* Topic Icons - You can customize these */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xl opacity-50">
              {topic === "HTML" && "🌐"}
              {topic === "Python" && "🐍"}
              {topic === "Java" && "☕"}
              {topic === "MERN" && "⚛️"}
              {topic === "C Programming" && "⚙️"}
              {topic === "React Native" && "📱"}
              {topic === "Programming Logic" && "🧠"}
              {topic === "JavaScript" && "💻"}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Count */}
      <div className="mb-6 text-center">
        <span className="text-gray-400">
          {selectedTopics.length} topic{selectedTopics.length !== 1 ? 's' : ''} selected
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <button
          onClick={() => setIsModalOpen(false)}
          className="px-6 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors duration-200 font-medium"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={selectedTopics.length === 0}
          className={`
            px-6 py-3 rounded-xl font-medium transition-all duration-200
            ${selectedTopics.length > 0
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/25'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'}
          `}
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};


export default withAuth(Profile);