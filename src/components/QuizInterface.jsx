import React, { useState, useEffect } from 'react';
import { getQuestions, submitScore } from '../api';
import { Link } from 'react-router-dom';
import { FaHome, FaRedo, FaCheck, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import withAuth from '../withAuth';

const QuizInterface = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizData, setQuizData] = useState({
    title: '',
    questions: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [showAnimation, setShowAnimation] = useState(false);
  // const location = useLocation();
  const params = useParams();

  console.log(params);

  const fetchQuizData = async () => {
    try {
      setLoading(true);
      
      console.log(params.topic)
      const response = await getQuestions(params.topic); // Replace with dynamic topic
      if (response.data && response.data.success) {
        const questions = response.data.data;
        setQuizData({
          title: questions[0]?.topicName || 'Quiz',
          questions: questions.map(q => ({
            id: q._id,
            question: q.question,
            options: q.options,
            questionNo: q.questionNo
          }))
        });
      } else {
        throw new Error('Failed to fetch questions');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  const handleAnswerSelect = (optionKey) => {
    setSelectedAnswer(optionKey);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      // Save the selected answer
      const newUserAnswers = [...userAnswers];
      newUserAnswers[currentQuestion] = {
        _id: quizData.questions[currentQuestion].id,
        userans: selectedAnswer
      };
      setUserAnswers(newUserAnswers);
      
      // Move to next question or submit if last question
      if (currentQuestion < quizData.questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(''); // Reset selected answer for the next question
      } else {
        handleSubmitQuiz(newUserAnswers);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      // Restore previous answer if it exists
      setSelectedAnswer(userAnswers[currentQuestion - 1]?.userans || '');
    }
  };

  const handleSubmitQuiz = async (finalAnswers) => {
    try {
      // Filter out any undefined answers
      const validAnswers = finalAnswers.filter(answer => answer && answer._id);
      
      const response = await submitScore({ userAnswer: validAnswers });
      if (response.data.message === 'Score calculated successfully') {
        setQuizSubmitted(true);
        setScore(response.data.data.score);
        setCorrectAnswers(response.data.data.data);
        setTimeout(() => {
          setShowAnimation(true);
        }, 300);
      } else {
        setError('Failed to submit quiz');
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setError('Error submitting quiz: ' + error.message);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setUserAnswers([]);
    setQuizSubmitted(false);
    setScore(0);
    setCorrectAnswers([]);
    setShowAnimation(false);
  };

  const getBorderColor = (correctAnswer, userAnswer, optionKey) => {
    if (!quizSubmitted) return '';
    
    if (userAnswer === optionKey) {
      return correctAnswer === optionKey 
        ? 'bg-green-500 text-white border-green-600 shadow-lg shadow-green-500/30' 
        : 'bg-red-500 text-white border-red-600 shadow-lg shadow-red-500/30';
    }
    if (correctAnswer === optionKey) {
      return 'bg-green-200 border-green-500 text-green-800';
    }
    return '';
  };

  // Calculate percentage for circular progress
  const calculatePercentage = () => {
    if (quizData.questions.length === 0) return 0;
    return (score / quizData.questions.length) * 100;
  };

  // Calculate stroke dash array for circular progress
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (calculatePercentage() / 100) * circumference;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-red-900/30 text-red-200 p-6 rounded-lg max-w-md w-full">
          <h3 className="text-xl font-bold mb-2">Error</h3>
          <p>{error}</p>
          <button 
            onClick={fetchQuizData}
            className="mt-4 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6 md:p-8">
       <Link to="/" className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          <span>Back </span>
        </Link>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-xl shadow-2xl shadow-cyan-500/10 overflow-hidden">
          {quizSubmitted ? (
            <div className="text-white">
              <div className="relative bg-gray-900 p-6 sm:p-8">
                <Link to="/" className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors">
                  <FaHome size={24} />
                </Link>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-8">
                  {/* Circular Score Meter */}
                  <div className={`relative w-48 h-48 ${showAnimation ? 'animate-scale-in' : 'scale-0'} transition-transform duration-700`}>
                    <svg className="w-full h-full" viewBox="0 0 200 200">
                      {/* Background circle */}
                      <circle 
                        cx="100" 
                        cy="100" 
                        r={radius} 
                        fill="transparent"
                        stroke="#1f2937"
                        strokeWidth="15"
                      />
                      {/* Progress circle */}
                      <circle 
                        cx="100" 
                        cy="100" 
                        r={radius} 
                        fill="transparent"
                        stroke={score / quizData.questions.length > 0.6 ? '#22c55e' : score / quizData.questions.length > 0.3 ? '#f59e0b' : '#ef4444'}
                        strokeWidth="15"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        style={{
                          transition: 'stroke-dashoffset 1.5s ease-in-out',
                          transform: 'rotate(-90deg)',
                          transformOrigin: '50% 50%'
                        }}
                      />
                      {/* Score text */}
                      <text 
                        x="100" 
                        y="105" 
                        textAnchor="middle" 
                        dominantBaseline="middle"
                        className="text-3xl font-bold fill-white"
                      >
                        {score}/{quizData.questions.length}
                      </text>
                      <text 
                        x="100" 
                        y="135" 
                        textAnchor="middle" 
                        dominantBaseline="middle"
                        className="text-sm fill-gray-300"
                      >
                        {calculatePercentage().toFixed(0)}%
                      </text>
                    </svg>
                  </div>
                  
                  <div className="text-center sm:text-left">
                    <h2 className="text-3xl font-bold text-cyan-400 mb-2">Quiz Completed!</h2>
                    <p className="text-gray-300 mb-6">Thanks for completing the {quizData.title} quiz.</p>
                    <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                      <button
                        onClick={resetQuiz}
                        className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md transition-colors"
                      >
                        <FaRedo /> Take Again
                      </button>
                      <Link to="/" className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors">
                        <FaHome /> Home
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-4 sm:px-8 py-6">
                <h3 className="text-xl font-semibold mb-4 text-cyan-300">Review Your Answers</h3>
                
                <div className="space-y-6">
                  {correctAnswers.map((answer, index) => {
                    const userAns = userAnswers.find(a => a._id === answer._id)?.userans;
                    const isCorrect = userAns === answer.correctAnswer;
                    
                    return (
                      <div 
                        key={answer._id} 
                        className="border border-gray-700 rounded-lg p-4 sm:p-6 transition-all hover:border-gray-600"
                      >
                        <div className="flex items-start mb-3 gap-3">
                          <span className={`flex-shrink-0 p-1 sm:p-1.5 rounded-full mt-0.5 ${isCorrect ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            {isCorrect ? <FaCheck size={16} /> : <FaTimes size={16} />}
                          </span>
                          <h4 className="text-lg font-medium text-white">{answer.question}</h4>
                        </div>
                        
                        <div className="ml-8 sm:ml-10 space-y-2 sm:space-y-3">
                          {Object.entries(answer.options).map(([key, value]) => (
                            <div 
                              key={key}
                              className={`p-3 rounded-md border transition-all ${getBorderColor(answer.correctAnswer, userAns, key)}`}
                            >
                              {value}
                              {key === answer.correctAnswer && userAns !== key && 
                                <span className="ml-2 text-green-400 text-sm">(Correct Answer)</span>
                              }
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-gray-900 p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {quizData.title}
                  <span className="ml-2 px-2 py-1 bg-cyan-900/50 text-cyan-300 text-sm rounded-md">
                    Quiz
                  </span>
                </h2>
                <div className="flex items-center gap-2 text-white/80">
                  <span className="text-gray-400 text-sm sm:text-base">Question</span>
                  <span className="text-lg sm:text-xl font-medium text-cyan-400">{currentQuestion + 1}</span>
                  <span className="text-gray-400">/</span>
                  <span className="text-gray-400">{quizData.questions.length}</span>
                </div>
              </div>
              
              <div className="p-4 sm:p-6">
                <div className="mb-8">
                  <h3 className="text-lg sm:text-xl text-white mb-6 leading-relaxed">
                    {quizData.questions[currentQuestion]?.question}
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    {quizData.questions[currentQuestion] && 
                      Object.entries(quizData.questions[currentQuestion].options).map(([key, value]) => (
                        <button
                          key={key}
                          onClick={() => handleAnswerSelect(key)}
                          className={`w-full p-3 sm:p-4 rounded-md text-left transition-all ${
                            selectedAnswer === key
                              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/20 border-cyan-500'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600/80 border-gray-600'
                          } border`}
                        >
                          {value}
                        </button>
                      ))}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    disabled={currentQuestion === 0}
                    onClick={handlePrevious}
                    className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <FaChevronLeft />
                    <span className="hidden sm:inline">Previous</span>
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!selectedAnswer}
                    className={`px-4 py-2 sm:px-6 sm:py-3 flex items-center gap-2 ${
                      !selectedAnswer ? 'bg-gray-600 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-500'
                    } text-white rounded-md transition-colors`}
                  >
                    <span>
                      {currentQuestion === quizData.questions.length - 1 ? 'Submit' : 'Next'}
                    </span>
                    {currentQuestion !== quizData.questions.length - 1 && <FaChevronRight />}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default withAuth(QuizInterface)