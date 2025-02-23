import React, { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { login } from '../api';
import { loginSuccess } from '../slices/authSlice';
import { showAlert } from '../slices/alertSlice'
import { useAlert } from './Alert';
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const { showAlert } = useAlert(); 
  const location = useLocation();
  const message = location.state?.message;

  const handleLogin = async (credentials) => {
    try {
      setLoading(true);
      const response = await login(credentials);
      console.log(response)
      if (response.data.success) {
        dispatch(loginSuccess(response.data.data));
      showAlert('login Successfully', 'success');

        navigate('/');
      } else {
        // dispatch(showAlert({ message: response.data.message, type: 'error' }));
        console.log(response)
      showAlert(response.data.message, 'error');

      }
    } catch (error) {
      // dispatch(showAlert({ message: 'Login failed', type: 'error' }));
      console.log(error.response.data.message)
      // console.log(response)
      showAlert(error.response.data.message, 'error');
    }
    finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin({ Email: email, userPassword: password });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <Link to="/" className="fixed  top-3  left-3 items-center text-cyan-400 hover:text-cyan-300 transition-colors">
               {/* <ArrowLeft size={20} className="mr-2" /> */}
               <span>Back </span>
             </Link>
             <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-gray-800 rounded-lg p-8"
      >
        {message && (
          <div className="mb-4 p-3 bg-blue-900 text-white rounded">
            {message}
          </div>
        )}
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Welcome Back</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <div className="relative">
              <input
                type="email"
                className="w-full bg-gray-700 text-white rounded-md px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full bg-gray-700 text-white rounded-md px-4 py-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
            <div className="flex items-center justify-between">
                      <Link to="/register" className="text-cyan-500 hover:text-cyan-400 transition-colors text-sm">
                      Don't have an account?
                      </Link>
                    </div>      
          <button
            type="submit"
            className="w-full bg-cyan-500 text-white rounded-md py-3 items-center flex justify-center font-medium hover:bg-cyan-600 transition-colors"
          >
            {loading ? <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full"></div>: "Sign In"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;