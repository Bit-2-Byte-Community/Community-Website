import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Target, Zap, BrainCircuit } from 'lucide-react';

const About = () => {
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Use useSpring for a smoother, more natural return animation
  const rotateXSpring = useSpring(useTransform(y, [-150, 150], [15, -15]), { stiffness: 400, damping: 90 });
  const rotateYSpring = useSpring(useTransform(x, [-150, 150], [-15, 15]), { stiffness: 400, damping: 90 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX - width / 2);
    y.set(mouseY - height / 2);

    // For the shine effect
    cardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
    cardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    // Reset shine position
    cardRef.current.style.setProperty("--mouse-x", `50%`);
    cardRef.current.style.setProperty("--mouse-y", `50%`);
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  return (
    <section id="about" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.3 }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* Left Column: Text Content */}
          <motion.div variants={cardVariants}>
             <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white relative">
              About <span className="bg-gradient-to-r from-primary-400 to-cyan-400 bg-clip-text text-transparent">Bit2Byte</span>
              <span className="absolute -bottom-2 left-0 w-24 h-1 bg-primary-500 rounded-full"></span>
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              At Bit2Byte, we are architects of the digital future. Our team of expert developers and creative thinkers is dedicated to pushing the boundaries of innovation, transforming complex challenges into elegant, high-performance solutions.
            </p>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-dark-400/50 rounded-lg mt-1 glass-effect border border-gray-700">
                  <Target className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-xl">Our Mission</h3>
                  <p className="text-gray-400">To engineer elegant, high-performance digital solutions that empower our clients and captivate their users.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-dark-400/50 rounded-lg mt-1 glass-effect border border-gray-700">
                  <Zap className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-xl">Our Vision</h3>
                  <p className="text-gray-400">To be a leading force in next-generation technology, pioneering new possibilities in the digital landscape.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Interactive Card (FIXED) */}
          <motion.div
            ref={cardRef}
            variants={cardVariants}
            style={{ 
              rotateX: rotateXSpring, // Use the spring-animated value
              rotateY: rotateYSpring, // Use the spring-animated value
              perspective: 1000 
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full h-[420px] rounded-3xl p-8 flex items-center justify-center gradient-border relative card-bg-gradient"
          >
            {/* REMOVED: drag, dragElastic, dragConstraints, whileTap, and cursor-grab */}
            <div className="card-shine" />
            <div style={{ transform: 'translateZ(60px)' }} className="text-center relative pointer-events-none">
              <BrainCircuit className="w-20 h-20 mx-auto text-cyan-300 mb-4 opacity-80" />
              <h3 className="text-3xl font-bold text-white mb-2">
                Creative Technologists
              </h3>
              <p className="text-gray-300 max-w-xs">
                A dedicated team of passionate builders and problem solvers, turning ideas into reality.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;