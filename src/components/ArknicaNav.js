'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '@/styles/navbar.css';

const proyectosMenu = [
  { label: 'Carros de Lujo', href: '#servicios' },
  { label: 'Vans Comerciales', href: '#servicios' },
  { label: 'Food Trucks', href: '#foodtruck' },
];

export default function ArknicaNav({ locale = 'es' }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [proyectosOpen, setProyectosOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav className={`arknica-nav${scrolled ? ' nav-scrolled' : ''}`}>
      <a href={`/${locale}`} className="nav-logo">
        <img
          src="/logo.png"
          alt="We Wrap It For U"
          style={{
            height: '48px',
            maxHeight: '48px',
            width: 'auto',
            maxWidth: '200px',
            objectFit: 'contain',
            display: 'block',
            /* multiply blends white away on dark backgrounds — logo colors stay intact */
            mixBlendMode: 'multiply',
          }}
        />
      </a>

      {/* Desktop Links */}
      <div className="nav-links desktop-links">
        {/* Proyectos dropdown */}
        <div
          className="dropdown-trigger"
          onMouseEnter={() => setProyectosOpen(true)}
          onMouseLeave={() => setProyectosOpen(false)}
        >
          <span>Proyectos ▾</span>
          <AnimatePresence>
            {proyectosOpen && (
              <motion.div
                className="dropdown-menu"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                {proyectosMenu.map(item => (
                  <a key={item.label} href={item.href}>{item.label}</a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <a href="#taller">El Taller</a>
        <a href="#materiales">Materiales</a>
        <a href="#proceso">Proceso</a>
      </div>

      {/* CTA */}
      <a href="#cotizar" className="nav-cta" data-hoverable="true">
        Solicitar Presupuesto
      </a>

      {/* Mobile toggle */}
      <button className="hamburger" onClick={() => setMobileOpen(o => !o)} aria-label="Menú">
        {mobileOpen ? '✕' : '☰'}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <a href="#galeria" onClick={() => setMobileOpen(false)}>Carros de Lujo</a>
            <a href="#galeria" onClick={() => setMobileOpen(false)}>Vans Comerciales</a>
            <a href="#foodtruck" onClick={() => setMobileOpen(false)}>Food Trucks</a>
            <a href="#taller" onClick={() => setMobileOpen(false)}>El Taller</a>
            <a href="#materiales" onClick={() => setMobileOpen(false)}>Materiales</a>
            <a href="#proceso" onClick={() => setMobileOpen(false)}>Proceso</a>
            <a href="#cotizar" className="mobile-cta" onClick={() => setMobileOpen(false)}>Solicitar Presupuesto</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
