import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavigationButton from './NavigationButton';
import momStickerImg from '../assets/mom/WhatsApp Ima3ededge 2026-05-10 at 15.34.55.jpeg';

const stickers = [
  { name: 'Dancing Flower', icon: '🌻', color: '#F1D3CF' },
  { name: 'Confident Star', icon: '⭐', color: '#F8E47C' },
  { name: 'Peaceful Cloud', icon: '☁️', color: '#7FCFEF' },
  { name: 'Happy Sun', icon: '☀️', color: '#EAC98F' },
  { name: 'Cool Cat', icon: '😎', color: '#C7B8EA' }
];

const MoodStickerScreen = ({ onNext, onSelectSticker }) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (sticker) => {
    setSelected(sticker);
    onSelectSticker(sticker);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mother-card"
      style={{
        maxWidth: '850px',
        width: '100%',
        padding: '50px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '30px'
      }}
    >
      <h2 className="gradient-text" style={{ fontSize: '4rem' }}>Your Sticker Book</h2>
      <p style={{ color: '#2E3A59', fontSize: '1.4rem', fontStyle: 'italic' }}>Capture today’s spirit with a special sticker!</p>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        {/* Book Left Page (Sticker Collection) */}
        <div style={{ 
          flex: 1, 
          minWidth: '300px', 
          background: 'rgba(255,255,255,0.5)', 
          padding: '30px', 
          borderRadius: '20px', 
          border: '2px dashed #C7B8EA',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center'
        }}>
          {stickers.map((sticker) => (
            <motion.button
              key={sticker.name}
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSelect(sticker)}
              style={{
                fontSize: '3.5rem',
                background: selected?.name === sticker.name ? sticker.color : 'white',
                border: selected?.name === sticker.name ? '3px solid white' : '2px solid #eee',
                borderRadius: '20px',
                padding: '10px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: selected?.name === sticker.name ? `0 10px 20px ${sticker.color}` : '0 5px 10px rgba(0,0,0,0.05)'
              }}
            >
              {sticker.icon}
            </motion.button>
          ))}
        </div>

        {/* Book Right Page (Preview) */}
        <div style={{ 
          flex: 1, 
          minWidth: '300px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: '20px'
        }}>
          <div style={{ position: 'relative', width: '220px' }}>
            <img 
              src={momStickerImg} 
              alt="Mom Portrait" 
              style={{ 
                width: '100%', 
                borderRadius: '20px', 
                border: '6px solid white',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }} 
            />
            <AnimatePresence>
              {selected && (
                <motion.div
                  initial={{ scale: 0, opacity: 0, rotate: -45 }}
                  animate={{ scale: 1, opacity: 1, rotate: 15 }}
                  style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '-20px',
                    fontSize: '4rem',
                    filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.2))'
                  }}
                >
                  {selected.icon}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center' }}
              >
                <p className="script-text" style={{ fontSize: '1.4rem', color: '#2E3A59' }}>
                  “Perfectly {selected.name}!”
                </p>
                <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '5px' }}>
                  A perfect reflection of your spirit today.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ marginTop: '10px' }}
          >
            <NavigationButton onClick={onNext}>
              Final Message →
            </NavigationButton>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MoodStickerScreen;
