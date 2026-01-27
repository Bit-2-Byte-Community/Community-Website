import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, Linkedin, Twitter } from 'lucide-react';
// Assuming TypewriterEffect is a functional component
import TypewriterEffect from '../ui/TypewriterEffect'; 

// Component for the final, static text display with social links
const StaticDossierText = ({ lines, socials }) => (
  <>
    <div className="dossier-typewritten-static flex-grow">
      {lines.map((line, i) => (
        // The prefix class handles the color/shadow for the bracketed text
        <p key={i} dangerouslySetInnerHTML={{ __html: line.replace(/(\[.*?\])/g, '<span class="prefix">$1</span>') }} />
      ))}
    </div>
    <div className="dossier-socials-container">
        <a href={socials.github} target="_blank" rel="noopener noreferrer" className="dossier-social-link"><Github size={24} /></a>
        <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="dossier-social-link"><Linkedin size={24} /></a>
        <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="dossier-social-link"><Twitter size={24} /></a>
    </div>
  </>
);

const DossierModal = ({ dossier, onClose }) => {
  const [stage, setStage] = useState('opening'); // opening -> error -> decrypting -> decrypted
  
  const isRedAlert = dossier.status === 'RED_ALERT';

  useEffect(() => {
    // Stage transition timings adjusted for the high-tech feel
    const timer1 = setTimeout(() => setStage('error'), 1000); // 1.0s to error/shake
    const timer2 = setTimeout(() => setStage('decrypting'), 2000); // 2.0s to start typing

    // Automatically transition from decrypting to decrypted when the Typewriter finishes
    // Note: The TypewriterEffect handles setting stage('decrypted') via onComplete prop.

    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, [dossier]); // Rerun effect if a different dossier is selected

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  }

  // --- UPDATED: Construct decryption lines with conditional Red Alert fields ---
  let decryptionLines = [
    '[INIT] Running Diagnostics...',
    '[AUTH] Credentials verified. Access token generated.',
    '[SYSTEM] Bypassing primary security layer...',
    '[LOG] Firewall breach detected... overriding.',
    '[DECRYPT] Decryption module engaged (AES-256-GCM).',
    `[FETCH] Loading Subject Dossier: ${dossier.id} (${dossier.aka})...`,
    '---',
    '--| CLASSIFIED FILE V1.3 |---',
    `Codename: ${dossier.aka}`,
    `Primary Designation: ${dossier.details.designation}`,
    `Clearance: ${dossier.details.clearance}`,
    `Sector: ${dossier.details.sector}`,
    `Status: Field ${dossier.status === 'ACTIVE' ? 'Active' : 'Compromised'}`,
  ];
  
  // --------------------------------------------------------------------------

  return (
    <motion.div className="dossier-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      {/* Local styles for hiding the scrollbar without affecting the whole app */}
      <style>
        {`
          .hidden-scrollbar-panel::-webkit-scrollbar {
            display: none; /* Hide scrollbar for Chrome, Safari and Opera */
          }
          .hidden-scrollbar-panel {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        `}
      </style>

      <motion.div 
        // Conditionally apply 'dossier-error-shake' and apply 'red-alert' specific modal class
        className={`dossier-modal-container ${stage === 'error' ? 'dossier-error-shake' : ''} glow-active ${isRedAlert ? 'red-alert' : ''}`}
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div className="dossier-bracket top" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.6, delay: 0.4 }}></motion.div>
        <motion.div className="dossier-bracket bottom" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.6, delay: 0.4 }}></motion.div>
        
        <div className="dossier-inner-content">
            <AnimatePresence mode="wait">
                {stage === 'error' && (
                    <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <h2 className="dossier-error-text">ERROR – DATA CORRUPTION</h2>
                    </motion.div>
                )}
                {(stage === 'decrypting' || stage === 'decrypted') && (
                    <motion.div key="content" className="dossier-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.2 }}>
                        
                        <div className="dossier-panel">
                            <div className="dossier-panel-inner">
                                <div className="dossier-left-panel">
                                    <h4 className="dossier-subject-heading mb-6">SUBJECT FILE</h4>
                                    <div className={`dossier-avatar-container-static ${isRedAlert ? 'red-alert-avatar' : ''}`}>
  <img
    src={dossier.imageUrl}
    alt={dossier.name}
    className="w-full h-full object-cover rounded-full"
  />
</div>

                                    {/* UPDATED: Status Label is dynamic and applies red-alert class */}
                                    <div className={`dossier-status-label ${isRedAlert ? 'red-alert' : ''}`}>
                                        STATUS: {dossier.status}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FIX: Re-enable scrolling functionality with hidden scrollbar */}
                        <div className="dossier-panel"> 
                            <div className="dossier-panel-inner">
                                {/* Applied classes: 
                                  - h-full: Ensures the container takes up the full height of the panel-inner.
                                  - overflow-y-auto: Enables vertical scrolling.
                                  - hidden-scrollbar-panel: Custom class to hide the scrollbar visually via CSS.
                                */}
                                <div className="dossier-right-panel h-full overflow-y-auto hidden-scrollbar-panel">
                                    {stage === 'decrypting' && (
                                        <TypewriterEffect 
                                            lines={decryptionLines} 
                                            speed={20}
                                            onComplete={() => setStage('decrypted')}
                                        />
                                    )}
                                    {stage === 'decrypted' && (
                                        <StaticDossierText lines={decryptionLines} socials={dossier.socials} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
        
        <button className="dossier-close-btn" onClick={onClose}><X size={24} /></button>
      </motion.div>
    </motion.div>
  );
};

export default DossierModal;
