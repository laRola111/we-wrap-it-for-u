'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '@/styles/sections/arknica-hero.css';

export default function WrapHero({ msg = {} }) {
  const scannerRef = useRef(null);

  const m = msg || {};

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const el = scannerRef.current;
    if (!el) return;

    // En web usamos mask-image, pero en móvil clipPath es 100x más rápido y no genera parpadeos blancos.
    el.style.opacity = '1';
    
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      el.style.clipPath = 'circle(50px at 50% 50%)';
      el.style.WebkitClipPath = 'circle(50px at 50% 50%)';
      el.style.maskImage = 'none';
      el.style.WebkitMaskImage = 'none';
    } else {
      el.style.WebkitMaskImage = 'radial-gradient(circle 50px at 50% 50%, black 90%, transparent 100%)';
      el.style.maskImage       = 'radial-gradient(circle 50px at 50% 50%, black 90%, transparent 100%)';
      el.style.clipPath = 'none';
      el.style.WebkitClipPath = 'none';
    }

    const hero = el.closest('.wrap-hero');
    if (!hero) return;

    let ticking = false;
    let lastScrollY = window.scrollY;
    
    // Pre-calculate expensive math that only changes on resize
    let heroH = hero.offsetHeight;
    let maxR = Math.hypot(window.innerWidth, window.innerHeight);
    let cx = Math.round(window.innerWidth / 2);
    let cy = Math.round(window.innerHeight / 2);

    const updateMask = () => {
      const scrolled = Math.min(lastScrollY, heroH);
      const progress = scrolled / heroH;
      const radius = Math.round(50 + progress * maxR);
      
      if (window.innerWidth <= 768) {
        // Usa clipPath hardware accelerated para móviles 
        const clip = `circle(${radius}px at ${cx}px ${cy}px)`;
        el.style.clipPath = clip;
        el.style.WebkitClipPath = clip;
      } else {
        // Usa maskImage para webs (suavizado)
        const grad = `radial-gradient(circle ${radius}px at ${cx}px ${cy}px, black 90%, transparent 100%)`;
        el.style.WebkitMaskImage = grad;
        el.style.maskImage       = grad;
      }
      
      ticking = false;
    };

    const onScroll = () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(updateMask);
        ticking = true;
      }
    };

    const onResize = () => {
      heroH = hero.offsetHeight;
      maxR = Math.hypot(window.innerWidth, window.innerHeight);
      cx = Math.round(window.innerWidth / 2);
      cy = Math.round(window.innerHeight / 2);
      onScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    
    // Initial call
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
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
          <span className="hero-eyebrow">{m.eyebrow || 'Rotulación de Élite · Vehicle Wrapping'}</span>
          <h1 className="hero-h1">
            {m.title1 || 'No es solo un vehículo.'}<br />
            <span className="hero-accent">{m.titleAccent || 'Es tu declaración'}</span><br />
            {m.title2 || 'de intenciones.'}
          </h1>
          <p className="hero-sub">
            {m.sub || 'En We Wrap It For U fusionamos diseño de vanguardia con instalación de precisión milimétrica. Transformamos metal en una extensión de tu identidad o de tu éxito comercial.'}
          </p>
          <div className="hero-buttons">
            <a href="#galeria" className="btn-primary" data-hoverable="true">
              {m.btnPrimary || 'Ver Galería de Transformaciones'}
            </a>
            <a href="#lab" className="btn-ghost" data-hoverable="true">
              {m.btnGhost || 'Configurar mi Proyecto →'}
            </a>
          </div>
          <p className="hero-hint">{m.hint || '↓ Scroll para revelar'}</p>
        </motion.div>
      </div>

      <div className="blade-cut" />
    </section>
  );
}
