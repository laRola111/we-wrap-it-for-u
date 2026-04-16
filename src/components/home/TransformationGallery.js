'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import '@/styles/sections/gallery.css';

// Data simulada con imágenes reales de car wrap de Unsplash
const projects = [
  {
    id: 1, type: 'foodtruck', title: 'Food Truck — Neón & Brand',
    before: 'https://images.unsplash.com/photo-1565097158282-1094bd0db2ab?auto=format&fit=crop&q=80&w=900',
    after:  '/foodtruck-wrap-1.png',
    material: 'Avery Dennison Gloss Dragon Fire Red', time: '3 días diseño + 2 días inst.', height: '420px'
  },
  {
    id: 2, type: 'van', title: 'Camioneta Edición Limitada',
    before: '/truck-wrap-2.png',
    after:  '/truck-wrap-1.png',
    material: 'Custom Graphics Premium', time: '3 días', height: '340px'
  },
  {
    id: 3, type: 'van', title: 'Flota Comercial Táctica',
    before: '/truck-wrap-1.png',
    after:  '/truck-wrap-3.png',
    material: 'Oracal 651 Premium Cast', time: '2 días', height: '460px'
  },
  {
    id: 4, type: 'van', title: 'Pick-Up Adventure Wrap',
    before: '/truck-wrap-3.png',
    after:  '/truck-wrap-4.png',
    material: '3M™ 1080 Matte Black Details', time: '4 días', height: '360px'
  },
  {
    id: 5, type: 'van', title: 'Corporate Work Truck',
    before: '/truck-wrap-4.png',
    after:  '/truck-wrap-2.png',
    material: 'Impresión Digital 3M IJ180mC', time: '3 días', height: '400px'
  },
  {
    id: 6, type: 'carro', title: 'Superdeportivo — Chrome',
    before: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=900',
    after:  '/car-wrap-1.png',
    material: '3M™ 1080 Gloss Gold Chrome', time: '4 días', height: '380px'
  },
];

export default function TransformationGallery({ msg = {} }) {
  const m = msg || {};
  const [filter, setFilter] = useState('all');
  const [activeProject, setActiveProject] = useState(null);

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.type === filter);

  return (
    <section className="transformation-gallery" id="galeria">
      <div className="gallery-header">
        <h2 className="text-metallic">{m.title || 'Galería de Transformaciones'}</h2>
        <p>{m.subtitle || 'Observa nuestros resultados. Desliza para comparar el antes y después en distintas categorías.'}</p>
        
        <div className="gallery-filters">
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>{m.all || 'Todos'}</button>
          <button className={filter === 'carro' ? 'active' : ''} onClick={() => setFilter('carro')}>{m.cars || 'Carros'}</button>
          <button className={filter === 'van' ? 'active' : ''} onClick={() => setFilter('van')}>{m.vans || 'Vans'}</button>
          <button className={filter === 'foodtruck' ? 'active' : ''} onClick={() => setFilter('foodtruck')}>{m.foodtrucks || 'Food Trucks'}</button>
        </div>
      </div>

      {/* Masonry Layout */}
      <motion.div layout className="masonry-grid">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={project.id} 
              className="masonry-item" 
              style={{ height: project.height }}
              onClick={() => setActiveProject(project)}
            >
              <Image 
                src={project.after} 
                alt={project.title} 
                fill 
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: 'cover' }}
                className="masonry-img"
              />
              <div className="masonry-overlay">
                <h3>{project.title}</h3>
                <span>Ver Transformación</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Technical Vault Modal / Before-After Slider */}
      <AnimatePresence>
        {activeProject && (
          <BeforeAfterModal project={activeProject} onClose={() => setActiveProject(null)} m={m} />
        )}
      </AnimatePresence>
    </section>
  );
}

// Subcomponente: Modal con Slider Draggeable
function BeforeAfterModal({ project, onClose, m }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleDrag = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Soporte para touch y mouse
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  return (
    <motion.div 
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>✕</button>
        
        {/* Componente Before / After */}
        <div 
          className="before-after-container" 
          ref={containerRef}
          onMouseMove={handleDrag}
          onTouchMove={handleDrag}
        >
          {/* Capa Base: After (Rotulado) */}
          <div className="img-layer img-after">
            <Image src={project.after} alt="After" fill style={{ objectFit: 'cover' }} sizes="100vw" />
          </div>
          
          {/* Capa Superior: Before (Gris) cortada por el slider */}
          <div className="img-layer img-before" style={{ 
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
          }}>
            <Image src={project.before} alt="Before" fill style={{ objectFit: 'cover' }} sizes="100vw" />
          </div>

          {/* Línea del Slider */}
          <div className="slider-line" style={{ left: `${sliderPosition}%` }}>
            <div className="slider-handle">⟷</div>
          </div>

          <div className="label-before">Before</div>
          <div className="label-after">After</div>
        </div>

        {/* Ficha Técnica */}
        <div className="tech-sheet">
          <h3>{m.materialLabel ? m.materialLabel.replace(':', '') : 'Ficha Técnica'}: {project.title}</h3>
          <div className="tech-details">
            <div className="tech-item">
              <span className="label">{m.materialLabel || 'Material:'}</span>
              <span className="value">{project.material}</span>
            </div>
            <div className="tech-item">
              <span className="label">{m.timeLabel || 'Tiempo Total:'}</span>
              <span className="value">{project.time}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
