import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Archives.css';

const Archives = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const endorsementText = "Bit 2 Byte is far beyond the scope of a typical college club; it is an ecosystem of excellence forged by visionaries and fueled by uncompromising efficiency. Our stature is not self-proclaimed—it is independently verified by a distinguished roster of Personalities in Tech whose endorsements affirm our role as a critical nexus for innovation and talent development. We don't just participate in the future; we build it, with the industry's most respected minds standing right beside us.";

  useEffect(() => {
    setIsVisible(true);
    
    if (currentIndex < endorsementText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + endorsementText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, endorsementText]);

  const personalities = [
    {
      name: "Prof. Swarup Kumar Mitra",
      position: "Principal",
      organization: "GNIT",
      description: "A visionary leader in technical education, guiding GNIT towards academic excellence and innovation in technology education.",
      achievements: [
        "25+ Years in Academia",
        "Research in Computer Science",
        "Educational Leadership"
      ]
    },
    {
      name: "Mr. Binit Kumar Mondal",
      position: "Co Organiser",
      organization: "GDG Kolkata",
      description: "Technology evangelist and community builder, driving innovation through Google Developer Groups and fostering tech talent across Kolkata.",
      achievements: [
        "Google Developer Expert",
        "Community Building",
        "Tech Evangelism"
      ]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20 overflow-hidden"
    >
      {/* REMOVED: Solid background divs to allow particle effect to show through */}
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent title-glow">
              <span data-text="ENDORSEMENTS" className="glitch-text">ENDORSEMENTS</span>
            </h1>
            <div className="text-lg text-cyan-400 font-semibold opacity-90 tracking-widest uppercase">
              Industry Recognition & Academic Validation
            </div>
          </motion.div>
        </section>

        {/* Endorsement Text Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-8 rounded-2xl login-form-container max-w-4xl mx-auto"
          >
            <div className="text-center relative">
              <div className="typing-indicator absolute top-0 right-0">
                <div className="cursor"></div>
              </div>
              <p className="endorsement-text text-lg text-gray-300 leading-relaxed mb-8 min-h-32 flex items-center justify-center">
                {displayedText}
                {currentIndex < endorsementText.length && (
                  <span className="typing-cursor">|</span>
                )}
              </p>
              
              <div className="verification-badge flex items-center justify-center gap-3 p-4 bg-dark-400/50 rounded-full border border-primary-500/30 max-w-xs mx-auto">
                <div className="badge-icon text-cyan-400 text-xl">⚡</div>
                <div className="badge-text text-cyan-400 font-semibold uppercase tracking-wider text-sm">
                  Independently Verified
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Personalities Grid */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Distinguished <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">Validators</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              The visionaries who validate our mission and amplify our impact
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {personalities.map((person, index) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                className="gradient-border p-6 rounded-2xl card-bg-gradient card-hover-glow"
              >
                {/* Profile Section */}
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full bg-dark-400 border-2 border-primary-500/50 flex items-center justify-center text-cyan-300 text-2xl font-bold mb-2">
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-dark-500"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{person.name}</h3>
                  <div className="flex items-center gap-2 text-cyan-400 mb-3">
                    <span className="font-semibold">{person.position}</span>
                    <span>•</span>
                    <span>{person.organization}</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{person.description}</p>
                </div>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-4 text-center">Key Contributions</h4>
                  <div className="space-y-2">
                    {person.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-dark-400/50 rounded-lg border-l-4 border-cyan-400">
                        <div className="text-cyan-400 font-bold">✓</div>
                        <span className="text-gray-300 text-sm font-medium">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Credibility Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-dark-400/30 rounded-xl border border-gray-700">
                  <div className="text-center">
                    <div className="text-cyan-400 font-bold text-sm mb-1">Expert</div>
                    <div className="text-gray-400 text-xs uppercase tracking-wider">Level</div>
                  </div>
                  <div className="text-center">
                    <div className="text-cyan-400 font-bold text-sm mb-1">Verified</div>
                    <div className="text-gray-400 text-xs uppercase tracking-wider">Status</div>
                  </div>
                  <div className="text-center">
                    <div className="text-cyan-400 font-bold text-sm mb-1">Industry</div>
                    <div className="text-gray-400 text-xs uppercase tracking-wider">Impact</div>
                  </div>
                </div>

                {/* Endorsement Stamp */}
                <div className="flex justify-center pt-4 border-t border-gray-700">
                  <div className="flex items-center gap-3 px-6 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-500/40">
                    <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest">OFFICIAL ENDORSER</span>
                    <div className="w-4 h-4 border-2 border-cyan-400 rounded-full flex items-center justify-center">
                      <div className="text-cyan-400 text-xs font-bold">✓</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Validation Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="p-8 rounded-2xl login-form-container text-center max-w-4xl mx-auto"
          >
            <div className="text-6xl mb-6">🏆</div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
              Industry Certified Excellence
            </h3>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Our endorsements represent more than just approval—they signify active partnership 
              and shared vision with leaders who shape the technological landscape.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">100%</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider font-semibold">Verified Credibility</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">Industry</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider font-semibold">Leaders</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">Active</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider font-semibold">Partnership</div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </motion.div>
  );
};

export default Archives;