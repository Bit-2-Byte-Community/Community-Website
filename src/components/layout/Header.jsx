import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, Music } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

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
      children: [{ name: 'Discord', href: '/community' }],
    },
    {
      name: 'Archives',
      children: [{ name: 'Endorsements', href: '#' }],
    },
  ];

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15, ease: 'easeIn' } },
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
            {/* UPDATED LOGO IMPLEMENTATION */}
            <img src="/logo.png" alt="Bit2Byte Logo" className="header-logo" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
              Bit2Byte
            </span>
          </Link>

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
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 bg-dark-300/50 rounded-full border border-gray-700">
              <Music className="h-5 w-5 text-primary-400" />
            </motion.button>
          </div>
          
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-gray-300 hover:text-white transition-colors">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;