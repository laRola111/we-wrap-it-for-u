'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '@/styles/sections/designLab.css';

const vehicleTypes = [
  { id: 'sedan', label: 'Sedan', icon: '🚗' },
  { id: 'suv', label: 'SUV', icon: '🚙' },
  { id: 'van', label: 'Van', icon: '🚐' },
  { id: 'truck', label: 'Truck', icon: '🛻' },
  { id: 'foodtruck', label: 'Food Truck', icon: '🍔' }
];

const wrapMaterials = [
  { id: 'matte-black', name: 'Matte Black', color: '#1a1a1a', finish: 'matte' },
  { id: 'glossy-red', name: 'Glossy Red', color: '#e51a23', finish: 'glossy' },
  { id: 'chameleon', name: 'Chameleon', color: 'linear-gradient(135deg, #8800ff, #00d4ff)', finish: 'special' },
  { id: 'satin-silver', name: 'Satin Silver', color: '#d4cfcc', finish: 'satin' },
];

const lightingEnvironments = [
  { id: 'day', label: 'Día Soleado' },
  { id: 'neon', label: 'Noche de Neón' },
  { id: 'studio', label: 'Estudio' }
];

export default function DesignLab() {
  const [activeVehicle, setActiveVehicle] = useState(vehicleTypes[2].id); // Default Van
  const [activeMaterial, setActiveMaterial] = useState(wrapMaterials[1]); // Default Red
  const [activeLighting, setActiveLighting] = useState('studio');

  // Dynamic styles to simulate the material
  const getVehicleStyle = () => {
    let style = { 
      backgroundColor: activeMaterial.color.includes('gradient') ? 'transparent' : activeMaterial.color,
      backgroundImage: activeMaterial.color.includes('gradient') ? activeMaterial.color : 'none',
      transition: 'all 0.5s ease',
    };

    if (activeMaterial.finish === 'matte') {
      style.boxShadow = 'inset 0 0 20px rgba(0,0,0,0.8)';
      style.filter = 'contrast(0.9) brightness(0.8)';
    } else if (activeMaterial.finish === 'glossy') {
      style.boxShadow = 'inset 0 20px 50px rgba(255,255,255,0.4), inset 0 -20px 50px rgba(0,0,0,0.5)';
    } else if (activeMaterial.finish === 'satin') {
      style.boxShadow = 'inset 0 10px 30px rgba(255,255,255,0.2)';
    }

    if (activeLighting === 'neon') {
      style.filter += ' drop-shadow(0 0 30px rgba(255,0,255,0.3)) drop-shadow(0 0 30px rgba(0,255,255,0.3))';
    }

    return style;
  };

  return (
    <section className={`design-lab-strict lighting-${activeLighting}`}>
      <div className="lab-header">
        <h2 className="text-metallic">Interactive Design Lab</h2>
        <p className="lab-subtitle">Configurador Interactivo de 4 Pasos</p>
      </div>

      <div className="lab-grid">
        {/* Paso 1: Selector de Silueta */}
        <div className="control-panel glass-panel">
          <h3>1. Silueta</h3>
          <div className="bento-grid">
            {vehicleTypes.map(v => (
              <button 
                key={v.id}
                className={`bento-item ${activeVehicle === v.id ? 'active' : ''}`}
                onClick={() => setActiveVehicle(v.id)}
                data-hoverable="true"
              >
                <span className="icon">{v.icon}</span>
                <span className="label">{v.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Centro: Visor del Vehículo */}
        <div className="vehicle-viewer">
          <div className="environment-badge">Entorno: {lightingEnvironments.find(e => e.id === activeLighting).label}</div>
          <AnimatePresence mode="wait">
            <motion.div 
              key={`${activeVehicle}-${activeMaterial.id}-${activeLighting}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.4 }}
              className={`vehicle-silhouette type-${activeVehicle}`}
              style={getVehicleStyle()}
            />
          </AnimatePresence>
          
          {/* Zona Drag & Drop Branding */}
          <div className="drag-drop-branding">
            <div className="dashed-box">Drop Logo Aquí</div>
          </div>
        </div>

        {/* Controles Derechos */}
        <div className="right-controls">
          {/* Paso 2: Muestrario de Texturas */}
          <div className="control-panel glass-panel">
            <h3>2. Material</h3>
            <div className="spheres-row">
              {wrapMaterials.map(m => (
                <button
                  key={m.id}
                  className={`material-sphere ${activeMaterial.id === m.id ? 'active' : ''}`}
                  style={{ 
                    background: m.color,
                    boxShadow: m.id === activeMaterial.id ? '0 0 15px rgba(255,255,255,0.5)' : 'none'
                  }}
                  onClick={() => setActiveMaterial(m)}
                  title={m.name}
                  data-hoverable="true"
                />
              ))}
            </div>
            <p className="material-name">{activeMaterial.name} ({activeMaterial.finish})</p>
          </div>

          {/* Paso 4: Entorno de Luz */}
          <div className="control-panel glass-panel mt-4">
            <h3>4. Iluminación</h3>
            <div className="lighting-btns">
              {lightingEnvironments.map(e => (
                <button
                  key={e.id}
                  className={`light-btn ${activeLighting === e.id ? 'active' : ''}`}
                  onClick={() => setActiveLighting(e.id)}
                  data-hoverable="true"
                >
                  {e.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
