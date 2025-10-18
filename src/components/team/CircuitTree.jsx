import React, { useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// --- STABLE ANIMATED LINE COMPONENT ---
// This version is optimized for visual impact.
const AnimatedLine = ({ points, delay, depth }) => {
  const lineRef = useRef();
  // Using a simple time-based animation loop within useFrame is the most stable method.
  const startTime = useRef(performance.now() + delay);
  const duration = 1200; // Animation duration in milliseconds.

  useFrame(({ clock }) => {
    if (!lineRef.current) return;
    
    const elapsedTime = clock.getElapsedTime() * 1000 - startTime.current;
    if (elapsedTime < 0) return; // Wait for delay to pass.

    const progress = Math.min(elapsedTime / duration, 1);
    
    // Calculate how many points of the line to show based on progress.
    const visiblePointsCount = Math.floor(progress * points.length);
    const currentPoints = points.slice(0, visiblePointsCount);

    // This is the correct and stable way to update a line's geometry.
    if (currentPoints.length > 1) {
      lineRef.current.geometry.setFromPoints(currentPoints);
    }
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry />
      {/* The material determines the line's appearance. */}
      <lineBasicMaterial 
        color="#00ffff" // A bright cyan color
        linewidth={Math.max(1, 5 - depth * 1.2)} // Trunk is thick, twigs are thin.
        transparent 
        opacity={0.8} 
      />
    </line>
  );
};

// Component for subtle camera movement based on mouse position.
const CameraRig = () => {
  useFrame((state, delta) => {
    state.camera.position.lerp(
      new THREE.Vector3(-state.pointer.x, -state.pointer.y * 0.5, 15),
      delta * 0.8
    );
    state.camera.lookAt(0, -2, 0); // Look slightly down towards the trunk's origin.
  });
  return null;
};

// The main component that generates and renders the tree structure.
export const CircuitTree = () => {
  // useMemo ensures this complex calculation runs only once.
  const branches = useMemo(() => {
    const allBranches = [];
    let delayCounter = 0;

    // --- The New Recursive Tree Generation Algorithm ---
    const generateBranch = (startPoint, direction, depth, maxDepth) => {
      if (depth > maxDepth) return;

      // --- KEY FIX: INCREASED LENGTH FOR A MUCH LARGER TREE ---
      const length = 5 * Math.pow(0.75, depth); 
      const endPoint = new THREE.Vector3().addVectors(startPoint, direction.clone().multiplyScalar(length));

      // Create a smooth curve (spline) for an organic look.
      const midPoint = new THREE.Vector3().lerpVectors(startPoint, endPoint, 0.5);
      midPoint.x += (Math.random() - 0.5) * length * 0.8;
      const curve = new THREE.CatmullRomCurve3([startPoint, midPoint, endPoint]);
      const points = curve.getPoints(50); // High point count for a smooth line.

      allBranches.push({
        id: `branch-${depth}-${Math.random()}`,
        points: points,
        depth: depth,
        delay: (delayCounter += 60),
      });
      
      if (depth === maxDepth) return;
      
      const numChildren = depth === 0 ? 3 : (depth < 2 ? 3 : 2);

      for (let i = 0; i < numChildren; i++) {
        const newDirection = direction.clone();
        // --- KEY FIX: WIDER SPREAD ANGLE ---
        const angle = (Math.random() - 0.5) * (Math.PI / 1.5) / (depth + 1);
        const axis = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, 0).normalize();
        newDirection.applyAxisAngle(axis, angle);
        
        generateBranch(endPoint, newDirection, depth + 1, maxDepth);
      }
    };

    // Start the tree far below the screen so it grows into view.
    const rootStart = new THREE.Vector3(0, -9, 0);
    const rootDirection = new THREE.Vector3(0, 1, 0);
    generateBranch(rootStart, rootDirection, 0, 4);

    return allBranches;
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 75 }} // Wider field of view
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1, // Stays behind all HTML content.
      }}
    >
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 15]} intensity={5.0} color="#00ffff" />

      <Suspense fallback={null}>
        <CameraRig />
        {branches.map((branch) => (
          <AnimatedLine key={branch.id} {...branch} />
        ))}
      </Suspense>

      {/* --- KEY FIX: POST-PROCESSING FOR GLOW --- */}
      <EffectComposer>
        <Bloom 
          luminanceThreshold={0.1} // Lower threshold to make more things glow
          intensity={0.85}          // The strength of the glow
          mipmapBlur={true}         // Smoother bloom effect
        />
      </EffectComposer>
    </Canvas>
  );
};