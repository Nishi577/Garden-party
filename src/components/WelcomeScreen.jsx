import React from 'react';
import { motion } from 'framer-motion';
import NavigationButton from './NavigationButton';
import { Music2, Heart } from 'lucide-react';
import momImg from '../assets/mom/3ee.jpeg';

const WelcomeScreen = ({ onNext }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
      className="mother-card"
      style={{
        maxWidth: '700px',
        width: '100%',
        padding: '60px 40px',
        textAlign: 'center',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px'
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        style={{ width: '100%', maxWidth: '300px', marginBottom: '10px' }}
      >
        <img 
          src={momImg} 
          alt="Mom" 
          style={{ 
            width: '100%', 
            borderRadius: '100px 100px 20px 20px', 
            border: '8px solid white',
            boxShadow: '0 10px 30px rgba(241, 211, 207, 0.5)'
          }} 
        />
        <p className="script-text" style={{ fontSize: '1.8rem', marginTop: '15px' }}>
          "A mother's love is the heart's first home."
        </p>
      </motion.div>
      <motion.div
        animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
        style={{ position: 'absolute', top: '30px', right: '40px', color: '#F1D3CF', opacity: 0.8 }}
      >
        <Music2 size={32} />
      </motion.div>

      <h1 className="gradient-text" style={{ fontSize: '4.5rem', marginBottom: '0', lineHeight: 1.1 }}>
        Welcome to Your Journey, Mom
      </h1>
      
      <p style={{ 
        fontSize: '1.4rem', 
        color: '#2E3A59', 
        lineHeight: 1.6, 
        marginBottom: '8px',
        fontStyle: 'italic'
      }}>
        Today is a celebration of the strength, love, and quiet magic that carried us from small steps to star-filled heights.
      </p>

      <NavigationButton onClick={onNext}>
        Begin Your Journey 🌸
      </NavigationButton>

      <div style={{ position: 'absolute', bottom: '30px', left: '40px', fontSize: '2rem' }}>🌻</div>
      <div style={{ position: 'absolute', top: '40px', left: '40px', fontSize: '1rem' }}>✨</div>
    </motion.div>
  );
};

export default WelcomeScreen;
