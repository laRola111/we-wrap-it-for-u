'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '@/styles/sections/foodtruck.css';

// Info de los puntos críticos del camión
const truckPoints = [
  { id: 'techo', top: '10%', left: '40%', title: 'Techo (Visibilidad Aérea)', desc: 'Esencial para clientes en edificios altos. Resiste el sol directo.' },
  { id: 'frente', top: '50%', left: '15%', title: 'Frente & Cabina', desc: 'Tu carta de presentación en carretera. Vinilo especializado anti-insectos.' },
  { id: 'lateral', top: '45%', left: '60%', title: 'Lateral & Menú', desc: 'El área de ventas. Utilizamos laminado brillante para resaltar la comida.' },
  { id: 'ventana', top: '35%', left: '50%', title: 'Marcos de ventana', desc: 'Cortes precisos alrededor de remaches para evitar desprendimientos.' }
];

export default function SpecializedFoodTrucks() {
  const [activePoint, setActivePoint] = useState(null);

  return (
    <section className="foodtruck-section">
      <div className="ft-header">
        <h2 className="text-metallic">Specialized Food Trucks</h2>
        <p>Sabemos que tu Food truck es tu negocio. Cuidamos cada remache.</p>
      </div>

      <div className="ft-container">
        {/* Usamos una silueta vectorial de un Foodtruck o una imagen real oscura */}
        <div className="truck-diagram" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1565097158282-1094bd0db2ab?auto=format&fit=crop&q=80&w=1200')" }}>
          <div className="diagram-overlay"></div>
          
          {truckPoints.map((point) => (
            <div 
              key={point.id} 
              className={`hotspot ${activePoint?.id === point.id ? 'active' : ''}`}
              style={{ top: point.top, left: point.left }}
              onMouseEnter={() => setActivePoint(point)}
              onMouseLeave={() => setActivePoint(null)}
            >
              <span className="dot"></span>
              <AnimatePresence>
                {activePoint?.id === point.id && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="hotspot-tooltip"
                  >
                    <h4>{point.title}</h4>
                    <p>{point.desc}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
