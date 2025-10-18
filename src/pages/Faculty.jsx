import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { User } from 'lucide-react';

const facultyData = [
  { name: 'Dr. Mahamuda Sultana', title: 'Dept. of Computer Science Engineering (CSE)', image: '#' },
  { name: 'Mr. Tridib Chakraborty', title: 'Dept. of Information Technology (IT)', image: '#' },
];

const FacultyCard = ({ name, title, image }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateXSpring = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 300, damping: 40 });
  const rotateYSpring = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 300, damping: 40 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX: rotateXSpring, rotateY: rotateYSpring, perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05, y: -10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="gradient-border p-8 rounded-2xl text-center card-bg-gradient flex flex-col items-center card-hover-glow"
    >
      <div style={{ transform: 'translateZ(40px)' }} className="pointer-events-none">
        <div className="w-40 h-40 rounded-full mb-6 bg-dark-400 border-2 border-primary-500/50 flex items-center justify-center">
          {image === '#' ? (<User className="w-20 h-20 text-gray-500" />) : (<img src={image} alt={name} className="w-full h-full object-cover rounded-full" />)}
        </div>
        <h3 className="text-2xl font-bold text-white">{name}</h3>
        <p className="text-primary-300">{title}</p>
      </div>
    </motion.div>
  );
};

const Faculty = () => {
  const titleText = "Faculty Co-ordinators";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen pt-40 pb-20 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1
            className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent glitch-text"
            data-text={titleText}
          >
            {titleText}
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-lg text-gray-300 leading-relaxed"
          >
            The Faculty Co-ordinators of Bit-2-Byte has been very helpful to us be it decision making, event permissions or helping us out in times of crisis. Without them our vision for community development would not have been possible.
          </motion.p>
        </motion.div>

        <motion.div 
          className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12 max-w-5xl mx-auto relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.3 }}
        >
          <svg className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 -z-10 hidden md:block" aria-hidden="true">
            <motion.path
              d="M0 0.5L1000 0.5"
              stroke="url(#line-gradient)" strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
              viewport={{ once: true }}
            />
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0" />
                <stop offset="50%" stopColor="#0ea5e9" stopOpacity="1" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          
          {facultyData.map((faculty, index) => (
            <motion.div 
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.9 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", duration: 0.8 } }
              }}
            >
              <FacultyCard {...faculty} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Faculty;