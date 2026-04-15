'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '@/styles/sections/arknica-hero.css';

export default function WrapHero() {
  const scannerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const el = scannerRef.current;
    if (!el) return;

    // Set initial mask via JS (avoids cssnano crash)
    el.style.opacity = '1';
    el.style.WebkitMaskImage = 'radial-gradient(circle 50px at 50% 50%, black 90%, transparent 100%)';
    el.style.maskImage       = 'radial-gradient(circle 50px at 50% 50%, black 90%, transparent 100%)';

    const hero = el.closest('.wrap-hero');
    if (!hero) return;

    const onScroll = () => {
      const heroH   = hero.offsetHeight;
      const scrolled = Math.min(window.scrollY, heroH);
      const progress = scrolled / heroH;

      const maxR   = Math.hypot(window.innerWidth, window.innerHeight);
      const radius = Math.round(50 + progress * maxR);
      const cx     = Math.round(window.innerWidth / 2);
      const cy     = Math.round(window.innerHeight / 2);

      const grad = `radial-gradient(circle ${radius}px at ${cx}px ${cy}px, black 90%, transparent 100%)`;
      el.style.WebkitMaskImage = grad;
      el.style.maskImage       = grad;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="wrap-hero">
      <div className="hero-base" style={{ backgroundImage: 'url(/bg-hero-1.png)' }} />
      <div className="hero-vignette" />

      <div className="hero-scanner scroll-reveal" ref={scannerRef}>
        <div className="hero-reveal" style={{ backgroundImage: 'url(/bg-hero-2.png)' }} />
      </div>

      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="hero-text"
        >
          <span className="hero-eyebrow">Rotulación de Élite · Vehicle Wrapping</span>
          <h1 className="hero-h1">
            No es solo un vehículo.<br />
            <span className="hero-accent">Es tu declaración</span><br />
            de intenciones.
          </h1>
          <p className="hero-sub">
            En We Wrap It For U fusionamos diseño de vanguardia con instalación de
            precisión milimétrica. Transformamos metal en una extensión de tu identidad
            o de tu éxito comercial.
          </p>
          <div className="hero-buttons">
            <a href="#galeria" className="btn-primary" data-hoverable="true">
              Ver Galería de Transformaciones
            </a>
            <a href="#lab" className="btn-ghost" data-hoverable="true">
              Configurar mi Proyecto →
            </a>
          </div>
          <p className="hero-hint">↓ Scroll para revelar</p>
        </motion.div>
      </div>

      <div className="blade-cut" />
    </section>
  );
}
