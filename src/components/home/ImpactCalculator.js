'use client';
import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import '@/styles/sections/calculator.css'; // Will create this

export default function ImpactCalculator() {
  const [kmPerDay, setKmPerDay] = useState(50);
  const [impressions, setImpressions] = useState(0);

  // Calculate impressions based on a conservative industry standard (e.g., 300 impressions per KM in a city)
  // Monthly = km * 300 * 30 days
  useEffect(() => {
    const targetImpressions = kmPerDay * 400 * 30; // 400 impressions per km parameter
    
    // Animate the counter
    const duration = 1000;
    const steps = 30;
    const increment = targetImpressions / steps;
    let current = 0;
    
    const interval = setInterval(() => {
      current += increment;
      if (current >= targetImpressions) {
        setImpressions(targetImpressions);
        clearInterval(interval);
      } else {
        setImpressions(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [kmPerDay]);

  return (
    <section className="calculator-section">
      <div className="calculator-container glass-panel">
        <div className="calc-header">
          <h2 className="text-metallic">El &quot;Impact Calculator&quot;</h2>
          <p>Mide el retorno de inversión visual que generará tu vehículo mes a mes.</p>
        </div>

        <div className="calc-body">
          <div className="slider-container">
            <label>¿Cuántos kilómetros recorre tu vehículo al día?</label>
            <div className="slider-value">{kmPerDay} km / día</div>
            <input 
              type="range" 
              min="10" 
              max="300" 
              value={kmPerDay} 
              onChange={(e) => setKmPerDay(Number(e.target.value))}
              className="accent-slider"
            />
            <div className="slider-labels">
              <span>Ruta Corta</span>
              <span>Ruta Intensiva</span>
            </div>
          </div>

          <div className="result-container">
            <div className="result-label">Impresiones visuales estimadas al mes:</div>
            <motion.div 
              key={impressions}
              initial={{ scale: 1.1, color: '#fff' }}
              animate={{ scale: 1, color: '#e51a23' }}
              className="result-number text-metallic"
            >
              {impressions.toLocaleString()}
            </motion.div>
            <div className="result-comparison">
              vs. valla publicitaria tradicional (Costo: $1,500/mes)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
