import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Rss, ShieldCheck } from 'lucide-react';

// Animation variants for the character cascade effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.3,
    },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: -20, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', damping: 15, stiffness: 200 },
  },
};

const rules = [
  "Be Respectful: Treat everyone with kindness and professionalism.",
  "No Spamming: Avoid unnecessary messages, self-promotion, or irrelevant content.",
  "Stay On-Topic: Use the correct channels for discussions.",
  "No Hate Speech: Harassment, discrimination, or offensive language is strictly prohibited.",
  "Respect Privacy: Do not share personal or sensitive information of yourself or others.",
  "Follow Discord TOS: Ensure compliance with Discord's Terms of Service."
];

const Community = () => {
  const titleParts = ["Join the Bit-2-Byte Discord ", "Community!"];
  
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateXSpring = useSpring(useTransform(y, [-100, 100], [5, -5]), { stiffness: 300, damping: 30 });
  const rotateYSpring = useSpring(useTransform(x, [-100, 100], [-5, 5]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="min-h-screen pt-40 pb-20 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="container mx-auto px-4 w-full flex flex-col items-center text-center">

        {/* --- Animated Cascade Title (FIXED) --- */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-5xl font-bold mb-6 max-w-3xl text-white"
        >
          {Array.from(titleParts[0]).map((char, index) => (
            <motion.span key={index} variants={charVariants} className="inline-block bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
          <span className="whitespace-nowrap">
             {Array.from(titleParts[1]).map((char, index) => (
              <motion.span key={index + titleParts[0].length} variants={charVariants} className="inline-block bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                {char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* --- Description --- */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-lg text-gray-300 mb-12 max-w-3xl leading-relaxed"
        >
          Connect with fellow developers, participate in coding discussions, get mentorship, and stay updated on all events. Whether you're a beginner or a pro, our collaborative community is here to help you learn, grow, and innovate together!
        </motion.p>
        
        {/* --- NEW Techno Button --- */}
        <motion.a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.7, type: 'spring' }}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95, y: 0 }}
          className="techno-btn"
        >
          <span className="btn-content">
            <Rss className="w-6 h-6" />
            Join Our Discord Server
          </span>
        </motion.a>

        {/* --- 3D Tilting Rules Card --- */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX: rotateXSpring, rotateY: rotateYSpring, perspective: 1000 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.8 }}
          className="mt-20 max-w-2xl w-full p-8 rounded-2xl glass-effect text-left"
        >
          <motion.div style={{ transform: 'translateZ(40px)' }}>
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="w-6 h-6 text-primary-400" />
              <h3 className="text-2xl font-bold text-white">Rules & Regulations</h3>
            </div>
            <ul className="space-y-3 text-gray-300 rules-list">
              {rules.map((rule, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {rule}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Community;