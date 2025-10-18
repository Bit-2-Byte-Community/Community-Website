import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Gallery from '../components/sections/Gallery'; // Import new component
import Webinars from '../components/sections/Webinars'; // Import new component

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <About />
      <Gallery />
      <Webinars />
    </motion.div>
  );
};

export default Home;