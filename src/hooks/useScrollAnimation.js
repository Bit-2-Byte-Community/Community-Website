import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

export const useScrollAnimation = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Creates a 3D perspective tilt effect on scroll
  const rotateX = useTransform(scrollYProgress, [0, 1], ['-15deg', '15deg']);
  // Fades the section in and out at the edges of the viewport
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
   // Scales the section up as it enters the center of the screen
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return { ref, style: { rotateX, opacity, scale } };
};