import React, { useRef, useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { AnimationMixer } from 'three';

const Scene = ({ animationProgress }) => {
  const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + '/artworkcan.glb');
  const mixer = useRef();
  const action = useRef();

  useEffect(() => {
    if (gltf.animations.length > 0) {
      mixer.current = new AnimationMixer(gltf.scene);
      action.current = mixer.current.clipAction(gltf.animations[2]);
      action.current.play();
    }
  }, [gltf]);

  useEffect(() => {
    if (action.current) {
      action.current.time = animationProgress * action.current.getClip().duration;
      mixer.current.update(0);
    }
  }, [animationProgress]);

  return <primitive object={gltf.scene} />;
};

const ThreeCanvas = ({ animationProgress, setAnimationProgress }) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const targetScroll = 500;
      const progress = Math.min(1, Math.max(0, scrollY / targetScroll));
      setAnimationProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setAnimationProgress]);

  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0, // Ensures canvas is above sections but behind other content
        pointerEvents: 'none',
      }}
    >
      <ambientLight intensity={10} />
      <directionalLight position={[5, 5, 5]} intensity={10} />
      <pointLight position={[-5, 5, 5]} intensity={1} />
      <Scene animationProgress={animationProgress} />
    </Canvas>
  );
};

export default ThreeCanvas;
