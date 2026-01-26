import React from 'react';
import { motion } from 'framer-motion';
import { Layers, MessageSquare, Sparkles } from 'lucide-react';
import Typewriter from 'typewriter-effect';
import { FaWhatsapp } from "react-icons/fa";

const Hero = () => {
  return (
    // UPDATED: Added pt-24 (padding-top) on mobile (default) and removed it on sm breakpoint (sm:pt-0). 
    // This creates space to prevent content from overlapping the fixed header/logo on small screens.
    <section 
      id="home" 
      className="pt-24 sm:pt-0 min-h-screen flex items-center justify-center relative overflow-hidden px-4"
    >
      {/* Background blobs are preserved for the advanced theme */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center space-x-2 glass-effect rounded-full px-4 py-2 mb-8"
          >
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium">An Inclusive Community For All</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            A Coding Community For
            {/* UPDATED: Typewriter text and gradient for community theme */}
            <span className="block mt-2 md:mt-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent animate-gradient">
              <Typewriter
                options={{
                  strings: ['Developers', 'Innovators', 'Creators'],
                  autoStart: true,
                  loop: true,
                  delay: 75,
                }}
              />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Bit-to-Byte is an inclusive community for anyone passionate about technology. We empower coders through hands-on mentorship & guidance.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            {/* NEW: Glowing WhatsApp Button */}
            <motion.a
              href='https://chat.whatsapp.com/FqKO8sNUKsPB8IUfe6lIb2'
              target='_blank'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="whatsapp-btn"
            >
              <span className="btn-content">
                <FaWhatsapp className="text-2xl" />
                Join Our Community
              </span>
            </motion.a>
            {/* UPDATED: Secondary Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center space-x-2 px-8 py-4 glass-effect rounded-xl font-semibold text-white border border-gray-700 hover:border-primary-500 transition-all duration-300"
            >
              <Layers className="h-5 w-5 text-gray-300 group-hover:text-primary-400 transition-colors" />
              <span>Explore Domains</span>
            </motion.button>
          </motion.div>

          {/* UPDATED: Community-focused stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            {[
              { number: '500+', label: 'Community Members' },
              { number: '5+', label: 'Events Hosted' },
              { number: '50+', label: 'Projects Built' },
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.2 }}
              >
                <div
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent mb-2"
                >
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
