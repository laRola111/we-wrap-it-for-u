'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    id: 2, type: 'carro', title: 'Superdeportivo — Chrome Mirror',
    before: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=900',
    after:  '/car-wrap-1.png',
    material: '3M™ 1080 Gloss Gold Chrome', time: '4 días', height: '340px'
  },
  {
    id: 3, type: 'van', title: 'Flota Corporativa — 5 Vans',
    before: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=900',
    after:  'https://images.unsplash.com/photo-1626359547514-6ba96ec2b3cc?auto=format&fit=crop&q=80&w=900',
    material: 'Oracal 651 Premium Cast + Laminado UV', time: '2 días por unidad', height: '460px'
  },
  {
    id: 4, type: 'carro', title: 'Sedan Premium — Matte Black',
    before: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&q=80&w=900',
    after:  '/car-wrap-2.png',
    material: '3M™ 1080 Matte Black M12', time: '3 días', height: '360px'
  },
  {
    id: 5, type: 'foodtruck', title: 'Street Kitchen — Full Brand',
    before: 'https://images.unsplash.com/photo-1565097158282-1094bd0db2ab?auto=format&fit=crop&q=80&w=900',
    after:  '/foodtruck-wrap-2.png',
    material: 'Impresión Digital 3M IJ180mC', time: '5 días diseño + 3 días inst.', height: '400px'
  },
  {
    id: 6, type: 'van', title: 'Delivery Fleet — Corporate Blue',
    before: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=900',
    after:  'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&q=80&w=900',
    material: 'Avery Dennison MPI 1005 Easy Apply', time: '2 días/unidad', height: '380px'
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
              <img src={project.after} alt={project.title} className="masonry-img" />
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
          <div className="img-layer img-after" style={{ backgroundImage: `url(${project.after})` }}></div>
          
          {/* Capa Superior: Before (Gris) cortada por el slider */}
          <div className="img-layer img-before" style={{ 
            backgroundImage: `url(${project.before})`,
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
          }}></div>

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
