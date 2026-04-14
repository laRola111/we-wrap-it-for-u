'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageLoader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min((currentStep / steps) * 100, 100));

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => setLoading(false), 400); // Small delay before hiding
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#0a0a0a',
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff'
          }}
        >
          <div style={{ position: 'relative', width: '200px', height: '2px', backgroundColor: '#1f1f1f', marginTop: '20px' }}>
            <motion.div
              style={{
                height: '100%',
                backgroundColor: '#e51a23',
                originX: 0
              }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear', duration: 0.1 }}
            />
            {/* Knife indicator */}
            <motion.div
              style={{
                position: 'absolute',
                top: '-10px',
                width: '4px',
                height: '22px',
                backgroundColor: '#fff',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 80%)',
                boxShadow: '0 0 10px rgba(255,255,255,0.5)',
                marginLeft: '-2px'
              }}
              animate={{ left: `${progress}%` }}
              transition={{ ease: 'linear', duration: 0.1 }}
            />
          </div>
          <motion.p
             style={{ marginTop: '20px', fontFamily: 'Outfit, sans-serif', fontSize: '12px', letterSpacing: '0.1em', color: '#a3a3a3' }}
             animate={{ opacity: [0.5, 1, 0.5] }}
             transition={{ repeat: Infinity, duration: 1.5 }}
          >
            PRECISION CALIBRATING...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
