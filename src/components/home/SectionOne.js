'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import '@/styles/sections/section1.css';

// We use a high-quality free Pexels video for the impressive 8K slow-mo background
const VIDEO_URL = "https://videos.pexels.com/video-files/3752531/3752531-uhd_3840_2160_24fps.mp4"; // Generic high quality car details slow mo
const WRAPPED_VAN_URL = "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=2000"; // Generic stylized van

export default function SectionOne({ messages }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate position relative to the container
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate mask size - make it bigger on desktop, smaller on mobile
  const maskRadius = 250;

  return (
    <section className="hero-section" ref={containerRef}>
      {/* Background layer: High Def Video (Simulating the unwrapped state or installation process) */}
      <div className="hero-base-layer">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="hero-video"
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
        <div className="base-gradient-overlay" />
      </div>

      {/* Mask Layer: The "Wrapped" version / Scanner */}
      <motion.div
        className="hero-scanner-layer"
        animate={{
          WebkitMaskPosition: `${mousePosition.x - maskRadius}px ${mousePosition.y - maskRadius}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      >
        <div 
          className="wrapped-image-placeholder" 
          style={{ backgroundImage: `url(${WRAPPED_VAN_URL})` }} 
        />
        {/* Glow edge for the scanner */}
        <motion.div 
          className="scanner-ring"
          animate={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`
          }}
          transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
        />
      </motion.div>

      {/* Content Layer (z-index highest) */}
      <div className="hero-content-wrapper">
        <motion.div 
          className="hero-text-block"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <h1 className="hero-h1">Transformamos Metal en Activos de Marketing</h1>
          <p className="hero-subtext">Diseño de envolturas de alta gama para quienes no aceptan la mediocridad. Desde flotas corporativas hasta Food Trucks premiados.</p>
        </motion.div>
      </div>
    </section>
  );
}
