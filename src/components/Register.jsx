import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { register, sendOtp } from '../api';
import { useAlert } from './Alert'; // Import useAlert hook

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    Fname: '',
    Lname: '',
    Email: '',
    Password: '',
    CPassword: '',
    OTP: ''
  });
  const [otpRequested, setOtpRequested] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { showAlert } = useAlert(); // Use the alert hook

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.Password !== formData.CPassword) {
      showAlert('Passwords do not match', 'error');
      return;
    }
    try {
      setLoading(true);
      const response = await register(formData);
      if (response.data.success) {
        showAlert('User registered successfully', 'success');
        // Handle successful registration (e.g., redirect to login)
      } else {
        showAlert(response.data.message, 'error');
      }
    } catch (error) {
      console.error(error);
      showAlert(error.response.data.message, 'error');
    }
  };

  const handleRequestOtp = async () => {
    try {
      const response = await sendOtp({ Email: formData.Email });
      if (response.data.success) {
        showAlert('OTP sent successfully', 'success');
        setOtpRequested(true);
        setCountdown(30);
      } else {
        showAlert(response.data.message, 'error');
      }
    } catch (error) {
      console.error(error);
      showAlert(error.response.data.message, 'error');
    } finally {
      setLoading(false);  }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <Link to="/" className="fixed  top-3  left-3 items-center text-cyan-400 hover:text-cyan-300 transition-colors">
          {/* <ArrowLeft size={20} className="mr-2" /> */}
          <span>Back </span>
        </Link>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 shadow-2xl"
      >
        <h2 className="text-4xl font-bold text-white mb-8 text-center">Create Account</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">First Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="Fname"
                  className="w-full bg-gray-700/50 text-white rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  placeholder="First name"
                  value={formData.Fname}
                  onChange={handleChange}
                />
                <User className="w-5 h-5 text-cyan-500 absolute left-3 top-3.5" />
              </div>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Last Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="Lname"
                  className="w-full bg-gray-700/50 text-white rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  placeholder="Last name"
                  value={formData.Lname}
                  onChange={handleChange}
                />
                <User className="w-5 h-5 text-cyan-500 absolute left-3 top-3.5" />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <input
                type="email"
                name="Email"
                className="w-full bg-gray-700/50 text-white rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                placeholder="Enter your email"
                value={formData.Email}
                onChange={handleChange}
              />
              <Mail className="w-5 h-5 text-cyan-500 absolute left-3 top-3.5" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="Password"
                  className="w-full bg-gray-700/50 text-white rounded-lg px-4 py-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  placeholder="Create a password"
                  value={formData.Password}
                  onChange={handleChange}
                />
                <Lock className="w-5 h-5 text-cyan-500 absolute left-3 top-3.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-cyan-500 hover:text-cyan-400 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="CPassword"
                  className="w-full bg-gray-700/50 text-white rounded-lg px-4 py-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  placeholder="Confirm your password"
                  value={formData.CPassword}
                  onChange={handleChange}
                />
                <Lock className="w-5 h-5 text-cyan-500 absolute left-3 top-3.5" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">OTP</label>
            <div className="relative">
              <input
                type="text"
                name="OTP"
                className="w-full bg-gray-700/50 text-white rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                placeholder="Enter OTP"
                value={formData.OTP}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={handleRequestOtp}
                disabled={countdown > 0}
                className="absolute right-3 top-2 bg-cyan-500 text-white rounded-lg px-4 py-2 hover:bg-cyan-600 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed text-sm"
              >
                {countdown > 0 ? `Resend OTP (${countdown}s)` : 'Get OTP'}
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Link to="/login" className="text-cyan-500 hover:text-cyan-400 transition-colors text-sm">
              Already have an account?
            </Link>
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg py-3 font-medium hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full"></div>: "Create Account"}

          
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;