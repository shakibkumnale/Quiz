import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import QuizApp from './QuizApp';
import AlertProvider from './components/Alert';

import Login from './components/Login';
import Register from './components/Register'; 
import QuizSelection from './components/QuizSelection';
import QuizInterface from './components/QuizInterface';
import Profile from './components/Profile';
import { fetchUser } from './api';
import { setAuthState } from './slices/authSlice';
import NotFound from './components/404';
import Leaderboard from './components/leaderboard';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetchUser();
        if (response.data.success) {
          dispatch(setAuthState({ 
            isAuthenticated: true, 
            user: response.data.data 
          }));
        } else {
          dispatch(setAuthState({ 
            isAuthenticated: false,
            user: null 
          }));
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        dispatch(setAuthState({ 
          isAuthenticated: false,
          user: null 
        }));
      }
    };

    const authState = localStorage.getItem('authState');
    if (authState) {
      fetchUserData();
    }
  }, [dispatch]);

  return (
    <AlertProvider>
      <Routes>
        <Route path="/" element={<QuizApp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quiz-selection" element={<QuizSelection />} />
        <Route path="/quiz/:topic" element={<QuizInterface />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AlertProvider>
  );
};

export default App;