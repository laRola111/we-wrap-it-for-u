'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import '@/styles/stickyCar.css';

const StickyCar = () => {
  const [activeSection, setActiveSection] = useState(1);
  const [prevSection, setPrevSection] = useState(1);

  useEffect(() => {
    let ticking = false;
    let windowHeight = window.innerHeight;
    let fullHeight = document.documentElement.scrollHeight;

    const onResize = () => {
      windowHeight = window.innerHeight;
      fullHeight = document.documentElement.scrollHeight;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const scrollPosition = scrollY / (fullHeight - windowHeight);

          let newSection = 0;
          if (scrollPosition < 0.180) newSection = 1;
          else if (scrollPosition < 0.508) newSection = 2;
          else if (scrollPosition < 0.927) newSection = 3;
          else if (scrollPosition < 1.5) newSection = 4;

          updateSection(newSection);
          ticking = false;
        });
        ticking = true;
      }
    };

    const updateSection = (newSection) => {
      if (newSection !== activeSection) {
        setPrevSection(activeSection);
        setActiveSection(newSection);
      }
    };

    // Initial check
    onResize();
    handleScroll();

    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', handleScroll);
    };
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
