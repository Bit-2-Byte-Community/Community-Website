import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github } from 'lucide-react';

// Team data remains the same
const teamData = [
  { name: 'Anurag Bhattacharjee', role: 'PRIME - Executions', color: 'cyan', details: 'Led execution strategies and project management across all community initiatives.' },
  { name: 'Nanda Lal Das', role: 'PRIME - Operations', color: 'cyan', details: 'Managed day-to-day operations, ensuring smooth workflow and team coordination.' },
  { name: 'Sandip Dey', role: 'ADMIN - Social Media', color: 'orange', details: 'Directed social media campaigns and content strategy to boost community engagement.' },
  { name: 'Aniket Das', role: 'ADMIN - Events', color: 'orange', details: 'Organized and managed all community events, from webinars to coding competitions.' },
  { name: 'Zishan Khan Chowdhury', role: 'ADMIN - Public Relations', color: 'orange', details: 'Handled outreach and communication, building strong relationships with partners.' },
  { name: 'Ujjal Bhattacharya', role: 'ADMIN - Development', color: 'orange', details: 'Oversaw the technical development of community projects and digital assets.' },
  { name: 'Kaushik Kundu', role: 'DEV TEAM - Lead', color: 'red', details: 'Guided the development team in building and maintaining our core applications.' },
  { name: 'Raj Kumar Singh', role: 'ZONE LEAD - Cloud & CP', color: 'blue', details: 'Mentored members in competitive programming and cloud computing technologies.' },
  { name: 'Diprit Turul', role: 'ZONE LEAD - Cyber', color: 'blue', details: 'Led workshops and initiatives focused on cybersecurity awareness and skills.' },
  { name: 'Nilagrib Ray', role: 'ZONE LEAD - App', color: 'blue', details: 'Headed the app development domain, focusing on mobile application projects.' },
  { name: 'Sudipta Sen', role: 'ZONE LEAD - AI/ML', color: 'blue', details: 'Fostered growth and projects in the Artificial Intelligence and Machine Learning domain.' },
  { name: 'Mukta Das', role: 'ZONE LEAD - Web', color: 'blue', details: 'Led the web development track, guiding members through modern web technologies.' },
  { name: 'Soubhagya Das', role: 'ZONE LEAD - Web 3.0', color: 'blue', details: 'Pioneered the exploration of Web 3.0, blockchain, and decentralized applications.' },
  { name: 'Aiswariya Das', role: 'HEAD - Social Handles', color: 'purple', details: 'Managed content creation and posting across all official social media platforms.' },
  { name: 'Srijon Deyasin', role: 'HEAD - Presentations', color: 'purple', details: 'Designed and curated visually compelling presentations for events and meetings.' },
  { name: 'Unnati Narayan', role: 'HEAD - Videography', color: 'purple', details: 'Produced and edited all video content for the community, from event highlights to tutorials.' },
  { name: 'Abir Mitra', role: 'SPOC', color: 'green', details: 'Served as a Single Point of Contact, facilitating communication and resolving queries.' },
  { name: 'Jeshmita Chatterjee', role: 'SPOC', color: 'green', details: 'Acted as a key liaison between members and the core team, ensuring clear communication.' },
  { name: 'Ujan Ghosh', role: 'Cyber Club Associate', color: 'white', details: 'Assisted in the organization and execution of cybersecurity-related activities.' },
];

const getInitials = (name) => name.split(' ').map(n => n[0]).join('');

const TeamMemberCard = ({ member }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring' } },
  };
  
  return (
    <motion.div
      className="team-card-container"
      variants={cardVariants}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
    >
      <motion.div
        className="team-card"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {/* Card Front */}
        <div className="team-card-face team-card-front">
          <div className={`w-24 h-24 rounded-full mb-4 border-2 flex items-center justify-center text-3xl font-bold bg-dark-500 text-${member.color}-400 border-${member.color}-400`}>
            {getInitials(member.name)}
          </div>
          <h3 className="font-bold text-white text-2xl text-center">{member.name}</h3>
          <p className={`text-md text-${member.color}-400/80`}>{member.role}</p>
        </div>

        {/* Card Back with frosted glass and new plasma effect */}
        <div className="team-card-face team-card-back glass-effect">
          <h4 className="text-xl font-bold text-white mb-2">Key Role</h4>
          <p className="text-gray-300 text-center text-sm mb-4">{member.details}</p>
          <div className="flex items-center gap-4 mt-auto">
             <motion.a href="#" whileHover={{ scale: 1.1, color: '#0ea5e9' }} className="text-gray-400">
                <Linkedin size={24} />
             </motion.a>
             <motion.a href="#" whileHover={{ scale: 1.1, color: '#fafafa' }} className="text-gray-400">
                <Github size={24} />
             </motion.a>
          </div>
        </div>
      </motion.div>
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
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent title-glow">
            Team of 2024
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            The Team of 2024 played a crucial role in reviving the Bit-2-Byte coding community, bringing together passionate developers, designers, and tech enthusiasts.
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