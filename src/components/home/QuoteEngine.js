'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '@/styles/sections/quote-engine.css';

const vehicles = [
  { id: 'carro', label: 'Carro / Sedan', icon: '🚗' },
  { id: 'suv', label: 'SUV / Pickup', icon: '🚙' },
  { id: 'van', label: 'Van Comercial', icon: '🚐' },
  { id: 'foodtruck', label: 'Food Truck', icon: '🍔' }
];

const services = [
  { id: 'color', label: 'Cambio de Color Total', icon: '🎨' },
  { id: 'marca', label: 'Diseño de Marca', icon: '✦' },
  { id: 'ppf', label: 'Protección PPF', icon: '🛡️' },
  { id: 'parcial', label: 'Rotulado Parcial', icon: '◧' }
];

const slideVariants = {
  enter: { x: 60, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -60, opacity: 0 }
};

export default function QuoteEngine() {
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState({ vehicle: null, service: null, contact: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (field, value) => {
    setSelection(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <section className="quote-engine-section" id="calculador">
      <div className="qe-container">
        {!submitted ? (
          <>
            <div className="qe-header">
              <h2 className="text-metallic">The Quote Engine</h2>
              <p>No hacemos pegatinas. Creamos leyendas sobre ruedas.</p>

              {/* Progress Steps */}
              <div className="step-progress">
                {[1, 2, 3].map(s => (
                  <div key={s} className={`progress-dot ${step >= s ? 'active' : ''}`} />
                ))}
              </div>
            </div>

            <div className="qe-steps-wrapper">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" {...slideVariants} transition={{ duration: 0.3 }} className="step-panel">
                    <h3>¿Qué vehículo tienes?</h3>
                    <div className="choice-grid">
                      {vehicles.map(v => (
                        <button
                          key={v.id}
                          className={`choice-card ${selection.vehicle === v.id ? 'selected' : ''}`}
                          onClick={() => { handleSelect('vehicle', v.id); setStep(2); }}
                        >
                          <span className="choice-icon">{v.icon}</span>
                          <span className="choice-label">{v.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" {...slideVariants} transition={{ duration: 0.3 }} className="step-panel">
                    <h3>¿Qué buscas?</h3>
                    <div className="choice-grid">
                      {services.map(s => (
                        <button
                          key={s.id}
                          className={`choice-card ${selection.service === s.id ? 'selected' : ''}`}
                          onClick={() => { handleSelect('service', s.id); setStep(3); }}
                        >
                          <span className="choice-icon">{s.icon}</span>
                          <span className="choice-label">{s.label}</span>
                        </button>
                      ))}
                    </div>
                    <button className="back-btn" onClick={() => setStep(1)}>← Atrás</button>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" {...slideVariants} transition={{ duration: 0.3 }} className="step-panel step-contact">
                    <h3>Déjanos tu WhatsApp o Email</h3>
                    <input
                      type="text"
                      placeholder="+1 555 000 0000 o tu@email.com"
                      className="contact-input"
                      value={selection.contact}
                      onChange={e => handleSelect('contact', e.target.value)}
                    />
                    <div className="logo-upload-area">
                      <span>📎 Sube tu logo (opcional)</span>
                    </div>
                    <motion.button
                      className="submit-btn"
                      onClick={handleSubmit}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Enviar a los expertos ✦
                    </motion.button>
                    <button className="back-btn" onClick={() => setStep(2)}>← Atrás</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        ) : (
          /* Micro-animación de éxito */
          <motion.div
            className="success-screen"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <div className="success-car">🚗💨</div>
            <h2>¡Estamos preparando tus renders!</h2>
            <p>Un experto de We Wrap It For U te contactará en menos de 24 horas.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
