"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import signature from "./Signatur.glb";
import { animated, useSpring, config } from "react-spring";

function SignatureModel({ url, scrollOffset }) {
  const gltf = useGLTF(url);
  const ref = useRef();

  // Set all meshes to red
  gltf.scene.traverse((child) => {
    if (child.isMesh && child.material) {
      child.material.color.set("#ffb200");
    }
  });

  // Floating, rotating, and parallax animation
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();

      // Base rotations + subtle oscillation
      ref.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.6) * 0.05 + scrollOffset * 0.001;
      ref.current.rotation.y = Math.sin(t * 0.4) * 0.05 + scrollOffset * 0.0015;
      ref.current.rotation.z = Math.sin(t * 0.8) * 0.05;

      // Floating + parallax
      ref.current.position.y = Math.sin(t * 1) * 0.2 + scrollOffset * 0.005;
      ref.current.position.x = Math.sin(t * 0.6) * 0.1 + scrollOffset * 0.002;
      ref.current.position.z = Math.sin(t * 0.8) * 0.1;
    }
  });

  // Force position and scale
  gltf.scene.position.set(0, 0, 0);
  gltf.scene.scale.set(650, 650, 650);

  return <primitive ref={ref} object={gltf.scene} />;
}

export default function HeroSection() {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  // Track scroll relative to section
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        setOffset(sectionCenter - viewportCenter);
      }
    };

    handleScroll(); // initial
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Canvas parallax (slight shift for Apple-style effect)
  const canvasParallax = useSpring({
    transform: `translateY(${offset * 0.03}px)`,
    config: config.slow,
  });

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex items-center justify-center h-screen bg-white overflow-hidden"
    >
      <animated.div style={canvasParallax} className="w-full h-full">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }} className="w-full h-full">
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 10]} intensity={10} />
          <directionalLight position={[-10, 10, 5]} intensity={0.5} />
          <hemisphereLight skyColor="white" groundColor="gray" intensity={0.3} />

          <SignatureModel url={signature} scrollOffset={offset} />
        </Canvas>
      </animated.div>
    </section>
  );
}
