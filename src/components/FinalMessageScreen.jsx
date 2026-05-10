import React from 'react';
import { motion } from 'framer-motion';
import NavigationButton from './NavigationButton';
import finalMomImg from '../assets/mom/Whatse2ed2edApp Image 2026-05-10 at 15.34.48.jpeg';

const FinalMessageScreen = ({ onNext }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center text-center"
      style={{ maxWidth: '700px', width: '100%', padding: '20px' }}
    >
      {/* Constellation Animation */}
      <div style={{ position: 'relative', height: '300px', width: '100%', marginBottom: '40px' }}>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2 + Math.random() * 2, 
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              position: 'absolute',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: '8px',
              height: '8px',
              backgroundColor: '#F8E47C',
              borderRadius: '50%',
              boxShadow: '0 0 15px #F8E47C'
            }}
          />
        ))}
        {/* Simple connecting lines for constellation look */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
          <line x1="20%" y1="30%" x2="40%" y2="50%" stroke="rgba(248, 228, 124, 0.2)" strokeWidth="1" />
          <line x1="40%" y1="50%" x2="70%" y2="40%" stroke="rgba(248, 228, 124, 0.2)" strokeWidth="1" />
          <line x1="70%" y1="40%" x2="80%" y2="70%" stroke="rgba(248, 228, 124, 0.2)" strokeWidth="1" />
          <line x1="40%" y1="50%" x2="30%" y2="80%" stroke="rgba(248, 228, 124, 0.2)" strokeWidth="1" />
        </svg>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            fontSize: '5rem',
            filter: 'drop-shadow(0 0 20px rgba(248, 228, 124, 0.5))'
          }}
        >
          ✨
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="mother-card"
        style={{ 
          padding: '60px', 
          background: 'rgba(255, 253, 248, 0.9)', 
          color: '#2E3A59',
          boxShadow: '0 30px 70px rgba(241, 211, 207, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px'
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ width: '100%', maxWidth: '250px' }}
        >
          <img 
            src={finalMomImg} 
            alt="Mom Final" 
            style={{ 
              width: '100%', 
              borderRadius: '50%', 
              border: '6px solid white',
              boxShadow: '0 10px 30px rgba(241, 211, 207, 0.4)'
            }} 
          />
          <p className="script-text" style={{ fontSize: '1.5rem', marginTop: '15px' }}>
            "You are our eternal constellation."
          </p>
        </motion.div>

        <p style={{ 
          fontSize: '2rem', 
          lineHeight: 1.6, 
          fontFamily: 'var(--script-font)',
          marginBottom: '20px',
          color: '#2E3A59'
        }}>
          “Mom, everything we are is built on your discipline, your effort, your love. <br/>
          You carried us from tiny footsteps to cosmic heights. <br/>
          You are our eternal constellation — always guiding, always shining.”
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <NavigationButton onClick={onNext}>
            View Your Star Certificate 🌟
          </NavigationButton>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FinalMessageScreen;
