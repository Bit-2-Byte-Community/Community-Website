import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github } from 'lucide-react';

// Team data remains the same (Added social links for the flip side)
const teamData = [
  { name: 'Anurag Bhattacharjee', role: 'PRIME - Executions', color: 'cyan', details: 'Led execution strategies and project management across all community initiatives.', linkedin: '#', github: '#' },
  { name: 'Nanda Lal Das', role: 'PRIME - Operations', color: 'cyan', details: 'Managed day-to-day operations, ensuring smooth workflow and team coordination.', linkedin: '#', github: '#' },
  { name: 'Sandip Dey', role: 'ADMIN - Social Media', color: 'orange', details: 'Directed social media campaigns and content strategy to boost community engagement.', linkedin: '#', github: '#' },
  { name: 'Aniket Das', role: 'ADMIN - Events', color: 'orange', details: 'Organized and managed all community events, from webinars to coding competitions.', linkedin: '#', github: '#' },
  { name: 'Zishan Khan Chowdhury', role: 'ADMIN - Public Relations', color: 'orange', details: 'Handled outreach and communication, building strong relationships with partners.', linkedin: '#', github: '#' },
  { name: 'Ujjal Bhattacharya', role: 'ADMIN - Development', color: 'orange', details: 'Oversaw the technical development of community projects and digital assets.', linkedin: '#', github: '#' },
  { name: 'Kaushik Kundu', role: 'DEV TEAM - Lead', color: 'red', details: 'Guided the development team in building and maintaining our core applications.', linkedin: '#', github: '#' },
  { name: 'Raj Kumar Singh', role: 'ZONE LEAD - Cloud & CP', color: 'blue', details: 'Mentored members in competitive programming and cloud computing technologies.', linkedin: '#', github: '#' },
  { name: 'Diprit Turul', role: 'ZONE LEAD - Cyber', color: 'blue', details: 'Led workshops and initiatives focused on cybersecurity awareness and skills.', linkedin: '#', github: '#' },
  { name: 'Nilagrib Ray', role: 'ZONE LEAD - App', color: 'blue', details: 'Headed the app development domain, focusing on mobile application projects.', linkedin: '#', github: '#' },
  { name: 'Sudipta Sen', role: 'ZONE LEAD - AI/ML', color: 'blue', details: 'Fostered growth and projects in the Artificial Intelligence and Machine Learning domain.', linkedin: '#', github: '#' },
  { name: 'Mukta Das', role: 'ZONE LEAD - Web', color: 'blue', details: 'Led the web development track, guiding members through modern web technologies.', linkedin: '#', github: '#' },
  { name: 'Soubhagya Das', role: 'ZONE LEAD - Web 3.0', color: 'blue', details: 'Pioneered the exploration of Web 3.0, blockchain, and decentralized applications.', linkedin: '#', github: '#' },
  { name: 'Aiswariya Das', role: 'HEAD - Social Handles', color: 'purple', details: 'Managed content creation and posting across all official social media platforms.', linkedin: '#', github: '#' },
  { name: 'Srijon Deyasin', role: 'HEAD - Content Making', color: 'purple', details: 'Designed and curated visually compelling presentations for events and meetings.', linkedin: '#', github: '#' },
  { name: 'Unnati Narayan', role: 'HEAD - Videography', color: 'purple', details: 'Produced and edited all video content for the community, from event highlights to tutorials.', linkedin: '#', github: '#' },
  { name: 'Abir Mitra', role: 'SPOC', color: 'green', details: 'Served as a Single Point of Contact, facilitating communication and resolving queries.', linkedin: '#', github: '#' },
  { name: 'Jeshmita Chatterjee', role: 'SPOC', color: 'green', details: 'Acted as a key liaison between members and the core team, ensuring clear communication.', linkedin: '#', github: '#' },
  { name: 'Ujan Ghosh', role: 'Cyber Club Associate', color: 'white', details: 'Assisted in the organization and execution of cybersecurity-related activities.', linkedin: '#', github: '#' },
];

const getInitials = (name) => name.split(' ').map(n => n[0]).join('');

// Custom Hook to check for mobile size (Tailwind's 'sm' breakpoint is 640px)
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkMobile = () => {
      // Use Tailwind's 'sm' breakpoint of 640px for mobile check
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
};


const TeamMemberCard = ({ member }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const isMobile = useIsMobile();
  
  // Custom rotation value based on the state
  const rotation = isFlipped ? 180 : 0;
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring' } },
  };
  
  // Universal interaction for mobile devices (tap to flip)
  const handleFlipToggle = () => {
    setIsFlipped(prev => !prev);
  };

  // Only called on desktop devices
  const handleHoverStart = () => {
    if (!isMobile) {
      setIsFlipped(true);
    }
  };

  // Only called on desktop devices
  const handleHoverEnd = () => {
    if (!isMobile) {
      setIsFlipped(false);
    }
  };

  return (
    <motion.div
      className={`tech-card-wrapper ${isFlipped ? 'is-active' : ''}`}
      variants={cardVariants}
      // Desktop: Flip on hover (Framer motion handles non-touch detection well, but we reinforce it)
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      // Mobile/Universal: Flip on click/tap
      onClick={handleFlipToggle}
      // Set the color for the avatar border/text
      data-color={member.color} 
    >
      <motion.div
        className="tech-card-container"
        animate={{ rotateY: rotation }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
      >
        {/* Card Front */}
        <div className="tech-card-face tech-card-front">
          <div className={`tech-avatar text-${member.color}-400 border-${member.color}-400`}>
            {getInitials(member.name)}
          </div>
          <h3 className="font-bold text-white text-xl text-center">{member.name}</h3>
          <p className={`text-sm text-${member.color}-400/80 uppercase tracking-widest`}>{member.role}</p>
        </div>

        {/* Card Back with High-tech look */}
        <div className="tech-card-face tech-card-back">
          <div className="relative z-10 flex flex-col items-center justify-center p-4">
             <h4 className="text-xl font-bold text-white mb-3 border-b border-purple-500/50 pb-1">Role Briefing</h4>
             <p className="text-gray-300 text-center text-sm mb-6 max-w-xs">{member.details}</p>
             <div className="flex items-center gap-6">
                <motion.a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    whileHover={{ scale: 1.2, color: '#0ea5e9' }} 
                    className="text-cyan-400"
                >
                   <Linkedin size={28} />
                </motion.a>
                <motion.a 
                    href={member.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    whileHover={{ scale: 1.2, color: '#fafafa' }} 
                    className="text-gray-300"
                >
                   <Github size={28} />
                </motion.a>
             </div>
          </div>
        </div>
      </motion.div>
      {/* Visual cue for mobile interaction when not flipped */}
      {isMobile && !isFlipped && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-gray-500 font-mono tracking-widest"
          >
            [TAP TO FLIP]
          </motion.div>
      )}
    </motion.div>
  );
};

const Team2024 = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen pt-40 pb-20 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          {/* Techy Glitch Title */}
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent title-glow">
  <span data-text="Team of 2024" className="glitch-text">Team of 2024</span>
</h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            The Core Operatives of 2024, responsible for the community's revival and strategic direction. Discover their key roles and contributions below.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.08 }}
        >
          {teamData.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Team2024;
