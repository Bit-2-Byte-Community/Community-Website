import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Calendar, User, GitBranch, ShieldCheck, BrainCircuit } from 'lucide-react';

const webinars = [
  { 
    title: 'AVNTK: Supervised Learning', 
    date: 'March 30, 2025', 
    speaker: 'SUDIPTA SEN', 
    icon: <BrainCircuit/> 
  },
  { 
    title: 'Cyber Security For Developers', 
    date: 'March 06, 2025', 
    speaker: 'UJJAL BHATTACHARYA', 
    icon: <ShieldCheck/> 
  },
  { 
    title: 'AVNTK: Git', 
    date: 'November 30, 2024', 
    speaker: 'ANURAG BHATTACHARJEE', 
    icon: <GitBranch/> 
  },
];

const Webinars = () => {
  const { ref, style } = useScrollAnimation();

  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
          Latest Webinars
        </h2>
        
        <motion.div 
          ref={ref} 
          style={style} 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {webinars.map((webinar, index) => (
            <motion.div
              key={index}
              className="webinar-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="webinar-card-icon">
                {webinar.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{webinar.title}</h3>
              <div className="text-sm text-gray-400 space-y-2">
                <p className="flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{webinar.date}</span>
                </p>
                <p className="flex items-center justify-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{webinar.speaker}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Webinars;