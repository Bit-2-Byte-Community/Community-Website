import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import projectsData from '../../data/hackathon_project.json';

const TypewriterText = ({ text, delay = 30 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        setIsFinished(true); // Hide cursor when done
      }
    }, delay);

    return () => clearInterval(timer);
  }, [text, delay]);

  return (
    <div className="max-w-3xl mx-auto px-4">
      <p className="typewriter-description text-sm md:text-lg">
        {displayedText}
        {!isFinished && <span className="cursor" />}
      </p>
    </div>
  );
};

function Projects() {
  return (
    <div className="min-h-screen pt-32 pb-20 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
        <div className="gps-tracking-grid h-full w-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="project-subtitle text-xs md:text-sm">GNIT Showcase</h2>
            
            <h1 
              className="text-2xl md:text-5xl font-bold mb-6 md:mb-8 glitch-text-blue px-2"
              data-text="Innovation • Collaboration • Real-World Impact"
            >
              Innovation • Collaboration • Real-World Impact
              <span className="glitch-layer-1">Innovation • Collaboration • Real-World Impact</span>
              <span className="glitch-layer-2">Innovation • Collaboration • Real-World Impact</span>
            </h1>
          </motion.div>

          {/* Typewriter Description Component */}
          <TypewriterText 
            text="A curated collection of projects built by GNIT students during multiple hackathons, showcasing real-world problem solving, teamwork, and the application of modern technologies across domains such as AI, data analytics, and cybersecurity."
          />
        </div>

        {/* Projects Grid with Responsive Columns */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {projectsData.map((project, index) => (
            <motion.div 
              key={index} 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              className="bg-black/80 backdrop-blur-md rounded-xl shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 overflow-hidden border border-slate-800 hover:border-cyan-500/50 group"
            >
              {/* Image Header */}
              <div className="relative h-40 md:h-52 w-full overflow-hidden">
                <img 
                  src={project.projectCover} 
                  alt={project.projectName}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                
                {project.prize && (
                  <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold">
                    🏆 {project.prize}
                  </div>
                )}
                
                <div className="absolute bottom-3 left-3">
                  <img 
                    src={project.projectLogo} 
                    alt="Logo"
                    className="w-16 h-16 rounded-lg border border-white/20 object-cover"
                  />
                </div>
              </div>
              
              <div className="p-4 md:p-6">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-400">
                    {project.projectName}
                  </h2>
                </div>
                
                <p className="text-slate-400 text-xs md:text-sm mb-4 leading-relaxed font-mono line-clamp-3">
                  {project.projectDescription}
                </p>
                
                <div className="border-t border-slate-800 pt-4">
                  <div className="flex flex-wrap gap-2">
                    {project.projectMembers.map((member, mIdx) => (
                      <span key={mIdx} className="text-[9px] md:text-[10px] font-mono bg-blue-900/20 text-blue-300 border border-blue-500/20 px-2 py-0.5 rounded">
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Projects;