'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import '@/styles/sections/vault.css';

const faqs = [
  { q: '¿Daña la pintura original?', a: 'No. Los vinilos de calidad premium actúan como una capa protectora adicional. Al removerlos correctamente, la pintura original queda intacta o en mejor estado.' },
  { q: '¿Cómo se lava el vehículo rotulado?', a: 'Lavado manual con agua tibia y jabón neutro. Evitar lavados a presión directamente sobre bordes. Sin ceras abrasivas.' },
  { q: '¿Cuánto dura un vinilo de calidad?', a: 'Entre 5 y 7 años en exteriores dependiendo de la exposición. Los vinilos de grado casting (3M, Avery) garantizan hasta 10 años.' },
  { q: '¿Puedo elegir cualquier color o diseño?', a: 'Sí. Trabajamos por catálogo (más de 100 colores disponibles) o impresión digital personalizada para diseños gráficos complejos.' }
];

const brands = ['3M', 'Avery Dennison', 'Oracal'];

export default function TechnicalVault() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <section className="vault-section">
      <div className="vault-container">
        {/* Sello Animado */}
        <div className="seal-area">
          <div className="rotating-seal">
            <svg viewBox="0 0 200 200" className="seal-svg">
              <defs>
                <path id="circlePath" d="M 100,100 m -60,0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0" />
              </defs>
              <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2"/>
              <circle cx="100" cy="100" r="60" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
              <text fontSize="11" fontFamily="Outfit, sans-serif" fill="rgba(255,255,255,0.7)" fontWeight="700" letterSpacing="3">
                <textPath href="#circlePath">GARANTÍA CERTIFICADA · INSTALACIÓN PROFESIONAL ·</textPath>
              </text>
              <text x="100" y="90" textAnchor="middle" fontSize="28" fill="white" fontWeight="900" fontFamily="Outfit, sans-serif">2</text>
              <text x="100" y="108" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.6)" fontFamily="Inter, sans-serif" letterSpacing="2">AÑOS</text>
              <text x="100" y="125" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.4)" fontFamily="Inter, sans-serif" letterSpacing="1">GARANTÍA</text>
            </svg>
          </div>

          <div className="brand-logos">
            <p>Materiales Certificados</p>
            <div className="brands-row">
              {brands.map(brand => (
                <div key={brand} className="brand-pill">{brand}</div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="faq-area">
          <h2 className="text-metallic faq-title">The Technical Vault</h2>
          <p className="faq-sub">Respuestas directas a las dudas de cada cliente.</p>

          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
                <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <span className="faq-icon">{openFaq === i ? '−' : '+'}</span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="faq-answer-wrapper"
                  style={{ overflow: 'hidden' }}
                >
                  <p className="faq-answer">{faq.a}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
