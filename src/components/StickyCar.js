'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import '@/styles/stickyCar.css';

const StickyCar = () => {
  const [activeSection, setActiveSection] = useState(1);
  const [prevSection, setPrevSection] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const screenHeight = window.innerHeight;
      const fullPageHeight = document.documentElement.scrollHeight;
      const scrollPosition = scrollY / (fullPageHeight - screenHeight);

      if (scrollPosition < 0.180) {
        updateSection(1);
      } else if (scrollPosition < 0.508) {
        updateSection(2);
      } else if (scrollPosition < 0.927) {
        updateSection(3);
      } else if (scrollPosition < 1.5) {
        updateSection(4);
      } else {
        updateSection(0);
      }
    };

    const updateSection = (newSection) => {
      if (newSection !== activeSection) {
        setPrevSection(activeSection);
        setActiveSection(newSection);
      }
    };

    // Llamar a handleScroll al cargar la página para detectar la sección activa
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  return (
    <div className={`sticky-car ${activeSection === 0 ? 'exit' : ''}`}>
      {/* Mostrar solo si no estamos en la última sección */}
      {activeSection !== 0 && (
        <>
          <Image
            src="/images/car-base.png"
            alt="Carro base"
            width={800}
            height={400}
            priority
            className="car-base"
          />
          <Image
            key={`prev-${prevSection}`}
            src={`/images/estampado${prevSection}.png`}
            alt="Estampado anterior"
            width={800}
            height={400}
            priority
            className="car-wrap"
          />
        </>
      )}

      {/* Estampado nuevo con animación de revelado */}
      {(activeSection !== prevSection && activeSection !== 0) && (
        <Image
          key={`new-${activeSection}`}
          src={`/images/estampado${activeSection}.png`}
          alt="Estampado nuevo"
          width={800}
          height={400}
          priority
          className="car-wrap reveal"
        />
      )}
    </div>
  );
};

export default StickyCar;
