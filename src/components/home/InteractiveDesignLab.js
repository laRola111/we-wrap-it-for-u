'use client';
import { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PresentationControls, Stage } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import '@/styles/sections/lab.css';

// ── Wrap Color Presets ─────────────────────────────────────────────────────
const WRAP_COLORS = [
  { id: 'gloss-black',   name: 'Gloss Black',   hex: '#0d0d0d', metalness: 0.8, roughness: 0.15 },
  { id: 'matte-black',   name: 'Matte Black',   hex: '#1c1c1c', metalness: 0.0, roughness: 0.95 },
  { id: 'brand-red',     name: 'Brand Red',     hex: '#e51a23', metalness: 0.3, roughness: 0.4  },
  { id: 'chrome',        name: 'Chrome Mirror', hex: '#c8d8e8', metalness: 1.0, roughness: 0.0  },
  { id: 'midnight-blue', name: 'Midnight Blue', hex: '#0d1828', metalness: 0.6, roughness: 0.3  },
  { id: 'satin-white',   name: 'Satin White',   hex: '#f0f0f0', metalness: 0.05, roughness: 0.6 },
  { id: 'gunmetal',      name: 'Gunmetal',      hex: '#2e3540', metalness: 0.7, roughness: 0.35 },
  { id: 'viper-green',   name: 'Viper Green',   hex: '#1c4a1c', metalness: 0.4, roughness: 0.3  },
];

// Body-related keywords — we skip glass, rubber, tyre, interior, brake
const SKIP_KEYWORDS = ['glass', 'window', 'windshield', 'tyre', 'tire', 'rubber',
  'interior', 'seat', 'dash', 'steering', 'brake', 'disk', 'chrome_trim',
  'light', 'lamp', 'exhaust', 'floor'];

function shouldSkip(name) {
  const n = name.toLowerCase();
  return SKIP_KEYWORDS.some(k => n.includes(k));
}

// ── The 3D Model ───────────────────────────────────────────────────────────
function CarModel({ path, wrapColor }) {
  const { scene } = useGLTF(path);

  scene.traverse((child) => {
    if (!child.isMesh || !child.material) return;
    if (shouldSkip(child.name)) return; // Don't repaint glass/tyres

    // Clone material if needed to avoid mutating shared materials
    if (!child.userData.materialCloned) {
      child.material = child.material.clone();
      child.userData.materialCloned = true;
    }

    const mat = child.material;
    if (mat.isMeshStandardMaterial || mat.isMeshPhysicalMaterial) {
      mat.color.set(wrapColor.hex);
      mat.metalness  = wrapColor.metalness;
      mat.roughness  = wrapColor.roughness;
      mat.needsUpdate = true;
    }
  });

  return (
    <primitive
      object={scene}
      // Stage component handles auto-centering, so position is relative
    />
  );
}

function Fallback() {
  const ref = useRef();
  useFrame((_, dt) => { if(ref.current) ref.current.rotation.y += dt * 0.6; });
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <boxGeometry args={[2, 0.6, 4]} />
      <meshStandardMaterial color="#222" metalness={0.6} roughness={0.3} wireframe />
    </mesh>
  );
}

const MODELS = [
  { id: 'bmw',   label: 'BMW G21',       icon: '🏎', path: '/models/bmw/scene.gltf'   },
  { id: 'truck', label: 'Service Truck',  icon: '🚐', path: '/models/truck/scene.gltf' },
];

export default function InteractiveDesignLab() {
  const [activeModel, setActiveModel] = useState(MODELS[0]);
  const [activeColor, setActiveColor] = useState(WRAP_COLORS[0]);

  return (
    <section className="lab-section" id="lab">
      <div className="lab-inner">
        <div className="lab-header">
          <h2 className="text-metallic">The Design Lab</h2>
          <p>Cambia el color del wrap en tiempo real · Arrastra para rotar el modelo</p>
        </div>

        <div className="lab-layout">
          {/* LEFT SIDEBAR */}
          <div className="lab-sidebar glass-panel">
            <h3>Vehículo</h3>
            {MODELS.map(m => (
              <button
                key={m.id}
                className={`vehicle-btn${activeModel.id === m.id ? ' active' : ''}`}
                onClick={() => setActiveModel(m)}
                data-hoverable="true"
              >
                <span className="v-icon">{m.icon}</span>
                <span>{m.label}</span>
              </button>
            ))}

            <div className="divider" />

            <h3>Acabado Wrap</h3>
            <div className="color-swatches">
              {WRAP_COLORS.map(c => (
                <button
                  key={c.id}
                  className={`swatch${activeColor.id === c.id ? ' active' : ''}`}
                  style={{ background: c.hex, border: c.hex === '#f0f0f0' ? '1px solid rgba(255,255,255,0.1)' : undefined }}
                  title={c.name}
                  onClick={() => setActiveColor(c)}
                  data-hoverable="true"
                />
              ))}
            </div>
            <p className="finish-label">{activeColor.name}</p>
          </div>

          {/* 3D CANVAS */}
          <div className="lab-canvas-wrapper">
            <Canvas
              shadows
              dpr={[1, 1.5]}
              camera={{ position: [0, 0, 10], fov: 40 }}
            >
              <Suspense fallback={<Fallback />}>
                <Stage
                  environment="city"
                  intensity={0.8}
                  adjustCamera={1.2}
                  shadows={{ type: 'contact', opacity: 0.5, blur: 2 }}
                >
                  <PresentationControls
                    global
                    speed={1.5}
                    zoom={0.7}
                    polar={[-0.2, 0.3]}
                    azimuth={[-Infinity, Infinity]}
                  >
                    <CarModel
                      key={activeModel.id + activeColor.id}
                      path={activeModel.path}
                      wrapColor={activeColor}
                    />
                  </PresentationControls>
                </Stage>
              </Suspense>
            </Canvas>
            <p className="canvas-hint">Arrastra para rotar · Pellizca para zoom</p>
          </div>

          {/* RIGHT PANEL */}
          <div className="lab-process glass-panel">
            <h3>Nuestro Proceso</h3>
            {[
              { n: '01', t: 'Medición Digital',          d: 'Escaneamos tu vehículo. Plantillas 1:1, precisión milimétrica.' },
              { n: '02', t: 'Render 3D',                  d: 'Así exactamente verás el resultado antes de imprimir una sola hoja.' },
              { n: '03', t: 'Instalación Profesional',    d: 'Cuarto limpio, pistola de calor, herramientas de fieltro. Cero burbujas.' },
            ].map(s => (
              <div key={s.n} className="process-step">
                <span className="step-num">{s.n}</span>
                <div>
                  <strong>{s.t}</strong>
                  <p>{s.d}</p>
                </div>
              </div>
            ))}

            {/* Active color preview */}
            <div className="color-preview-bar">
              <div className="preview-dot" style={{ background: activeColor.hex }} />
              <div>
                <strong style={{color:'white',fontSize:'0.9rem'}}>{activeColor.name}</strong>
                <p style={{fontSize:'0.75rem',color:'var(--color-text-muted)'}}>
                  Metalness {(activeColor.metalness * 100).toFixed(0)}% · Roughness {(activeColor.roughness * 100).toFixed(0)}%
                </p>
              </div>
            </div>

            <motion.a
              href="#cotizar"
              className="lab-cta"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              data-hoverable="true"
            >
              Cotizar con este acabado →
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
