import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { AnimationMixer } from 'three';

const Scene = ({ animationProgress }) => {
  const gltf = useLoader(GLTFLoader, '/artworkcan.glb'); // Ensure path is correct
  const mixer = useRef();
  const action = useRef();

  useEffect(() => {
    if (gltf.animations.length > 0) {
      mixer.current = new AnimationMixer(gltf.scene);
      action.current = mixer.current.clipAction(gltf.animations[2]);
      action.current.play();
    }
  }, [gltf]);

  // Use the `animationProgress` prop to set the animation time based on scroll
  useEffect(() => {
    if (action.current) {
      action.current.time = animationProgress * action.current.getClip().duration;
      mixer.current.update(0); // Required to refresh the animation frame
    }
  }, [animationProgress]);

  return <primitive object={gltf.scene} />;
};

const ThreeCanvas = () => {
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollMax = document.body.scrollHeight - window.innerHeight;

      // Calculate progress as a value between 0 and 1 based on scroll position
      const progress = Math.min(1, Math.max(0, scrollY / scrollMax));
      setAnimationProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Canvas style={{ width: '100vw', height: '100vh' }}>
      <ambientLight intensity={10} /> {/* Adjusted to intensity of 10 */}
      <directionalLight position={[5, 5, 5]} intensity={10} /> {/* Adjusted to intensity of 10 */}
      <pointLight position={[-5, 5, 5]} intensity={1} /> {/* Optional: adjust as needed */}
      <Scene animationProgress={animationProgress} />
    </Canvas>
  );
};

export default ThreeCanvas;
