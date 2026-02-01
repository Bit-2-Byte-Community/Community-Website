import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github } from 'lucide-react';

// Updated team data with image field
const teamData = [
  { 
    name: 'Anurag Bhattacharjee', 
    role: 'PRIME - Executions', 
    color: 'cyan', 
    image: 'https://media.licdn.com/dms/image/v2/D5603AQHWqz16ljwiuw/profile-displayphoto-scale_400_400/B56ZodJ7SSJYAg-/0/1761425733608?e=1770854400&v=beta&t=chDrs39mSEf5mXCr7w0-jnsLcfOXWIMgbN2LewQ371M', // Replace '#' with LinkedIn Image URL or local path
    details: 'Led execution strategies and project management across all community initiatives.', 
    linkedin: 'https://www.linkedin.com/in/anurag-bhattacharjee-65a487275/', 
    github: '#' 
  },
  { 
    name: 'Nanda Lal Das', 
    role: 'PRIME - Operations', 
    color: 'cyan', 
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQFZu79ZanD9Hg/profile-displayphoto-scale_400_400/B4DZt6LraeJUAg-/0/1767281442245?e=1770854400&v=beta&t=2YLO2dFSL4gV9cDZix-80nL0Z9RTjBVtM4FdqLFvMQg',
    details: 'Managed day-to-day operations, ensuring smooth workflow and team coordination.', 
    linkedin: 'https://www.linkedin.com/in/nanda-das/', 
    github: '#' 
  },
  { 
    name: 'Sandip Dey', 
    role: 'ADMIN - Social Media', 
    color: 'orange', 
    image: 'https://media.licdn.com/dms/image/v2/D5635AQGzDbt2XIE5pA/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1728008149141?e=1770094800&v=beta&t=eZLryibkyQVIanc8o_zVpijM8LPd5wgIVuNnNuP9itI',
    details: 'Directed social media campaigns and content strategy to boost community engagement.', 
    linkedin: 'https://www.linkedin.com/in/helios1307/', 
    github: '#' 
  },
  { 
    name: 'Aniket Das', 
    role: 'ADMIN - Events', 
    color: 'orange', 
    image: 'https://media.licdn.com/dms/image/v2/D4D35AQHjKkZV9AfIOg/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1729068796110?e=1770094800&v=beta&t=EqAf8zVelK7BsdNVx8rU6b9F1VRljx8yhQsiAujQVt0',
    details: 'Organized and managed all community events, from webinars to coding competitions.', 
    linkedin: 'https://www.linkedin.com/in/aniket-das-tech/', 
    github: '#' 
  },
  { 
    name: 'Zishan Khan Chowdhury', 
    role: 'ADMIN - Public Relations', 
    color: 'orange', 
    image: 'https://media.licdn.com/dms/image/v2/D5603AQHEem-Ac5E7TQ/profile-displayphoto-scale_400_400/B56ZrZXpOIH8Ag-/0/1764583447012?e=1770854400&v=beta&t=MzVgn0HCBILw3KH5ElqFFb8EO9bQMeBBnRqr7Lg8Mxk',
    details: 'Handled outreach and communication, building strong relationships with partners.', 
    linkedin: 'https://www.linkedin.com/in/zishan-khan-chowdhury-115607245/', 
    github: '#' 
  },
  { 
    name: 'Ujjal Bhattacharya', 
    role: 'ADMIN - Development', 
    color: 'orange', 
    image: 'https://media.licdn.com/dms/image/v2/D5603AQFyQAt1U9psqw/profile-displayphoto-shrink_400_400/B56ZWYtwnOGQAg-/0/1742023888542?e=1770854400&v=beta&t=6T7uIXA6MINeUb6GHYCKkwvrjzFBDZJBCrJOInmcHsM',
    details: 'Oversaw the technical development of community projects and digital assets.', 
    linkedin: 'https://www.linkedin.com/in/ujjal-bhattacharya/', 
    github: '#' 
  },
  { 
    name: 'Kaushik Kundu', 
    role: 'DEV TEAM - Lead', 
    color: 'red', 
    image: 'https://media.licdn.com/dms/image/v2/D4D35AQFeWCNfJVevAw/profile-framedphoto-shrink_400_400/B4DZuOogCFKQAc-/0/1767624540740?e=1770094800&v=beta&t=xHTZZ_3-9DiUFf_zntFWOoh0boM798Gxb_0AnI35ulE',
    details: 'Guided the development team in building and maintaining our core applications.', 
    linkedin: 'https://www.linkedin.com/in/kaushik--kundu/', 
    github: '#' 
  },
  { 
    name: 'Raj Kumar Singh', 
    role: 'ZONE LEAD - Cloud & CP', 
    color: 'blue', 
    image: 'https://media.licdn.com/dms/image/v2/D5635AQFV0u7xO5wQaQ/profile-framedphoto-shrink_400_400/B56Zo_ODXSIYAg-/0/1761997240096?e=1770094800&v=beta&t=JwXmgh1JVNmvQotWAz4rcf485dVdgYhen3s7Pbz3BI0',
    details: 'Mentored members in competitive programming and cloud computing technologies.', 
    linkedin: 'https://www.linkedin.com/in/be-raj-kumar-singh-/', 
    github: '#' 
  },
  { 
    name: 'Diprit Turul', 
    role: 'ZONE LEAD - Cyber', 
    color: 'blue', 
    image: 'https://media.licdn.com/dms/image/v2/D4E03AQFyYqwY6ua4LQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1729180547223?e=1770854400&v=beta&t=OJj3MCzX0lGkFaYMELDbv-Uxo3dKTEoMUBRSCTR_6uA',
    details: 'Led workshops and initiatives focused on cybersecurity awareness and skills.', 
    linkedin: 'https://www.linkedin.com/in/diprit-turul/', 
    github: '#' 
  },
  { 
    name: 'Nilagrib Ray', 
    role: 'ZONE LEAD - App', 
    color: 'blue', 
    image: 'https://media.licdn.com/dms/image/v2/D5603AQEk8fzosynUpQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1731150662252?e=1770854400&v=beta&t=MFO9zZl71u9H1UNfsa0Y6dmfBbr0YYmvP5uUvkjs6tk',
    details: 'Headed the app development domain, focusing on mobile application projects.', 
    linkedin: 'https://www.linkedin.com/in/nilagrib-ray-8a6073255/', 
    github: '#' 
  },
  { 
    name: 'Sudipta Sen', 
    role: 'ZONE LEAD - AI/ML', 
    color: 'blue', 
    image: 'https://media.licdn.com/dms/image/v2/D5603AQGCpPLqtYHACg/profile-displayphoto-scale_400_400/B56Zv2R8fwKIAg-/0/1769363459813?e=1770854400&v=beta&t=k1Zp8tKR1FOSPT9T6aEY5gPxgmODow67HuGo76M-VrM',
    details: 'Fostered growth and projects in the Artificial Intelligence and Machine Learning domain.', 
    linkedin: 'https://www.linkedin.com/in/sudipta-sen-841aa0253/', 
    github: '#' 
  },
  { 
    name: 'Mukta Das', 
    role: 'ZONE LEAD - Web', 
    color: 'blue', 
    image: 'https://media.licdn.com/dms/image/v2/D5603AQF4aiZBury7hQ/profile-displayphoto-shrink_400_400/B56ZNkoqfAGwAg-/0/1732560202752?e=1770854400&v=beta&t=6XeoyNTsmeTq0_bbpFrrb8sdEvdCnytFkBvjIO04n3k',
    details: 'Led the web development track, guiding members through modern web technologies.', 
    linkedin: 'https://www.linkedin.com/in/mukta-das-406336288/', 
    github: '#' 
  },
  { 
    name: 'Soubhagya Das', 
    role: 'ZONE LEAD - Web 3.0', 
    color: 'blue', 
    image: 'https://media.licdn.com/dms/image/v2/D5603AQF-8bj6RjyNMw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1726592805561?e=1770854400&v=beta&t=Shr4IOLDJPjh3RQJFu77EJpNhNKDQoVsEE1DnDsGbzk',
    details: 'Pioneered the exploration of Web 3.0, blockchain, and decentralized applications.', 
    linkedin: 'https://www.linkedin.com/in/shubhlxndev/', 
    github: '#' 
  },
  { 
    name: 'Aiswariya Das', 
    role: 'HEAD - Social Handles', 
    color: 'purple', 
    image: 'https://media.licdn.com/dms/image/v2/D5635AQGPyLE3_OODiQ/profile-framedphoto-shrink_400_400/B56Zi2KhG5G0Ac-/0/1755402867462?e=1770094800&v=beta&t=RKOrPS1X7dsChFTwbMCRU6fke13uWyTzgdVW5pZAmE4',
    details: 'Managed content creation and posting across all official social media platforms.', 
    linkedin: 'https://www.linkedin.com/in/aiswariyadas/', 
    github: '#' 
  },
  { 
    name: 'Srijon Deyasin', 
    role: 'HEAD - Content Making', 
    color: 'purple', 
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQFkPGa5RqqxAg/profile-displayphoto-scale_400_400/B4DZvLrrhMI0Ak-/0/1768648785801?e=1770854400&v=beta&t=xtZKzp3We3Ux9y3KedmlWfWv1o7c3do5v1yI3lQyRy0',
    details: 'Designed and curated visually compelling presentations for events and meetings.', 
    linkedin: 'https://www.linkedin.com/in/srijon-deyasin-59688934b/', 
    github: '#' 
  },
  { 
    name: 'Unnati Narayan', 
    role: 'HEAD - Videography', 
    color: 'purple', 
    image: 'https://media.licdn.com/dms/image/v2/D5603AQGCbD0ca7ZYJw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1706810391948?e=1770854400&v=beta&t=zzftjk8fRDialWtY_szLFzmIU3QCddniCpY-flaPQ7I',
    details: 'Produced and edited all video content for the community, from event highlights to tutorials.', 
    linkedin: 'https://www.linkedin.com/in/a-unnati-narayan/', 
    github: '#' 
  },
  { 
    name: 'Abir Mitra', 
    role: 'SPOC', 
    color: 'green', 
    image: 'https://media.licdn.com/dms/image/v2/D5603AQHntCS_EPmKOg/profile-displayphoto-scale_400_400/B56Zq_n6hxKsAg-/0/1764151505126?e=1770854400&v=beta&t=O1TWh23YKsTA8-Uzb8ItxA1CI6Z9ogcsXDN785uKLYs',
    details: 'Served as a Single Point of Contact, facilitating communication and resolving queries.', 
    linkedin: 'https://www.linkedin.com/in/abir-mitra-7b4a98253/', 
    github: '#' 
  },
  { 
    name: 'Jeshmita Chatterjee', 
    role: 'SPOC', 
    color: 'green', 
    image: 'https://media.licdn.com/dms/image/v2/D5635AQG3HCk42c9WHA/profile-framedphoto-shrink_400_400/B56ZpNU2LeHYAc-/0/1762233902158?e=1770094800&v=beta&t=0KAzkeYPt_Q40erP0Bv9raHlJyX9evWHQCJeybFh_pM',
    details: 'Acted as a key liaison between members and the core team, ensuring clear communication.', 
    linkedin: 'https://www.linkedin.com/in/jeshmita-chatterjee-862631218/', 
    github: '#' 
  },
  { 
    name: 'Ujan Ghosh', 
    role: 'Cyber Club Associate', 
    color: 'white', 
    image: 'https://media.licdn.com/dms/image/v2/D5603AQEbIAtxljAV9Q/profile-displayphoto-shrink_400_400/B56Zb71j_3HUAo-/0/1747981846121?e=1770854400&v=beta&t=Np-WtBHzsGQlBoFmdnwvlJnCuO4YGnXVK5dx0I16do8',
    details: 'Assisted in the organization and execution of cybersecurity-related activities.', 
    linkedin: 'https://www.linkedin.com/in/ujan-ghosh-5ab279255/', 
    github: '#' 
  },
];

const getInitials = (name) => name.split(' ').map(n => n[0]).join('');

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};

const TeamMemberCard = ({ member }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const isMobile = useIsMobile();
  const rotation = isFlipped ? 180 : 0;
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring' } },
  };
  
  const handleFlipToggle = () => setIsFlipped(prev => !prev);
  const handleHoverStart = () => { if (!isMobile) setIsFlipped(true); };
  const handleHoverEnd = () => { if (!isMobile) setIsFlipped(false); };

  return (
    <motion.div
      className={`tech-card-wrapper ${isFlipped ? 'is-active' : ''}`}
      variants={cardVariants}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onClick={handleFlipToggle}
      data-color={member.color} 
    >
      <motion.div
        className="tech-card-container"
        animate={{ rotateY: rotation }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
      >
        {/* Card Front */}
        <div className="tech-card-face tech-card-front">
          <div className={`tech-avatar text-${member.color}-400 border-4 border-${member.color}-400 overflow-hidden flex items-center justify-center`}>
            {member.image && member.image !== '#' ? (
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold">{getInitials(member.name)}</span>
            )}
          </div>
          <h3 className="font-bold text-white text-xl text-center">{member.name}</h3>
          <p className={`text-sm text-${member.color}-400/80 uppercase tracking-widest`}>{member.role}</p>
        </div>

        {/* Card Back */}
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
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent title-glow">
            <span data-text="Generation 1" className="glitch-text">Generation 1</span>
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