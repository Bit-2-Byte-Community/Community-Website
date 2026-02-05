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
        setIsFinished(true);
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

          <TypewriterText 
            text="A curated collection of projects built by GNIT students during multiple hackathons, showcasing real-world problem solving, teamwork, and the application of modern technologies across domains such as AI, data analytics, and cybersecurity."
          />
        </div>

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
              className="bg-black/80 backdrop-blur-md rounded-xl shadow-2xl transition-all duration-500 overflow-hidden border border-slate-800 hover:border-cyan-500/50 group"
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
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-400">
                    {project.projectName}
                  </h2>
                  {/* GitHub Icon Link */}
                  <a 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-cyan-400 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>

                {/* Purple Hackathon Badge (As seen in 2nd image) */}
                <div className="mb-4">
                  <span className="inline-block bg-purple-900/40 text-purple-300 border border-purple-500/30 px-3 py-1 rounded text-[10px] md:text-xs font-semibold uppercase tracking-wider">
                    {project.hackathon || "Hackathon Project"}
                  </span>
                </div>
                
                <p className="text-slate-400 text-xs md:text-sm mb-4 leading-relaxed font-sans line-clamp-3">
                  {project.projectDescription}
                </p>
                
                <div className="border-t border-slate-800/50 pt-4">
                  <p className="text-slate-500 text-[10px] mb-2 font-mono uppercase">Team Members ({project.projectMembers.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {project.projectMembers.map((member, mIdx) => (
                      <span key={mIdx} className="text-[10px] md:text-[11px] font-medium bg-blue-900/30 text-blue-300 border border-blue-500/20 px-3 py-1 rounded-full">
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