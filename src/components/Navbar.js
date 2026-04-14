'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import '@/styles/navbar.css';

const Navbar = ({ locale, messages }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = messages?.navbar || {};
  const otherLocale = locale === 'es' ? 'en' : 'es';
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar-floating glass-panel-15">
      <div className="nav-content">
        {/* Logo 3D Rotation Hover & Metallic Shine */}
        <Link href={`/${locale}`} className="nav-logo-container" data-hoverable="true">
          <motion.div
            className="logo-wrapper"
            whileHover={{ rotateY: 15, rotateX: 5, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="logo-shine" />
            <img src="/logo.png" alt="We Wrap It For U" className="main-logo" />
          </motion.div>
        </Link>

        {/* Mobile Toggle */}
        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle Menu">
          ☰
        </button>

        {/* Desktop Links */}
        <div className={`menu ${menuOpen ? 'open' : ''}`}>
          <Link href={`/${locale}/services`} onClick={() => setMenuOpen(false)} className="neon-link">
            <span>Explorar Estilos</span>
            <div className="neon-blob" />
          </Link>
          <Link href={`/${locale}/design-lab`} onClick={() => setMenuOpen(false)} className="neon-link">
            <span>Configurador 3D</span>
            <div className="neon-blob" />
          </Link>
          <Link href={`/${locale}/verticals`} onClick={() => setMenuOpen(false)} className="neon-link">
            <span>Flotas y Food Trucks</span>
            <div className="neon-blob" />
          </Link>
          <Link href={`/${locale}/about`} onClick={() => setMenuOpen(false)} className="neon-link">
            <span>Proceso Pro</span>
            <div className="neon-blob" />
          </Link>

          {/* Liquid Gradient CTA */}
          <a
            href="https://wa.me/5215555555555"
            target="_blank"
            rel="noopener noreferrer"
            className="wsp-btn-liquid"
            data-hoverable="true"
          >
            Cotización Express
          </a>

          {/* Language Toggle */}
          <Link href={`/${otherLocale}`} onClick={() => setMenuOpen(false)} className="lang-toggle neon-link">
            <span>{otherLocale.toUpperCase()}</span>
            <div className="neon-blob" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
