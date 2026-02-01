import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Star, Lock } from 'lucide-react';
// Assuming DossierModal is available and imported from the correct path
import DossierModal from '../components/dossier/DossierModal';

// --- UPDATED DATA: RED ALERT AND CLASSIFIED DETAILS INCLUDED ---
const maintainersData = [
  { 
    name: 'Anurag Bhattacharjee', 
    aka: 'TronAres', 
    id: 'B2B-M01',
    imageUrl: 'https://media.licdn.com/dms/image/v2/D5603AQHWqz16ljwiuw/profile-displayphoto-scale_400_400/B56ZodJ7SSJYAg-/0/1761425733608?e=1770854400&v=beta&t=chDrs39mSEf5mXCr7w0-jnsLcfOXWIMgbN2LewQ371M',
    status: 'ACTIVE',
    details: {
        designation: 'Lead Systems Architect',
        clearance: 'Level 5 (Operational Command)',
        sector: 'Project B2B'
    },
    socials: {
        github: '#',
        linkedin: 'https://www.linkedin.com/in/anurag-bhattacharjee-65a487275/',
        twitter: '#'
    }
  },
  { 
    name: 'Kaushik Kundu', 
    aka: 'StrawHatPirate', 
    id: 'B2B-M02',
    imageUrl: 'https://media.licdn.com/dms/image/v2/D4D35AQFeWCNfJVevAw/profile-framedphoto-shrink_400_400/B4DZuOogCFKQAc-/0/1767624540740?e=1770105600&v=beta&t=o6Wceg9L9ZuVjr9bHdjsltNIiZt9y-m4FUo4E08ji4g',
    status: 'ACTIVE',
    details: {
        designation: 'Cyber Operations Specialist',
        clearance: 'Level 5 (Tactical Ops)',
        sector: 'Project B2B'
    },
    socials: {
        github: '#',
        linkedin: 'https://www.linkedin.com/in/kaushik--kundu/',
        twitter: '#'
    }
  },
  { 
    name: 'Rupankar Nandi', 
    aka: 'Alpha-07', 
    id: 'B2B-M03',
    imageUrl: 'https://media.licdn.com/dms/image/v2/C5603AQFstU-A0f4YUA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1617544690004?e=1770854400&v=beta&t=rUR_lC1cc1KjTMHVDum35r-rl1Q5dLbtqevuoknx7ak',
    status: 'RED_ALERT', // RED ALERT TARGET
    details: {
        designation: '[CLASSIFIED] Lead Interceptor',
        clearance: 'Level 7 (HIGHLY CLASSIFIED)',
        sector: 'System Interception & Reconnaissance',
        
    },
    socials: {
        github: '#',
        linkedin: 'https://www.linkedin.com/in/rupankar-nandi-46525420b/',
        twitter: '#'
    }
  },
  { 
    name: 'Avirup Dey', 
    aka: 'Shadow-007', 
    id: 'B2B-M04',
    imageUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQHQZesMj74Q-Q/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1724296607171?e=1770854400&v=beta&t=q5WxNnsvmG7CYnT0kEXdjua4mU9InjLISnG0Gi_kp38',
    status: 'RED_ALERT', // RED ALERT TARGET
    details: {
        designation: '[CLASSIFIED] Dataflow Exfiltration',
        clearance: 'Level 7 (HIGHLY CLASSIFIED)',
        sector: 'Deep Packet Inspection & Data Flow',
        
    },
    socials: {
        github: '#',
        linkedin: 'https://www.linkedin.com/in/avirup-dey-42a855324/',
        twitter: '#'
    }
  },
  { 
    name: 'Arnab Chakraborty', 
    aka: 'Unicorn09', 
    id: 'B2B-M05',
    imageUrl: 'https://media.licdn.com/dms/image/v2/D5603AQGIVlRCaUrJUw/profile-displayphoto-shrink_400_400/B56ZQbUxgXHIAk-/0/1735625219372?e=1770854400&v=beta&t=qKLdYIbu_91ypqNRGaSYw6wfDS0LgOoJ1m8I3D7vDE0',
    status: 'ACTIVE',
    details: {
        designation: 'Backend Systems Engineer',
        clearance: 'Level 5 (Event Lead)',
        sector: 'Project B2B'
    },
    socials: {
        github: '#',
        linkedin: 'https://www.linkedin.com/in/arnab-chakraborty-a55386321/',
        twitter: '#'
    }
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  }),
};

// --- Maintainer Card with Red Alert, GPS, and Horizontal Loading Animations ---
const MaintainerCard = ({ maintainer, index, onDecrypt }) => {
    const isRedAlert = maintainer.status === 'RED_ALERT';
    
    return (
        <motion.div
            custom={index}
            variants={cardVariants}
            className="maintainer-dossier-wrapper"
            onClick={() => onDecrypt(maintainer)}
        >
            <div className={`maintainer-dossier-card ${isRedAlert ? 'red-alert' : ''}`}>
                
                {/* 1. Horizontal Scanline (Hollywood Loading Sign) - Continuous */}
                <div className="horizontal-scanline"></div>
                
                {/* 2. Live Continuous GPS Tracking Grid */}
                {/* This element uses the gps-tracking-grid class defined in index.css */}
                <div className="gps-tracking-grid"></div>

                {/* 3. Data Fragment Overlay (Data Shards) */}
                <div className="data-fragment-overlay"></div>

                <div className="maintainer-face maintainer-front">
                    <div className="dossier-icon">
                        <Lock size={40} />
                    </div>
                    <h4 className="dossier-name text-2xl">{maintainer.name}</h4>
                    <p className="dossier-aka">{maintainer.aka}</p>
                    <div className="dossier-divider"></div>
                    <p className={`dossier-protocol ${isRedAlert ? 'text-red-400' : 'text-cyan-400'}`}>
                        STATUS: {maintainer.status}
                    </p>
                    <button className="decrypt-button">
                        [ ACCESS PROTOCOL ]
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const Maintainers = () => {
  const [selectedDossier, setSelectedDossier] = useState(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen pt-40 pb-20 overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent title-glow">
              Join the Website Maintainers
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Join the group of maintainers of the official Bit-2-Byte Website. Join the team or create pull requests worthy of the website.
            </p>
          </motion.div>

          <motion.div 
            className="flex justify-center mb-20"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="techno-btn"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95, y: 0 }}
            >
              <span className="btn-content">
                <Github className="w-6 h-6" />
                Click Here and Star the Repo
                <Star className="w-6 h-6 text-yellow-400" />
              </span>
            </motion.a>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {maintainersData.map((maintainer, index) => (
              <MaintainerCard 
                key={maintainer.name} 
                maintainer={maintainer} 
                index={index}
                onDecrypt={setSelectedDossier} 
              />
            ))}
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedDossier && (
          <DossierModal 
            dossier={selectedDossier} 
            onClose={() => setSelectedDossier(null)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Maintainers;
