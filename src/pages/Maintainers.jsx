import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Star, Lock } from 'lucide-react';
import DossierModal from '../components/dossier/DossierModal';

// Data updated with unique IDs and image URLs
const maintainersData = [
  { 
    name: 'Anurag Bhattacharjee', 
    aka: 'TronAres', 
    id: 'B2B-M01',
    imageUrl: 'https://placehold.co/200x200/0d1a2b/93c5fd?text=AB',
    details: {
        designation: 'Lead Systems Architect',
        clearance: 'Level 5 (Operational Command)',
        sector: 'Project B2B'
    },
    socials: {
        github: '#',
        linkedin: '#',
        twitter: '#'
    }
  },
  { 
    name: 'Kaushik Kundu', 
    aka: 'StrawHatPirate', 
    id: 'B2B-M02',
    imageUrl: 'https://placehold.co/200x200/0d1a2b/93c5fd?text=KK',
    details: {
        designation: 'Cyber Operations Specialist',
        clearance: 'Level 5 (Tactical Ops)',
        sector: 'Project B2B'
    },
    socials: {
        github: '#',
        linkedin: '#',
        twitter: '#'
    }
  },
  { 
    name: 'Rupankar Nandi', 
    aka: 'Alpha-07', 
    id: 'B2B-M03',
    imageUrl: 'https://placehold.co/200x200/0d1a2b/93c5fd?text=RN',
    details: {
        designation: 'Frontend Engineering Lead',
        clearance: 'Level 5 (Operational Lead)',
        sector: 'Project B2B'
    },
    socials: {
        github: '#',
        linkedin: '#',
        twitter: '#'
    }
  },
  { 
    name: 'Avirup Dey', 
    aka: 'Shadow-007', 
    id: 'B2B-M04',
    imageUrl: 'https://placehold.co/200x200/0d1a2b/93c5fd?text=AD',
    details: {
        designation: 'Dataflow Analyst',
        clearance: 'Level 5 (Core Infrastructure)',
        sector: 'Project B2B'
    },
    socials: {
        github: '#',
        linkedin: '#',
        twitter: '#'
    }
  },
  { 
    name: 'Arnab Chakraborty', 
    aka: 'Unicorn09', 
    id: 'B2B-M05',
    imageUrl: 'https://placehold.co/200x200/0d1a2b/93c5fd?text=AC',
    details: {
        designation: 'Backend Systems Engineer',
        clearance: 'Level 5 (Event Lead)',
        sector: 'Project B2B'
    },
    socials: {
        github: '#',
        linkedin: '#',
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

// Card component triggers the modal
const MaintainerCard = ({ maintainer, index, onDecrypt }) => (
    <motion.div
        custom={index}
        variants={cardVariants}
        className="maintainer-dossier-wrapper"
        onClick={() => onDecrypt(maintainer)}
    >
        <div className="maintainer-dossier-card">
            <div className="maintainer-face maintainer-front">
                <div className="dossier-icon">
                    <Lock size={40} />
                </div>
                <h3 className="dossier-name">{maintainer.name}</h3>
                <p className="dossier-aka">{maintainer.aka}</p>
                <div className="dossier-divider"></div>
                <p className="dossier-protocol">ID: {maintainer.id}</p>
                <button className="decrypt-button">
                    [ Click to Decrypt ]
                </button>
            </div>
        </div>
    </motion.div>
);

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