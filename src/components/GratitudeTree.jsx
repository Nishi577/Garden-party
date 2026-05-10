import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Sentimental gratitude messages
const memories = [
  { text: "Your smile before my school", type: 'leaf', color: '#BDE0FE' },
  { text: "The way you hold my hand", type: 'leaf', color: '#FFC8DD' },
  { text: "Your morning filter coffee", type: 'leaf', color: '#A2D2FF' },
  { text: "How you always know I'm sad", type: 'leaf', color: '#FFAFCC' },
  { text: "Your strength during hard times", type: 'leaf', color: '#BDE0FE' },
  { text: "The 'Dabba' you packed with love", type: 'leaf', color: '#FFC8DD' },
  { text: "Our late night gossip sessions", type: 'leaf', color: '#A2D2FF' },
  { text: "Your prayers for my success", type: 'leaf', color: '#FFAFCC' },
  { text: "The peace I feel in your hug", type: 'leaf', color: '#BDE0FE' },
  { text: "Your laugh that fills the house", type: 'leaf', color: '#FFC8DD' },
  { text: "How you never gave up on me", type: 'leaf', color: '#A2D2FF' },
  { text: "Your silent sacrifices", type: 'leaf', color: '#FFAFCC' },
  { text: "The warmth in your kitchen", type: 'leaf', color: '#BDE0FE' },
  { text: "Your wisdom in my confusion", type: 'leaf', color: '#FFC8DD' },
];

// Memory fruits (photos)
const fruitsData = [
  { img: '/src/assets/mom/mom7.jpg', id: 7 },
  { img: '/src/assets/mom/mom8.jpg', id: 8 },
  { img: '/src/assets/mom/mom9.jpg', id: 9 },
  { img: '/src/assets/mom/mom10.jpg', id: 10 },
];

// Soft chime sound using Web Audio API
const playChime = () => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
    oscillator.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.8); // A4

    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.8);
  } catch (e) {
    console.warn("Audio play blocked or failed", e);
  }
};

export default function GratitudeTree({ onNext }) {
  const [bloomed, setBloomed] = useState([]);
  const [openedFruits, setOpenedFruits] = useState([]);
  const [selectedText, setSelectedText] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [growth, setGrowth] = useState(0.3); // 0.3 to 1.0

  const handleLeafClick = (i) => {
    if (!bloomed.includes(i)) {
      setBloomed(prev => [...prev, i]);
      setGrowth(prev => Math.min(1, prev + 0.05));
      playChime();
    }
    setSelectedText(memories[i].text);
  };

  const handleFruitClick = (f) => {
    if (!openedFruits.includes(f.id)) {
      setOpenedFruits(prev => [...prev, f.id]);
      setGrowth(prev => Math.min(1, prev + 0.08));
      playChime();
    }
    setSelectedPhoto(f.img);
  };

  const isRadiant = bloomed.length >= 6;

  return (
    <div className="page" style={{ 
      background: 'linear-gradient(180deg, #fdfbfb 0%, #ebedee 100%)',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '40px'
    }}>
      
      {/* Radiant Glow Background */}
      <motion.div 
        animate={{ 
          opacity: isRadiant ? [0.1, 0.25, 0.1] : 0.05,
          scale: isRadiant ? [1, 1.2, 1] : 1
        }}
        transition={{ duration: 5, repeat: Infinity }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '120vw',
          height: '120vh',
          background: 'radial-gradient(circle, rgba(255,223,186,0.6) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div style={{ textAlign: 'center', zIndex: 1, position: 'relative' }}>
        <motion.h1 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="script"
          style={{ fontSize: '4.5rem', color: '#2E3A59', margin: 0, filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.1))' }}
        >
          The Gratitude Tree
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ color: '#888', fontSize: '1.2rem', fontStyle: 'italic' }}
        >
          Tap the leaves to bloom our gratitude...
        </motion.p>
      </div>

      {/* Tree Visualization Area */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '800px', height: '65vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', zIndex: 1, marginTop: '20px' }}>
        
        {/* SVG Tree Trunk (Interactive Growth) */}
        <svg width="600" height="500" viewBox="0 0 600 500" style={{ position: 'absolute', bottom: 0, pointerEvents: 'none' }}>
          <defs>
            <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#5D4037' }} />
              <stop offset="50%" style={{ stopColor: '#8D6E63' }} />
              <stop offset="100%" style={{ stopColor: '#5D4037' }} />
            </linearGradient>
          </defs>
          
          {/* Main Trunk */}
          <motion.path 
            d={`M300 500 Q 300 ${500 - 150 * growth} 300 ${500 - 300 * growth}`} 
            stroke="url(#trunkGradient)" 
            strokeWidth={20 * growth} 
            fill="none" 
            strokeLinecap="round"
          />
          
          {/* Branches */}
          <motion.path d={`M300 ${500 - 150 * growth} Q 250 ${500 - 200 * growth} 150 ${500 - 180 * growth}`} stroke="#8D6E63" strokeWidth={10 * growth} fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: growth }} />
          <motion.path d={`M300 ${500 - 200 * growth} Q 350 ${500 - 250 * growth} 450 ${500 - 220 * growth}`} stroke="#8D6E63" strokeWidth={10 * growth} fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: growth }} />
          <motion.path d={`M300 ${500 - 250 * growth} Q 250 ${500 - 320 * growth} 200 ${500 - 350 * growth}`} stroke="#8D6E63" strokeWidth={8 * growth} fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: growth }} />
          <motion.path d={`M300 ${500 - 300 * growth} Q 350 ${500 - 380 * growth} 400 ${500 - 410 * growth}`} stroke="#8D6E63" strokeWidth={8 * growth} fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: growth }} />
        </svg>

        {/* Leaves (Interactive Nodes) */}
        {memories.map((m, i) => {
          const angle = (i / memories.length) * Math.PI * 1.6 - Math.PI * 0.8;
          const radius = (180 + Math.sin(i * 2) * 60) * growth;
          const x = 300 + Math.sin(angle) * radius;
          const y = (500 - 250 * growth) + Math.cos(angle) * radius * 0.7;
          const isBloomed = bloomed.includes(i);

          return (
            <motion.div
              key={`leaf-${i}`}
              initial={{ scale: 0 }}
              animate={{ scale: growth, opacity: 1 }}
              whileHover={{ scale: growth * 1.2, rotate: 15 }}
              onClick={() => handleLeafClick(i)}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width: 35,
                height: 50,
                background: isBloomed ? m.color : 'rgba(201, 173, 167, 0.6)',
                borderRadius: '50% 50% 50% 50% / 80% 80% 20% 20%',
                cursor: 'pointer',
                boxShadow: isBloomed ? `0 0 20px ${m.color}` : '0 2px 10px rgba(0,0,0,0.05)',
                border: '2px solid rgba(255,255,255,0.4)',
                transform: `translate(-50%, -50%) rotate(${angle * 60}deg)`,
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.5s ease, box-shadow 0.5s ease'
              }}
            >
              {isBloomed && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ fontSize: '12px' }}>✨</motion.span>}
            </motion.div>
          );
        })}

        {/* Fruit Capsules (Photo Memories) */}
        {fruitsData.map((f, i) => {
          const angle = (i / fruitsData.length) * Math.PI * 1.2 - Math.PI * 0.6;
          const radius = (120 + i * 25) * growth;
          const x = 300 + Math.sin(angle) * radius;
          const y = (500 - 200 * growth) + Math.cos(angle) * radius * 0.5;
          const isOpened = openedFruits.includes(f.id);

          return (
            <motion.div
              key={`fruit-${f.id}`}
              initial={{ scale: 0 }}
              animate={{ scale: growth * 1.4, opacity: 1 }}
              whileHover={{ scale: growth * 1.6 }}
              onClick={() => handleFruitClick(f)}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width: 45,
                height: 55,
                cursor: 'pointer',
                zIndex: 3,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                {/* Capsule Visual */}
                <motion.div 
                  animate={{ y: isOpened ? -12 : 0, rotate: isOpened ? -25 : 0 }}
                  style={{
                    width: '100%', height: '50%',
                    background: 'linear-gradient(135deg, #FF9A9E 0%, #FAD0C4 100%)',
                    borderRadius: '25px 25px 0 0',
                    border: '2px solid white',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                  }}
                />
                <motion.div 
                  animate={{ y: isOpened ? 12 : 0, rotate: isOpened ? 25 : 0 }}
                  style={{
                    width: '100%', height: '50%',
                    background: 'linear-gradient(135deg, #A18CD1 0%, #FBC2EB 100%)',
                    borderRadius: '0 0 25px 25px',
                    border: '2px solid white',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                  }}
                />
                
                {/* Embedded Thumbnail */}
                {isOpened && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }}
                    style={{
                      position: 'absolute', top: '10%', left: '10%', width: '80%', height: '80%',
                      borderRadius: '50%', overflow: 'hidden', zIndex: -1, border: '2px solid #fff'
                    }}
                  >
                     <img src={f.img} alt="mom" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Overlays */}
      <AnimatePresence>
        {selectedText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => setSelectedText(null)}
            style={{
              position: 'fixed',
              bottom: '15vh',
              left: '50%',
              translateX: '-50%',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              padding: '25px 40px',
              borderRadius: '35px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
              border: '1px solid rgba(255,255,255,0.5)',
              maxWidth: '90%',
              width: '500px',
              textAlign: 'center',
              zIndex: 100,
              cursor: 'pointer'
            }}
          >
            <p style={{ margin: 0, fontSize: '1.5rem', color: '#2E3A59', fontWeight: '500', lineHeight: 1.4 }}>
              "{selectedText}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            style={{
              position: 'fixed',
              top: 0, left: 0, width: '100vw', height: '100vh',
              background: 'rgba(0,0,0,0.8)',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              zIndex: 200,
              backdropFilter: 'blur(8px)'
            }}
          >
            <motion.div 
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 10 }}
              style={{
                width: '85%',
                maxWidth: '550px',
                background: 'white',
                padding: '15px',
                borderRadius: '30px',
                boxShadow: '0 30px 100px rgba(0,0,0,0.6)',
                position: 'relative'
              }}
            >
              <img 
                src={selectedPhoto} 
                alt="Memory" 
                style={{ width: '100%', borderRadius: '20px', display: 'block', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)' }} 
              />
              <div style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(0,0,0,0.5)', color: 'white', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '20px' }}>✕</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress & Next Step */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: bloomed.length > 0 ? 1 : 0 }}
        style={{ position: 'absolute', bottom: '3vh', textAlign: 'center', zIndex: 10 }}
      >
        <p style={{ color: '#888', marginBottom: '15px', fontSize: '0.9rem' }}>
          {bloomed.length} of {memories.length} leaves bloomed ✨
        </p>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(46,58,89,0.3)' }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="btn-primary"
          style={{
            opacity: bloomed.length >= 4 ? 1 : 0.5,
            pointerEvents: bloomed.length >= 4 ? 'auto' : 'none',
            padding: '18px 50px',
            fontSize: '1.2rem',
            background: 'linear-gradient(135deg, #2E3A59 0%, #4A4E69 100%)'
          }}
        >
          Enter the Nostalgia Room 🎵
        </motion.button>
      </motion.div>

    </div>
  );
}
