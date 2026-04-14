'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

/* ────────────────────────────────────────────────────────
   SECTION: El Taller
──────────────────────────────────────────────────────── */
export function ElTaller() {
  return (
    <section className="section-taller" id="taller">
      <div className="section-inner">
        <p className="section-eyebrow">EXCELENCIA TÉCNICA</p>
        <h2 className="section-title text-metallic">
          Donde la precisión del software encuentra<br />
          la maestría del instalador.
        </h2>
        <p className="section-body max-600">
          En We Wrap It For U, no pegamos vinilos; esculpimos visiones. Utilizamos escaneado
          digital para asegurar que cada línea de diseño encaje perfectamente con las
          curvas de tu vehículo. Nuestra técnica de instalación sin costuras visibles
          garantiza un acabado que desafía incluso a la pintura original.
        </p>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────
   SECTION: Tailored Solutions (3 bloques)
──────────────────────────────────────────────────────── */
const services = [
  {
    tag: 'Personal Wraps / Luxury & Exotic',
    title: 'Estilo Sin Límites.',
    body: `Para el entusiasta que busca exclusividad. Cambios de color totales, acabados
satinados, mate, cromados o diseños personalizados que hacen que tu carro sea único
en el mundo. Protegemos tu inversión con materiales que mantienen la pintura
original intacta.`
  },
  {
    tag: 'Commercial Vans & Trucks',
    title: 'Autoridad en Movimiento.',
    body: `Tu flota es la cara de tu empresa. Diseñamos e instalamos gráficas que proyectan
profesionalismo y confianza. Desde una sola unidad hasta flotas completas,
aseguramos uniformidad y durabilidad industrial bajo cualquier condición climática.`
  },
  {
    tag: 'Food Truck Specialists',
    title: 'El Imán de Miradas.',
    body: `Un Food Truck es un espectáculo visual. Creamos diseños vibrantes que cuentan la
historia de tu marca y atraen clientes desde la distancia. Utilizamos vinilos de alto
rendimiento resistentes al calor y a la limpieza constante.`
  }
];

export function TailoredSolutions() {
  return (
    <section className="section-services" id="servicios">
      <div className="section-inner">
        <h2 className="section-title text-metallic">Tailored Solutions</h2>
        <div className="services-grid">
          {services.map((s, i) => (
            <motion.div
              key={i}
              className="service-card glass-panel"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <span className="service-tag">{s.tag}</span>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-body">{s.body}</p>
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
const materials = [
  { name: 'Satin Metallic', sub: 'Reflejos suaves para líneas elegantes.', bg: 'linear-gradient(135deg, #b0b8c0 0%, #d4d8dc 50%, #8a9098 100%)' },
  { name: 'Deep Matte', sub: 'Sofisticación absoluta sin distracciones.', bg: '#1a1a1a' },
  { name: 'Gloss Liquid', sub: 'El brillo profundo de una pintura recién aplicada.', bg: 'linear-gradient(135deg, #0a0a0a 0%, #2a2a2a 50%, #0a0a0a 100%)' },
  { name: 'Custom Print', sub: 'Tu imaginación impresa en resolución 8K.', bg: 'linear-gradient(135deg, #e51a23 0%, #8800ff 50%, #00d4ff 100%)' },
];

export function MaterialsLab() {
  const [active, setActive] = useState(0);
  return (
    <section className="section-materials" id="materiales">
      <div className="section-inner">
        <h2 className="section-title text-metallic">Elige tu Acabado Premium.</h2>
        <p className="section-body max-600">
          Selecciona entre nuestra curaduría de materiales importados de los mejores
          fabricantes del mundo (3M, Avery Dennison, Inozetek).
        </p>
        <div className="materials-grid">
          {materials.map((m, i) => (
            <motion.div
              key={i}
              className={`material-card${active === i ? ' active' : ''}`}
              onClick={() => setActive(i)}
              whileHover={{ scale: 1.03 }}
              data-hoverable="true"
            >
              <div className="material-sphere" style={{ background: m.bg }} />
              <h4 className="material-name">{m.name}</h4>
              <p className="material-sub">{m.sub}</p>
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
const steps = [
  {
    num: '01', title: 'Consulta & Scan',
    body: 'Analizamos la estructura de tu vehículo y tus objetivos estéticos para crear un lienzo digital perfecto.'
  },
  {
    num: '02', title: 'Diseño de Autor',
    body: 'Nuestros diseñadores crean renders realistas. No instalamos nada hasta que te enamores del diseño en pantalla.'
  },
  {
    num: '03', title: 'Preparación Quirúrgica',
    body: 'Descontaminación profunda de la superficie. El secreto de un wrap eterno está en lo que no se ve.'
  },
  {
    num: '04', title: 'Instalación de Precisión',
    body: 'Aplicación en ambiente controlado, libre de polvo, con técnicas de remate en bordes para una cobertura total.'
  }
];

export function ProcesoWrap() {
  return (
    <section className="section-proceso" id="proceso">
      <div className="section-inner">
        <h2 className="section-title text-metallic">El Proceso</h2>
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
              <div className="timeline-num">Paso {s.num}</div>
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
export function FoodTruckElite() {
  return (
    <section className="section-foodtruck" id="foodtruck">
      <div
        className="ft-bg"
        style={{ backgroundImage: "url('/bg-foodtruck.png')" }}
      >
        <div className="ft-overlay" />
      </div>
      <div className="section-inner ft-inner">
        <p className="section-eyebrow">FOOD TRUCK ELITE</p>
        <h2 className="section-title text-metallic">
          Tu Cocina merece un exterior<br />a la altura de tu sazón.
        </h2>
        <p className="section-body max-600">
          Entendemos los retos de un Food Truck: remaches, ventanas de servicio,
          generadores y exposición al calor. Nuestros wraps no solo son bellos;
          son armaduras de diseño que resisten la jornada diaria de tu negocio.
        </p>
        <ul className="ft-bullets">
          <li>Gráficos de alta definición que despiertan el apetito.</li>
          <li>Vinilos con laminado de protección UV para evitar la decoloración.</li>
          <li>Diseño estratégico para legibilidad de menús y redes sociales.</li>
        </ul>
        <a href="#cotizar" className="btn-primary" data-hoverable="true">
          Quiero un wrap para mi Food Truck →
        </a>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────
   SECTION: FAQ
──────────────────────────────────────────────────────── */
const faqs = [
  {
    q: '¿Daña la pintura original?',
    a: 'Al contrario, el vinilo actúa como una capa protectora contra rayos UV y pequeños escombros de la carretera.'
  },
  {
    q: '¿Cuánto tiempo toma?',
    a: 'Depende del proyecto. Un carro personal puede tomar 3-5 días; un Food Truck de gran formato entre 5 y 7 días de instalación artesanal.'
  },
  {
    q: '¿Cómo lo cuido?',
    a: 'Te entregamos una guía de cuidados post-instalación y recomendamos productos específicos para mantener el acabado como el primer día.'
  }
];

export function FAQSection() {
  const [open, setOpen] = useState(null);
  return (
    <section className="section-faq">
      <div className="section-inner">
        <h2 className="section-title text-metallic">Preguntas Frecuentes</h2>
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
const vehicleOpts = ['Carro', 'Van', 'SUV', 'Food Truck', 'Otro'];

export function QuoteForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ vehicle: '', vision: '', budget: '' });
  const [sent, setSent] = useState(false);

  return (
    <section className="section-quote" id="cotizar">
      <div className="section-inner">
        <h2 className="section-title text-metallic">¿Listo para la transformación?</h2>
        <p className="section-body max-600">
          Cuéntanos sobre tu vehículo y lo que tienes en mente. Nuestro equipo de
          diseño te contactará para iniciar el proceso.
        </p>

        {!sent ? (
          <div className="quote-form glass-panel">
            {step === 1 && (
              <div className="form-step">
                <label>¿Qué máquina vamos a transformar?</label>
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
                <label>Describe tu visión (Color, estilo, logos...)</label>
                <textarea
                  rows={4}
                  className="form-textarea"
                  value={form.vision}
                  onChange={e => setForm(f => ({...f, vision: e.target.value}))}
                  placeholder="Quiero un matte negro con mis logos corporativos en los laterales..."
                />
                <label style={{marginTop:'1.5rem'}}>Presupuesto estimado</label>
                <input
                  type="text"
                  className="form-input"
                  value={form.budget}
                  onChange={e => setForm(f => ({...f, budget: e.target.value}))}
                  placeholder="Ej: $2,000 – $5,000"
                />
                <div className="form-nav">
                  <button className="back-btn" onClick={() => setStep(1)}>← Atrás</button>
                  <motion.button
                    className="btn-primary"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSent(true)}
                    data-hoverable="true"
                  >
                    Enviar a los Expertos →
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
            <h3>¡Estamos preparando tus renders!</h3>
            <p>Un experto de We Wrap It For U te contactará en menos de 24 horas.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────
   SECTION: Footer
──────────────────────────────────────────────────────── */
export function SiteFooter() {
  return (
    <footer className="arknica-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src="/logo.png" alt="We Wrap It For U" className="footer-logo" />
          <p className="footer-slogan">Engineering Beauty on Wheels.</p>
        </div>
        <div className="footer-links">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram →</a>
          <a href="https://wa.me/5215555555555" target="_blank" rel="noopener noreferrer">WhatsApp →</a>
        </div>
        <div className="footer-legal">
          <p>© 2026 We Wrap It For U. Todos los derechos reservados.</p>
          <p className="footer-credit">
            Diseño web por{' '}
            <a href="https://ruedalarolamedia.com/" target="_blank" rel="noopener noreferrer">
              Rueda La Rola Media
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
