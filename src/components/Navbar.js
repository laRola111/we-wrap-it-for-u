'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import '@/styles/navbar.css';

const Navbar = ({ locale, messages }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);  // Estado para visibilidad
  const [lastScrollY, setLastScrollY] = useState(0);  // Para detectar el scroll
  const pathname = usePathname();
  const t = messages?.navbar || {}; // Por si no viene aún

  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {  // Si estamos bajando
        setIsVisible(false);  // Ocultamos el navbar
      } else {  // Si estamos subiendo
        setIsVisible(true);  // Mostramos el navbar
      }
      setLastScrollY(window.scrollY);

      // Resetear visibilidad después de unos segundos de inactividad
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (window.scrollY === lastScrollY) {
          setIsVisible(false);
        }
      }, 2000);  // 2 segundos de inactividad
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, [lastScrollY]);

  const otherLocale = locale === 'es' ? 'en' : 'es';

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className={`navbar ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="nav-content">
        {/* Logo */}
        <Link href={`/${locale}`}>
          <Image src="/logo.png" alt="Logo" width={120} height={40} priority />
        </Link>

        {/* Menu Toggle */}
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>

        {/* Menu links */}
        <div className={`menu ${menuOpen ? 'open' : ''}`}>
          <Link href={`/${locale}/services`} onClick={() => setMenuOpen(false)}>{t.services}</Link>
          <Link href={`/${locale}/portfolio`} onClick={() => setMenuOpen(false)}>{t.portfolio}</Link>
          <Link href={`/${locale}/contact`} onClick={() => setMenuOpen(false)}>{t.contact}</Link>
          <Link href={`/${locale}/about`} onClick={() => setMenuOpen(false)}>{t.about}</Link>

          {/* WhatsApp */}
          <a
            href="https://wa.me/5215555555555"
            target="_blank"
            rel="noopener noreferrer"
            className="wsp-btn"
          >
            {t.quote}
          </a>

          {/* Idiomas */}
          <Link href={`/${otherLocale}`} onClick={() => setMenuOpen(false)}>
            <Image
              src={`/icons/${otherLocale}.svg`}
              alt={otherLocale}
              width={24}
              height={24}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
