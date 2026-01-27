import React from 'react';
import { motion } from 'framer-motion';
import { User, Linkedin, Mail } from 'lucide-react';

const facultyData = [
  { 
    name: 'Dr. Mahamuda Sultana', 
    title: 'Dept. of Computer Science Engineering (CSE)', 
    image: 'https://media.licdn.com/dms/image/v2/D5603AQG67AibWRr7Lg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1714373474088?e=1770854400&v=beta&t=FGFrpgwLM91ccL0ne_ZivmPivOfynVvghoVo5lBIkIc',
    linkedin: 'https://www.linkedin.com/in/mahamuda-sultana/',
    email: 'mahamuda.sultana@example.com'
  },
  { 
    name: 'Mr. Tridib Chakraborty', 
    title: 'Dept. of Information Technology (IT)', 
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQF7oL4rSI3LuQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1674567537767?e=1770854400&v=beta&t=Z34LLUT_f6Y7VmDN9-E8N-s5U-39OAdWOgd9KJ7_UOo',
    linkedin: 'https://www.linkedin.com/in/tridib-chakraborty-5617ab35/',
    email: 'tridib.chakraborty@example.com'
  },
];

const FacultyCard = ({ name, title, image, linkedin, email }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative group"
    >
      {/* Animated Gradient Border Card */}
      <div className="relative p-1 rounded-2xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl">
        {/* Animated Gradient Border */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow" />
        
        {/* Background Blur Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
        
        {/* Card Content */}
        <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-xl p-8 border border-gray-700/50 group-hover:border-transparent transition-all duration-500">
          <div className="card-content flex flex-col items-center text-center">
            {/* Enhanced Profile Image */}
            <div className="profile-image-container">
              <div className="w-full h-full rounded-full bg-dark-400 flex items-center justify-center overflow-hidden">
                {image === '#' ? (
                  <User className="w-16 h-16 text-gray-400" />
                ) : (
                  <img src={image} alt={name} className="w-full h-full object-cover rounded-full" />
                )}
              </div>
            </div>

            {/* Name and Title */}
            <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
            <p className="text-blue-200/80 mb-6 leading-relaxed">{title}</p>

            {/* Enhanced Social Links with Better Colors */}
            <div className="flex gap-4">
              <motion.a
                href={linkedin}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="social-icon linkedin-enhanced"
              >
                <Linkedin size={20} />
              </motion.a>
              
              <motion.a
                href={`mailto:${email}`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="social-icon gmail-enhanced"
              >
                <Mail size={20} />
              </motion.a>
            </div>
          </div>
        </div>
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
      className="min-h-screen pt-32 pb-20 overflow-hidden relative"
    >
      {/* Background remains transparent for particles */}
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto mb-16 relative"
        >
          {/* Enhanced Glitch Text with Background Dimming */}
          <div className="relative inline-block">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 glitch-text-blue"
              data-text="Faculty Co-ordinators"
              style={{
                color: '#3b82f6',
              }}
            >
              Faculty Co-ordinators
              <span className="glitch-layer-1">Faculty Co-ordinators</span>
              <span className="glitch-layer-2">Faculty Co-ordinators</span>
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto"
          >
            The Faculty Co-ordinators of Bit-2-Byte has been very helpful to us be it decision making, event permissions or helping us out in times of crisis. Without them our vision for community development would not have been possible.
          </motion.p>
        </motion.div>

        {/* Faculty Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.3 }}
        >
          {facultyData.map((faculty, index) => (
            <motion.div 
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { 
                    type: "spring", 
                    duration: 0.8,
                    delay: index * 0.2 
                  } 
                }
              }}
              className="flex justify-center"
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