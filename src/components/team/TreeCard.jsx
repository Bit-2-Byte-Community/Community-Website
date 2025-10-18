import React from 'react';
import { Html } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/web';
import styled from 'styled-components';

const StyledCard = styled(animated.div)`
  width: 200px;
  background: rgba(10, 25, 47, 0.85);
  border: 1px solid rgba(56, 189, 248, 0.5);
  border-radius: 12px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: #e0f2fe;
  font-family: 'Inter', sans-serif;
  text-align: center;
  padding: 16px;
  box-shadow: 0 0 25px rgba(56, 189, 248, 0.6), inset 0 0 10px rgba(103, 232, 249, 0.5);
  pointer-events: auto;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px) scale(1.05);
    box-shadow: 0 0 40px rgba(56, 189, 248, 0.9), inset 0 0 15px rgba(103, 232, 249, 0.7);
  }
`;

const CardName = styled.div`
  font-weight: 700;
  color: #f0f9ff;
  font-size: 1em;
  margin-bottom: 6px;
`;

const CardRole = styled.div`
  font-size: 0.8em;
  color: #7dd3fc;
`;

const TreeCard = ({ position, member, delay }) => {
  // --- THIS IS THE KEY FIX ---
  // If member data is not available, do not render anything.
  if (!member) {
    return null;
  }

  const spring = useSpring({
    from: { opacity: 0, transform: `translateY(-30px) scale(0.7)` },
    to: { opacity: 1, transform: `translateY(0px) scale(1)` },
    delay: delay,
    config: { mass: 1, tension: 150, friction: 20 },
  });

  return (
    <Html 
      position={position} 
      center 
      occlude="blending"
      distanceFactor={12}
      zIndexRange={[100, 0]}
    >
      <StyledCard style={spring}>
        <CardName>{member.name}</CardName>
        <CardRole>{member.role}</CardRole>
      </StyledCard>
    </Html>
  );
};

export default TreeCard;