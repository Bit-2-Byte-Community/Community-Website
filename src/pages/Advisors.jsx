import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Briefcase } from 'lucide-react';

// Data extracted from your screenshot
const advisorsData = [
  { name: 'Kunal Singh', batch: '2019', company: 'Innoraft', image: 'https://media.licdn.com/dms/image/v2/D5603AQGOmvgICynBow/profile-displayphoto-scale_200_200/B56ZkG99tAG4Ac-/0/1756758531689?e=1770249600&v=beta&t=ktwfYJks5cahVovJ8z6yycr7QFH-naKDshWi2k23s-Y' },
  { name: 'Saswata Mukhopadhyay', batch: '2021', company: 'TCS iON', image: 'https://media.licdn.com/dms/image/v2/D5603AQF5WnveiRQnmQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1688663275546?e=1770249600&v=beta&t=iO0qauuztkWOsTqaBZnQWKhDVMkXM-Jo3uajiw3kuPI' },
  { name: 'Prithviraj Biswas', batch: '2022', company: 'Infogain', image: 'https://media.licdn.com/dms/image/v2/D5603AQHJ5uTmfpqtSg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1713251452987?e=1770249600&v=beta&t=LexthU5UFXFSdAw8joHdW70DiyIk9IZq0MIsF0ukA2g' },
  { name: 'Abir Ganguly', batch: '2024', company: 'Accenture', image: 'https://media.licdn.com/dms/image/v2/D4D03AQGnftXQE4reyQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1727411652299?e=1770249600&v=beta&t=60QRZGWeuqjIPsJy9DifxXgVJPoIfyD16RK-HX0mgzU' },
  { name: 'Adarsh Pandey', batch: '2024', company: 'Index Engines', image: 'https://media.licdn.com/dms/image/v2/D4D03AQEprs86gCZlIA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1715879857986?e=1770249600&v=beta&t=gWC9AIuiMJEmqdQdIfYn_TXj7w9CiR72mZmqdcGhFzQ' },
  { name: 'Rajib Lochan Nandi', batch: '2024', company: 'TCS', image: 'https://media.licdn.com/dms/image/v2/D5603AQGDDW_42M_XjQ/profile-displayphoto-shrink_200_200/B56ZRrjxKPHsAg-/0/1736971327136?e=1770249600&v=beta&t=1onsVF0_tvGFmlerPaej3OBqd88Rks-QW2wwzj9BiZ4' },
  { name: 'Ishanjit Mukhopadhyay', batch: '2025', company: 'LTIMindtree', image: 'https://media.licdn.com/dms/image/v2/D5603AQFw4Zsd__CKaw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1722106951643?e=1770249600&v=beta&t=b7-DLfSADJLRdCprqEfHQrKN5UzuG8K2Ne0Fq1vgfVM' },
];

// --- 3D Parallax Card Component ---
const AdvisorCard = ({ advisor }) => {
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateXSpring = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 300, damping: 20 });
  const rotateYSpring = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 300, damping: 20 });

  const avatarX = useTransform(x, [-100, 100], [-15, 15]);
  const avatarY = useTransform(y, [-100, 100], [-15, 15]);
  const textX = useTransform(x, [-100, 100], [10, -10]);
  const textY = useTransform(y, [-100, 100], [10, -10]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  }

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX: rotateXSpring, rotateY: rotateYSpring, perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // UPDATED: Replaced gradient-border with frosted-card and removed card-hover-glow
      className="frosted-card p-6 rounded-2xl text-center flex flex-col items-center h-full"
    >
      <motion.div
        style={{ x: avatarX, y: avatarY }}
        className="w-24 h-24 rounded-full mb-4 border-2 border-primary-500/50 overflow-hidden bg-dark-400 flex items-center justify-center"
      >
        {advisor.image ? (
          <img
            src={advisor.image}
            alt={advisor.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <span className="text-cyan-300 text-3xl font-bold">
            {getInitials(advisor.name)}
          </span>
        )}
      </motion.div>
      <motion.div style={{ x: textX, y: textY }} className="flex flex-col items-center">
        <h3 className="text-xl font-bold text-white">{advisor.name}</h3>
        <p className="text-sm text-gray-400 mb-3">Batch of {advisor.batch}</p>
        <div className="flex items-center gap-2 text-sm text-cyan-300">
          <Briefcase className="w-4 h-4" />
          <span>{advisor.company}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Main Advisors Page Component ---
const Advisors = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen pt-40 pb-20 overflow-x-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent title-glow">
            Hall of Fame
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            The Advisors of Bit-2-Byte have been the guiding force behind the community and shaping the vision. Without them the Bit-2-Byte community would have never been successful in achieving its vision.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {advisorsData.map((advisor, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, scale: 0.5, x: 0, y: 0 },
                visible: { opacity: 1, scale: 1, transition: { type: 'spring', damping: 15, stiffness: 100 } },
              }}
            >
              <AdvisorCard advisor={advisor} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Advisors;