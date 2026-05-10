import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const memories = [
  { text: "Your smile before my school", type: 'flower', color: '#F1D3CF' },
  { text: "The way you hold my hand", type: 'leaf', color: '#C7B8EA' },
  { text: "Your morning filter coffee", type: 'flower', color: '#EAC98F' },
  { text: "How you always know I'm sad", type: 'leaf', color: '#7FCFEF' },
  { text: "Your strength during hard times", type: 'flower', color: '#F1D3CF' },
  { text: "The 'Dabba' you packed with love", type: 'leaf', color: '#C7B8EA' },
  { text: "Our late night gossip sessions", type: 'flower', color: '#EAC98F' },
  { text: "Your prayers for my success", type: 'leaf', color: '#7FCFEF' },
  { text: "The peace I feel in your hug", type: 'flower', color: '#F1D3CF' },
  { text: "Your laugh that fills the house", type: 'leaf', color: '#C7B8EA' },
  { text: "How you never gave up on me", type: 'flower', color: '#EAC98F' },
  { text: "Your silent sacrifices", type: 'leaf', color: '#7FCFEF' },
];

export default function GardenOfMoments({ onNext }) {
  const [selected, setSelected] = useState(null);
  const [bloomed, setBloomed] = useState([]);

  const handleBloom = (i) => {
    if (!bloomed.includes(i)) setBloomed(prev => [...prev, i]);
    setSelected(memories[i]);
  };

  return (
    <div className="page" style={{ 
      background: 'linear-gradient(180deg, #FFF9F0 0%, #FDF4F5 50%, #F5F0FF 100%)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Soft Environmental Atmosphere */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
        <motion.div animate={{ opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity }} style={{ position: 'absolute', top: '10%', left: '10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, #EAC98F 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <motion.div animate={{ opacity: [0.1, 0.15, 0.1] }} transition={{ duration: 10, repeat: Infinity }} style={{ position: 'absolute', bottom: '15%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, #C7B8EA 0%, transparent 70%)', filter: 'blur(50px)' }} />
      </div>

      <div style={{ 
        zIndex: 1, width: '100%', maxWidth: 900, height: '100vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '20px', position: 'relative'
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: 'Great Vibes, cursive', fontSize: '3.5rem', color: '#2E3A59', marginBottom: 8 }}
          >
            Garden of Moments
          </motion.h2>
          <p style={{ color: '#888', fontStyle: 'italic', fontSize: '1.1rem' }}>Tap the buds to see our gratitude bloom...</p>
        </div>

        {/* The Digital Glowing Tree */}
        <div style={{ position: 'relative', width: '100%', height: 450, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
          
          {/* Main Trunk (Stylized) */}
          <svg width="200" height="400" viewBox="0 0 200 400" style={{ position: 'absolute', bottom: 0, zIndex: 0, opacity: 0.8 }}>
            <path d="M100 400 Q 100 200 100 50" stroke="#EAC98F" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M100 300 Q 50 250 20 280" stroke="#EAC98F" strokeWidth="2" fill="none" />
            <path d="M100 250 Q 150 200 180 230" stroke="#EAC98F" strokeWidth="2" fill="none" />
            <path d="M100 200 Q 60 150 30 180" stroke="#EAC98F" strokeWidth="2" fill="none" />
            <path d="M100 150 Q 140 100 170 130" stroke="#EAC98F" strokeWidth="2" fill="none" />
          </svg>

          {/* Glowing Aura */}
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{
              position: 'absolute', bottom: 100, width: 300, height: 300,
              background: 'radial-gradient(circle, rgba(234,201,143,0.3) 0%, transparent 70%)',
              borderRadius: '50%', zIndex: 0
            }}
          />

          {/* Memories (Leaves/Flowers) */}
          <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}>
            {memories.map((m, i) => {
              // Calculate positions along a canopy area
              const angle = (i / memories.length) * Math.PI * 1.8 - Math.PI * 0.9;
              const radius = 120 + Math.random() * 80;
              const x = 450 + Math.sin(angle) * radius;
              const y = 200 + Math.cos(angle) * radius * 0.6;
              const isBloomed = bloomed.includes(i);

              return (
                <motion.button
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  onClick={() => handleBloom(i)}
                  style={{
                    position: 'absolute',
                    left: `${(x / 900) * 100}%`,
                    top: `${(y / 450) * 100}%`,
                    width: 40, height: 40,
                    borderRadius: m.type === 'flower' ? '50% 50% 50% 50% / 80% 80% 20% 20%' : '2px 30px 2px 30px',
                    background: isBloomed ? m.color : '#FFF',
                    border: `2px solid ${m.color}`,
                    boxShadow: isBloomed ? `0 0 15px ${m.color}88` : '0 4px 10px rgba(0,0,0,0.05)',
                    cursor: 'pointer',
                    zIndex: 2,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1rem',
                    transition: 'all 0.4s ease'
                  }}
                >
                  {isBloomed ? '✨' : ''}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Message Reveal Area */}
        <div style={{ height: 120, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.text}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  padding: '20px 40px',
                  borderRadius: '30px',
                  border: `1px solid ${selected.color}`,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                  maxWidth: 500,
                  textAlign: 'center'
                }}
              >
                <p style={{ 
                  color: '#2E3A59', 
                  fontSize: '1.25rem', 
                  fontWeight: 500, 
                  margin: 0,
                  fontFamily: 'Inter, sans-serif'
                }}>
                  "{selected.text}"
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: bloomed.length >= 4 ? 1 : 0 }}
          className="btn-primary"
          onClick={onNext}
          style={{ marginTop: 20, padding: '16px 40px', background: 'linear-gradient(135deg, #EAC98F, #F1D3CF)' }}
        >
          Enter the Nostalgia Room 🎵
        </motion.button>
      </div>
    </div>
  );
}
