import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link

const Footer = () => {
  return (
    <motion.footer 
      className="py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto px-4 text-center text-gray-400">
        <div className="flex justify-center items-center gap-6 mb-6">
          <h4 className="text-lg font-semibold text-white">Follow Us on our Socials</h4>
          <a href="#" className="footer-social-icon"><Instagram /></a>
          <a href="#" className="footer-social-icon"><Linkedin /></a>
        </div>
        
        <div className="flex justify-center flex-wrap gap-x-8 gap-y-2 mb-6">
          {/* CHANGE THIS LINE */}
          <Link to="/maintainers" className="footer-link">Maintainers</Link>
          <a href="#" className="footer-link">Open Source</a>
          <a href="#" className="footer-link">Activities</a>
          <a href="#" className="footer-link">Documents</a>
          <a href="#" className="footer-link">Contact</a>
        </div>

        <p className="text-sm">
          Email: <a href="mailto:bit2byteofficialgnit@gmail.com" className="text-primary-400 hover:underline">bit2byteofficialgnit@gmail.com</a>
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;