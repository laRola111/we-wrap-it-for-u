'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ────────────────────────────────────────────────────────
   SECTION: El Taller
──────────────────────────────────────────────────────── */
export function ElTaller({ msg = {} }) {
  const m = msg || {};
  return (
    <section className="section-taller" id="taller" style={{ position: 'relative', overflow: 'hidden' }}>
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], rotate: [0, 90, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', top: '-30%', right: '-10%', width: '800px', height: '800px',
          background: 'radial-gradient(circle, rgba(229,26,35,0.15) 0%, transparent 70%)',
          borderRadius: '50%', zIndex: 0, pointerEvents: 'none',
          willChange: 'transform, opacity'
        }}
      />
      <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
        <motion.p 
          className="section-eyebrow"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {m.eyebrow || 'EXCELENCIA TÉCNICA'}
        </motion.p>
        <motion.h2 
          className="section-title text-metallic" 
          dangerouslySetInnerHTML={{ __html: m.title || 'Donde la precisión del software encuentra<br />la maestría del instalador.' }} 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        />
        <motion.p 
          className="section-body max-600"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {m.body || 'En We Wrap It For U, no pegamos vinilos; esculpimos visiones...'}
        </motion.p>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────
   SECTION: Tailored Solutions (3 bloques)
──────────────────────────────────────────────────────── */
export function TailoredSolutions({ msg = {} }) {
  const m = msg || {};
  const services = [
    { 
      tag: m.s1Tag || 'Personal Wraps / Luxury & Exotic', 
      title: m.s1Title || 'Estilo Sin Límites.', 
      body: m.s1Body || 'Para el entusiasta que busca exclusividad...',
      bg: "linear-gradient(rgba(10,10,10,0.85), rgba(10,10,10,0.95)), url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800')"
    },
    { 
      tag: m.s2Tag || 'Commercial Vans & Trucks', 
      title: m.s2Title || 'Autoridad en Movimiento.', 
      body: m.s2Body || 'Tu flota es la cara de tu empresa...',
      bg: "linear-gradient(rgba(10,10,10,0.85), rgba(10,10,10,0.95)), url('https://images.unsplash.com/photo-1560159811-2eb275f10b80?auto=format&fit=crop&q=80&w=800')"
    },
    { 
      tag: m.s3Tag || 'Food Truck Specialists', 
      title: m.s3Title || 'El Imán de Miradas.', 
      body: m.s3Body || 'Un Food Truck es un espectáculo visual...',
      bg: "linear-gradient(rgba(10,10,10,0.85), rgba(10,10,10,0.95)), url('https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=800')"
    }
  ];

  return (
    <section className="section-services" id="servicios">
      <div className="section-inner">
        <h2 className="section-title text-metallic">{m.title || 'Tailored Solutions'}</h2>
        <div className="services-grid">
          {services.map((s, i) => (
            <motion.div
              key={i}
              className="service-card glass-panel"
              style={{
                backgroundImage: s.bg,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: 'inset 0 0 50px rgba(0,0,0,0.8)',
                overflow: 'hidden',
                position: 'relative'
              }}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1, type: 'spring', bounce: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div style={{ position: 'relative', zIndex: 2 }}>
                <span className="service-tag">{s.tag}</span>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-body">{s.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────
   SECTION: Materials Lab (Muestrario)
──────────────────────────────────────────────────────── */
export function MaterialsLab({ msg = {} }) {
  const [active, setActive] = useState(0);
  const m = msg || {};
  
  const materials = [
    { name: 'Satin Metallic', sub: m.m1Sub || 'Reflejos suaves para líneas elegantes.', bg: 'linear-gradient(135deg, #b0b8c0 0%, #d4d8dc 50%, #8a9098 100%)' },
    { name: 'Deep Matte', sub: m.m2Sub || 'Sofisticación absoluta sin distracciones.', bg: '#1a1a1a' },
    { name: 'Gloss Liquid', sub: m.m3Sub || 'El brillo profundo de una pintura recién aplicada.', bg: 'linear-gradient(135deg, #0a0a0a 0%, #2a2a2a 50%, #0a0a0a 100%)' },
    { name: 'Custom Print', sub: m.m4Sub || 'Tu imaginación impresa en resolución 8K.', bg: 'linear-gradient(135deg, #e51a23 0%, #8800ff 50%, #00d4ff 100%)' },
  ];

  return (
    <section className="section-materials" id="materiales" style={{ position: 'relative', overflow: 'hidden' }}>
      <AnimatePresence>
        <motion.div
           key={active}
           initial={{ opacity: 0 }}
           animate={{ opacity: 0.15 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.8 }}
           style={{
             position: 'absolute', inset: 0,
             background: materials[active].bg,
             zIndex: 0, pointerEvents: 'none',
             willChange: 'opacity'
           }}
        />
      </AnimatePresence>

      <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="section-title text-metallic">{m.title || 'Elige tu Acabado Premium.'}</h2>
        <p className="section-body max-600">
          {m.body || 'Selecciona entre nuestra curaduría de materiales importados de los mejores fabricantes del mundo (3M, Avery Dennison, Inozetek).'}
        </p>
        <div className="materials-grid">
          {materials.map((mat, i) => (
            <motion.div
              key={i}
              className={`material-card${active === i ? ' active' : ''}`}
              onClick={() => setActive(i)}
              whileHover={{ scale: 1.03 }}
              data-hoverable="true"
              style={{
                borderColor: active === i ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.06)'
              }}
            >
              <div className="material-sphere" style={{ background: mat.bg }} />
              <h4 className="material-name">{mat.name}</h4>
              <p className="material-sub">{mat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────
   SECTION: Proceso (4 steps)
──────────────────────────────────────────────────────── */
export function ProcesoWrap({ msg = {} }) {
  const m = msg || {};
  const steps = [
    { num: m.p1Num || '01', title: m.p1Title || 'Consulta & Scan', body: m.p1Body || 'Analizamos la estructura...' },
    { num: m.p2Num || '02', title: m.p2Title || 'Diseño de Autor', body: m.p2Body || 'Nuestros diseñadores crean...' },
    { num: m.p3Num || '03', title: m.p3Title || 'Preparación Quirúrgica', body: m.p3Body || 'Descontaminación...' },
    { num: m.p4Num || '04', title: m.p4Title || 'Instalación de Precisión', body: m.p4Body || 'Aplicación...' }
  ];

  return (
    <section className="section-proceso" id="proceso">
      <div className="section-inner">
        <h2 className="section-title text-metallic">{m.title || 'El Proceso'}</h2>
        <div className="process-timeline">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              className="timeline-step"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <div className="timeline-num">{s.num}</div>
              <div className="timeline-connector" />
              <div className="timeline-content">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────
   SECTION: Food Truck Elite
──────────────────────────────────────────────────────── */
export function FoodTruckElite({ msg = {} }) {
  const m = msg || {};
  return (
    <section className="section-foodtruck" id="foodtruck">
      <div
        className="ft-bg"
        style={{ backgroundImage: "url('/bg-foodtruck.png')" }}
      >
        <div className="ft-overlay" />
      </div>
      <div className="section-inner ft-inner">
        <p className="section-eyebrow">{m.eyebrow || 'FOOD TRUCK ELITE'}</p>
        <h2 className="section-title text-metallic" dangerouslySetInnerHTML={{ __html: m.title || 'Tu Cocina merece un exterior<br />a la altura de tu sazón.' }} />
        <p className="section-body max-600">
          {m.body || 'Entendemos los retos de un Food Truck...'}
        </p>
        <ul className="ft-bullets">
          <li>{m.l1 || 'Gráficos de alta definición que despiertan el apetito.'}</li>
          <li>{m.l2 || 'Vinilos con laminado de protección UV para evitar la decoloración.'}</li>
          <li>{m.l3 || 'Diseño estratégico para legibilidad de menús y redes sociales.'}</li>
        </ul>
        <a href="#cotizar" className="btn-primary" data-hoverable="true">
          {m.btn || 'Quiero un wrap para mi Food Truck →'}
        </a>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────
   SECTION: FAQ
──────────────────────────────────────────────────────── */
export function FAQSection({ msg = {} }) {
  const m = msg || {};
  const [open, setOpen] = useState(null);
  
  const faqs = [
    { q: m.q1 || '¿Daña la pintura original?', a: m.a1 || 'Al contrario...' },
    { q: m.q2 || '¿Cuánto tiempo toma?', a: m.a2 || 'Depende del proyecto...' },
    { q: m.q3 || '¿Cómo lo cuido?', a: m.a3 || 'Te entregamos una guía...' }
  ];

  return (
    <section className="section-faq">
      <div className="section-inner">
        <h2 className="section-title text-metallic">{m.title || 'Preguntas Frecuentes'}</h2>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <div key={i} className={`faq-item${open === i ? ' open' : ''}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                <span>{f.q}</span>
                <span className="faq-icon">{open === i ? '−' : '+'}</span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }}
              >
                <p className="faq-a">{f.a}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────
   SECTION: Quote Engine (Form)
──────────────────────────────────────────────────────── */
export function QuoteForm({ msg = {} }) {
  const m = msg || {};
  const vehicleOpts = [m.v1 || 'Carro', m.v2 || 'Van', m.v3 || 'SUV', m.v4 || 'Food Truck', m.v5 || 'Otro'];
  
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ vehicle: '', vision: '', budget: '' });
  const [sent, setSent] = useState(false);

  return (
    <section className="section-quote" id="cotizar">
      <div className="section-inner">
        <h2 className="section-title text-metallic">{m.title || '¿Listo para la transformación?'}</h2>
        <p className="section-body max-600">
          {m.body || 'Cuéntanos sobre tu vehículo y lo que tienes en mente...'}
        </p>

        {!sent ? (
          <div className="quote-form glass-panel">
            {step === 1 && (
              <div className="form-step">
                <label>{m.q1 || '¿Qué máquina vamos a transformar?'}</label>
                <div className="vehicle-choices">
                  {vehicleOpts.map(v => (
                    <button
                      key={v}
                      className={`choice-pill${form.vehicle === v ? ' selected' : ''}`}
                      onClick={() => { setForm(f => ({...f, vehicle: v})); setStep(2); }}
                      data-hoverable="true"
                    >{v}</button>
                  ))}
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="form-step">
                <label>{m.q2 || 'Describe tu visión'}</label>
                <textarea
                  rows={4}
                  className="form-textarea"
                  value={form.vision}
                  onChange={e => setForm(f => ({...f, vision: e.target.value}))}
                  placeholder={m.placeholder1 || 'Quiero un matte negro...'}
                />
                <label style={{marginTop:'1.5rem'}}>{m.q3 || 'Presupuesto estimado'}</label>
                <input
                  type="text"
                  className="form-input"
                  value={form.budget}
                  onChange={e => setForm(f => ({...f, budget: e.target.value}))}
                  placeholder={m.placeholder2 || 'Ej: $2,000 – $5,000'}
                />
                <div className="form-nav">
                  <button className="back-btn" onClick={() => setStep(1)}>{m.back || '← Atrás'}</button>
                  <motion.button
                    className="btn-primary"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSent(true)}
                    data-hoverable="true"
                  >
                    {m.send || 'Enviar a los Expertos →'}
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <motion.div
            className="quote-success glass-panel"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <div className="success-emoji">🚗💨</div>
            <h3>{m.successTitle || '¡Estamos preparando tus renders!'}</h3>
            <p>{m.successBody || 'Un experto de We Wrap It For U te contactará en menos de 24 horas.'}</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────
   SECTION: Footer
──────────────────────────────────────────────────────── */
export function SiteFooter({ msg = {} }) {
  const m = msg || {};
  return (
    <footer className="arknica-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src="/logo.png" alt="We Wrap It For U" className="footer-logo" />
          <p className="footer-slogan">{m.slogan || 'Engineering Beauty on Wheels.'}</p>
        </div>
        <div className="footer-links">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram →</a>
          <a href="https://wa.me/5215555555555" target="_blank" rel="noopener noreferrer">WhatsApp →</a>
        </div>
        <div className="footer-legal">
          <p>{m.rights || '© 2026 We Wrap It For U. Todos los derechos reservados.'}</p>
          <p className="footer-credit">
            {m.credit1 || 'Diseño web por'}{' '}
            <a href="https://ruedalarolamedia.com/" target="_blank" rel="noopener noreferrer">
              {m.credit2 || 'Rueda La Rola Media'}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
