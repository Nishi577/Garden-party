import React from 'react';
import { motion } from 'framer-motion';

const NavigationButton = ({ onClick, children, className = '' }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(199, 184, 234, 0.5)' }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-8 py-3 rounded-full font-semibold transition-all ${className}`}
      style={{
        background: 'linear-gradient(135deg, #F1D3CF 0%, #EAC98F 100%)',
        color: '#2E3A59',
        fontWeight: '500',
        fontSize: '1.2rem',
        padding: '16px 40px',
        borderRadius: '100px',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 8px 25px rgba(241, 211, 207, 0.4)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontFamily: 'var(--primary-font)'
      }}
    >
      {children}
    </motion.button>
  );
};

export default NavigationButton;
