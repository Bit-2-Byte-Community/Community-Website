import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, Music, ChevronDown, Pause } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      name: 'People',
      children: [
        { name: 'Faculty', href: '/faculty' },
        { name: 'Advisors', href: '/advisors' },
        { name: 'Team of 2024', href: '/team-2024' },
      ],
    },
    {
      name: 'Events',
      children: [
        { name: 'Upcoming Events', href: '/upcoming-events' },
        { name: 'Past Events', href: '/past-events' },
      ],
    },
    {
      name: 'Community',
      children: [
        { name: 'Hackathons', href: '/projects' },
        // { name: 'Smart India Hackathon', href: '/sih-projects' },
        { name: 'Discord', href: '/community' },
      ],
    },
    {
      name: 'Archives',
      children: [{ name: 'Endorsements', href: '/archives' }],
    },
  ];

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15, ease: 'easeIn' } },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, x: '100%', transition: { duration: 0.2, ease: 'easeIn' } },
  };

  const mobileDropdownVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
  };

  const handleMobileDropdownToggle = (itemName) => {
    setMobileOpenDropdown(mobileOpenDropdown === itemName ? null : itemName);
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
    setMobileOpenDropdown(null);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect py-2 shadow-lg shadow-black/20' : 'py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 cursor-pointer">
            <img src="/logo.png" alt="Bit2Byte Logo" className="header-logo" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
              Bit-2-Byte
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="text-gray-300 hover:text-primary-400 transition-colors duration-300 font-medium pb-2">
                  {item.name}
                </button>
                <AnimatePresence>
                  {openDropdown === item.name && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full mt-2 w-48 bg-dark-400/80 backdrop-blur-lg border border-gray-700 rounded-lg shadow-xl"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-primary-500/20 hover:text-white first:rounded-t-lg last:rounded-b-lg"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <Link to="/#about" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 font-medium pb-2">
              About Us
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
      <audio 
        ref={audioRef} 
        loop
        // src="/Cyberpunk2077.mp3"
        src="/nine-inch-nails-as-alive-as-you-need-me-to-be.m4a"
      />
      <motion.button 
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.9 }} 
        onClick={toggleMusic}
        className="p-2 bg-dark-300/50 rounded-full border border-gray-700"
      >
        {isPlaying ? (
          <Pause className="h-5 w-5 text-primary-400" />
        ) : (
          <Music className="h-5 w-5 text-primary-400" />
        )}
      </motion.button>
    </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              {/* Mobile Menu Panel */}
              <motion.div
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed top-0 right-0 h-full w-80 bg-dark-400/95 backdrop-blur-lg border-l border-gray-700 shadow-2xl z-50 md:hidden overflow-y-auto"
              >
                <div className="p-6">
                  {/* Close Button */}
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center space-x-3">
                      <img src="/logo.png" alt="Bit2Byte Logo" className="w-8 h-8" />
                      <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                        Bit2Byte
                      </span>
                    </div>
                    <button 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Mobile Navigation Items */}
                  <nav className="space-y-4">
                    {navItems.map((item) => (
                      <div key={item.name} className="border-b border-gray-700/50 pb-4">
                        <button
                          onClick={() => handleMobileDropdownToggle(item.name)}
                          className="flex items-center justify-between w-full text-left text-gray-300 hover:text-white transition-colors font-medium py-2"
                        >
                          <span>{item.name}</span>
                          <motion.div
                            animate={{ rotate: mobileOpenDropdown === item.name ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </motion.div>
                        </button>
                        
                        <AnimatePresence>
                          {mobileOpenDropdown === item.name && (
                            <motion.div
                              variants={mobileDropdownVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="ml-4 mt-2 space-y-2 overflow-hidden"
                            >
                              {item.children.map((child) => (
                                <Link
                                  key={child.name}
                                  to={child.href}
                                  onClick={handleMobileLinkClick}
                                  className="block py-2 px-3 text-sm text-gray-400 hover:text-cyan-400 hover:bg-gray-700/30 rounded-lg transition-all duration-200"
                                >
                                  {child.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                    
                    {/* About Us Link */}
                    <div className="border-b border-gray-700/50 pb-4">
                      <Link
                        to="/#about"
                        onClick={handleMobileLinkClick}
                        className="block text-gray-300 hover:text-white transition-colors font-medium py-2"
                      >
                        About Us
                      </Link>
                    </div>
                  </nav>

                  {/* Music Button for Mobile */}
                  <div className="mt-8 pt-6 border-t border-gray-700/50">
                    <motion.button 
                      whileHover={{ scale: 1.05 }} 
                      whileTap={{ scale: 0.95 }} 
                      className="w-full flex items-center justify-center gap-2 p-3 bg-dark-300/50 rounded-lg border border-gray-700 text-gray-300 hover:text-white transition-colors"
                    >
                      <Music className="h-5 w-5" />
                      <span>Music</span>
                    </motion.button>
                  </div>

                  {/* Social/Contact Info for Mobile */}
                  <div className="mt-6 pt-6 border-t border-gray-700/50">
                    <p className="text-sm text-gray-400 text-center">
                      Bit2Byte Community
                    </p>
                    <p className="text-xs text-gray-500 text-center mt-2">
                      Guru Nanak Institute of Technology
                    </p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;