'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import '@/styles/sections/verticals.css'; // Will create this

const verticalData = [
  {
    id: 'foodtruck',
    title: 'Cocinas que atraen miradas',
    niche: 'Food Trucks',
    desc: 'Un diseño apetitoso que convierte peatones en clientes en segundos. Diseñamos con la psicología del color para generar hambre visual.',
    color: '#e94b1e'
  },
  {
    id: 'vans',
    title: 'Tu flota, tu mejor valla',
    niche: 'Vans Comerciales',
    desc: 'Legibilidad extrema a 100km/h. Maximizamos el branding sin comprometer el estilo, perfecto para flotas de servicio o entrega.',
    color: '#1a1a1a'
  },
  {
    id: 'luxury',
    title: 'Protección invisible, estilo absoluto',
    niche: 'High-End Cars',
    desc: 'PPF (Paint Protection Film) y colores exóticos. Solo los mejores materiales (3M, Avery) para los acabados más exigentes.',
    color: '#0a0a0a'
  }
];

export default function Verticals() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-66%"]);

  return (
    <section ref={targetRef} className="verticals-wrapper">
      <div className="verticals-sticky">
        <div className="verticals-header">
          <h2 className="text-metallic">Impacto por Industria</h2>
          <p>Soluciones ultra-específicas para cada tipo de negocio móvil.</p>
        </div>
        
        <motion.div style={{ x }} className="verticals-flex">
          {verticalData.map((vertical, index) => (
            <div key={vertical.id} className={`vertical-card card-${vertical.id}`}>
              <div className="card-content glass-panel">
                <span className="niche-badge" style={{ backgroundColor: vertical.color }}>{vertical.niche}</span>
                <h3>{vertical.title}</h3>
                <p>{vertical.desc}</p>
                {/* Visual placeholder. When we have images, we will place them here */}
                <div className="card-visual-placeholder">
                  {vertical.id === 'foodtruck' && <div className="smoke-animation"></div>}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
