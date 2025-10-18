import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, LogIn, User, KeyRound } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { username, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      // API call to our new backend
      const res = await axios.post('http://localhost:5000/api/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      console.error(err.response ? err.response.data : err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
      exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      className="min-h-screen flex items-center justify-center pt-20 pb-20 overflow-hidden"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
        className="w-full max-w-md p-8 space-y-8 rounded-2xl login-form-container"
      >
        <div className="text-center">
            <div className="inline-block p-3 bg-dark-400 rounded-full mb-4 border border-primary-500/30">
                <Shield className="w-8 h-8 text-primary-400" />
            </div>
            <h1 className="text-3xl font-bold text-white">Admin Access</h1>
            <p className="text-gray-400 mt-2">Secure login for event management.</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              id="username"
              name="username"
              type="text"
              required
              className="login-input pl-10"
              placeholder="Username"
              value={username}
              onChange={onChange}
            />
          </div>
          <div className="relative">
            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              id="password"
              name="password"
              type="password"
              required
              className="login-input pl-10"
              placeholder="Password"
              value={password}
              onChange={onChange}
            />
          </div>
          
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          
          <div>
            <motion.button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 focus:ring-offset-dark-500"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn className="h-5 w-5 text-primary-300 group-hover:text-primary-100" />
              </span>
              Sign in
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AdminLogin;