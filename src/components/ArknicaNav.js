'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '@/styles/navbar.css';

const proyectosMenu = [
  { label: 'Carros de Lujo', href: '#servicios' },
  { label: 'Vans Comerciales', href: '#servicios' },
  { label: 'Food Trucks', href: '#foodtruck' },
];

export default function ArknicaNav({ locale = 'es', msg = {} }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [proyectosOpen, setProyectosOpen] = useState(false);

  // Fallback in case msg is missing
  const m = msg || {};
  
  const proyectosMenu = [
    { label: m.luxury || 'Carros de Lujo', href: '#servicios' },
    { label: m.vans || 'Vans Comerciales', href: '#servicios' },
    { label: m.foodtrucks || 'Food Trucks', href: '#foodtruck' },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const switchLocale = locale === 'es' ? 'en' : 'es';

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
          <span>{m.projects || 'Proyectos ▾'}</span>
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

        <a href="#taller">{m.workshop || 'El Taller'}</a>
        <a href="#materiales">{m.materials || 'Materiales'}</a>
        <a href="#proceso">{m.process || 'Proceso'}</a>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Language Switcher */}
        <a 
          href={`/${switchLocale}`} 
          style={{ 
            color: 'white', 
            fontWeight: 'bold', 
            textDecoration: 'none', 
            fontSize: '0.8rem',
            padding: '0.5rem 0.8rem',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '4px',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => { e.target.style.background = 'white'; e.target.style.color = 'black'; }}
          onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'white'; }}
        >
          {switchLocale.toUpperCase()}
        </a>

        {/* CTA */}
        <a href="#cotizar" className="nav-cta" data-hoverable="true">
          {m.quote || 'Solicitar Presupuesto'}
        </a>

        {/* Mobile toggle */}
        <button className="hamburger" onClick={() => setMobileOpen(o => !o)} aria-label="Menú">
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <a href="#galeria" onClick={() => setMobileOpen(false)}>{m.luxury || 'Carros de Lujo'}</a>
            <a href="#galeria" onClick={() => setMobileOpen(false)}>{m.vans || 'Vans Comerciales'}</a>
            <a href="#foodtruck" onClick={() => setMobileOpen(false)}>{m.foodtrucks || 'Food Trucks'}</a>
            <a href="#taller" onClick={() => setMobileOpen(false)}>{m.workshop || 'El Taller'}</a>
            <a href="#materiales" onClick={() => setMobileOpen(false)}>{m.materials || 'Materiales'}</a>
            <a href="#proceso" onClick={() => setMobileOpen(false)}>{m.process || 'Proceso'}</a>
            <a href="#cotizar" className="mobile-cta" onClick={() => setMobileOpen(false)}>{m.quote || 'Solicitar Presupuesto'}</a>
            <a href={`/${switchLocale}`} className="mobile-cta" style={{ background: '#333', color: 'white' }} onClick={() => setMobileOpen(false)}>
              Cambiar a {switchLocale.toUpperCase() === 'EN' ? 'English' : 'Español'}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
