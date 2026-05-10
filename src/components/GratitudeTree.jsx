import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Photo Fruits - All 13 images
import mom1  from '../assets/mom/mom1.jpg';
import mom2  from '../assets/mom/mom2.jpg';
import mom3  from '../assets/mom/mom3.jpg';
import mom4  from '../assets/mom/mom4.jpg';
import mom5  from '../assets/mom/mom5.jpg';
import mom6  from '../assets/mom/mom6.jpg';
import mom7  from '../assets/mom/mom7.jpg';
import mom8  from '../assets/mom/mom8.jpg';
import mom9  from '../assets/mom/mom9.jpg';
import mom10 from '../assets/mom/mom10.jpg';
import mom11 from '../assets/mom/mom11.jpeg';
import mom12 from '../assets/mom/mom12.jpeg';
import mom13 from '../assets/mom/mom13.jpeg';

import treeBg from '../assets/tree_bg.png';
import gardenBg from '../assets/garden_bg.png';

/* ─── Curated Gratitude Messages (Reduced for focus) ───────── */
const LEAVES = [
  { text: "The way you hold my hand through everything", color: '#ffc8dd' },
  { text: "Your incredible strength during hard times", color: '#caffbf' },
  { text: "The 'Dabba' you packed with so much love", color: '#fdffb6' },
  { text: "Our late-night gossip and heart-to-hearts", color: '#ffc8dd' },
  { text: "Your silent prayers for our happiness", color: '#a8edea' },
  { text: "The absolute peace we feel in your hug", color: '#bde0fe' },
  { text: "Your laugh that lights up the whole house", color: '#caffbf' },
  { text: "How you never, ever gave up on us", color: '#ffd6a5' },
];

/* ─── Photo Fruits (All 13) ────────────────────────────────── */
const FRUITS = [
  { img: mom1,  caption: 'The foundation of our joy 🌸' },
  { img: mom2,  caption: 'Timeless grace and beauty ✨' },
  { img: mom3,  caption: 'Your warmth is our home 🏡' },
  { img: mom4,  caption: 'A smile that heals everything 🌷' },
  { img: mom5,  caption: 'Strength in every step 💪' },
  { img: mom6,  caption: 'Pure elegance and love 🌿' },
  { img: mom7,  caption: 'Memories of light ☀️' },
  { img: mom8,  caption: 'A heart of pure gold 💛' },
  { img: mom9,  caption: 'Gentleness in every word 🦋' },
  { img: mom10, caption: 'Our world in your arms 🌙' },
  { img: mom11, caption: 'A moment frozen in love ❄️' },
  { img: mom12, caption: 'Always our guiding star ⭐' },
  { img: mom13, caption: 'The heart of our family ❤️' },
];

/* ─── Audio Helpers ─────────────────────────────────────────── */
const NOTES = [440, 493, 523, 587, 659, 698, 784, 880]; // Frequencies for soft plucks
let _audioCtx = null;
const getAudioCtx = () => { 
  if (!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)(); 
  return _audioCtx; 
};

function playSoftPluck(idx) {
  try {
    const c = getAudioCtx(), t = c.currentTime, f = NOTES[idx % NOTES.length];
    const o = c.createOscillator(), g = c.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(f, t);
    g.gain.setValueAtTime(0.03, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 1.2);
    o.connect(g); g.connect(c.destination);
    o.start(t); o.stop(t + 1.2);
  } catch (_) {}
}

function playMagicalChime() {
  try {
    const c = getAudioCtx(), t = c.currentTime;
    [523, 659, 784, 1047].forEach((f, i) => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = 'sine'; o.frequency.setValueAtTime(f, t + i * 0.08);
      g.gain.setValueAtTime(0.04, t + i * 0.08);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 1.5);
      o.connect(g); g.connect(c.destination);
      o.start(t + i * 0.08); o.stop(t + i * 0.08 + 1.5);
    });
  } catch (_) {}
}

/* ─── Main Component ────────────────────────────────────────── */
export default function GratitudeTree({ onNext }) {
  const [bloomed, setBloomed] = useState(new Set());
  const [openedFruits, setOpenedFruits] = useState(new Set());
  const [popup, setPopup] = useState(null);

  const bloomCount = bloomed.size + openedFruits.size;
  const totalItems = LEAVES.length + FRUITS.length;
  const growth = Math.min(1, 0.4 + (bloomCount / totalItems) * 0.6);
  const isRadiant = bloomCount >= 8;
  const allDone = bloomCount === totalItems;

  const onLeaf = (i) => {
    if (!bloomed.has(i)) {
      playSoftPluck(i);
      setBloomed(p => new Set(p).add(i));
    }
    setPopup({ kind: 'leaf', text: LEAVES[i].text });
  };

  const onFruit = (i) => {
    if (!openedFruits.has(i)) {
      playMagicalChime();
      setOpenedFruits(p => new Set(p).add(i));
    }
    setPopup({ kind: 'fruit', img: FRUITS[i].img, caption: FRUITS[i].caption });
  };

  return (
    <div className="page" style={{
      backgroundImage: `url(${gardenBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflow: 'hidden',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }}>
      {/* Gradient Overlay for Radiant Effect */}
      <motion.div
        animate={{
          background: isRadiant
            ? 'linear-gradient(180deg, rgba(255,249,240,0.6) 0%, rgba(255,243,224,0.7) 50%, rgba(241,248,233,0.8) 100%)'
            : 'linear-gradient(180deg, rgba(250,250,250,0.4) 0%, rgba(245,245,245,0.6) 100%)',
        }}
        transition={{ duration: 3 }}
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      />

      {/* Floating Magic Particles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, -150],
              x: [0, Math.sin(i) * 50],
              opacity: [0, 0.6, 0],
              scale: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              left: `${5 + Math.random() * 90}%`,
              bottom: '5%',
              width: 8, height: 8,
              borderRadius: '50%',
              background: i % 2 === 0 ? '#ffe082' : '#ffc8dd',
              filter: 'blur(2px)',
            }}
          />
        ))}
      </div>

      {/* ── Header Section ── */}
      <div style={{ textAlign: 'center', zIndex: 10, paddingTop: 40, marginBottom: 5 }}>
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="script"
          style={{
            fontSize: 'clamp(3rem, 10vw, 5.5rem)',
            color: '#4e342e',
            margin: 0,
            textShadow: isRadiant ? '0 0 40px rgba(255,200,80,0.5)' : 'none',
          }}
        >The Tree of Love</motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            color: '#8d6e63',
            fontSize: '1.2rem',
            fontStyle: 'italic',
            marginTop: 5
          }}
        >
          {allDone ? '✨ The garden is in full bloom. ✨'
            : `Unveil the memories and messages… (${bloomCount}/${totalItems})`}
        </motion.p>
      </div>

      {/* ── Tree Container ── */}
      <div style={{
        position: 'relative',
        zIndex: 5,
        width: '100%',
        maxWidth: 620,
        height: 'calc(100vh - 240px)',
        minHeight: 500,
        margin: '0 auto',
      }}>
        {/* Subtle Tree Background */}
        <motion.img 
          src={treeBg} 
          alt="" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'contain', zIndex: 0, pointerEvents: 'none', filter: 'sepia(0.5)'
          }}
        />

        {/* ── Interactive Tree SVG ── */}
        <svg viewBox="0 0 520 600" style={{
          width: '100%', height: '100%',
          position: 'absolute', top: 0, left: 0,
          zIndex: 1,
        }}>
          <defs>
            <linearGradient id="barkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4e342e" />
              <stop offset="50%" stopColor="#6d4c41" />
              <stop offset="100%" stopColor="#4e342e" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Organic Trunk Swaying Gently */}
          <motion.path
            d="M240 580 C 260 550, 260 500, 260 450 C 260 380, 260 320, 260 260 L 270 260 C 270 320, 270 380, 270 450 C 270 500, 270 550, 290 580 Z"
            fill="url(#barkGrad)"
            animate={{
              d: [
                "M240 580 C 260 550, 260 500, 260 450 C 260 380, 260 320, 260 260 L 270 260 C 270 320, 270 380, 270 450 C 270 500, 270 550, 290 580 Z",
                "M242 580 C 262 550, 265 500, 265 450 C 265 380, 262 320, 262 260 L 272 260 C 272 320, 275 380, 275 450 C 275 500, 272 550, 292 580 Z",
                "M240 580 C 260 550, 260 500, 260 450 C 260 380, 260 320, 260 260 L 270 260 C 270 320, 270 380, 270 450 C 270 500, 270 550, 290 580 Z"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            style={{ originY: "bottom" }}
          />

          {/* Symmetrical Swaying Branches */}
          <motion.g animate={{ rotate: [-0.5, 0.5, -0.5] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} style={{ originX: "265px", originY: "450px" }}>
            <motion.path d="M265 420 Q 180 390 100 420" stroke="#5d4037" strokeWidth="10" fill="none" strokeLinecap="round"
              animate={{ pathLength: growth }} initial={{ pathLength: 0 }} />
            <motion.path d="M265 420 Q 350 390 430 420" stroke="#5d4037" strokeWidth="10" fill="none" strokeLinecap="round"
              animate={{ pathLength: growth }} initial={{ pathLength: 0 }} />
          </motion.g>

          <motion.g animate={{ rotate: [0.8, -0.8, 0.8] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} style={{ originX: "265px", originY: "350px" }}>
            <motion.path d="M265 340 Q 160 300 80 320" stroke="#6d4c41" strokeWidth="8" fill="none" strokeLinecap="round"
              animate={{ pathLength: growth }} initial={{ pathLength: 0 }} transition={{ delay: 0.2 }} />
            <motion.path d="M265 340 Q 370 300 450 320" stroke="#6d4c41" strokeWidth="8" fill="none" strokeLinecap="round"
              animate={{ pathLength: growth }} initial={{ pathLength: 0 }} transition={{ delay: 0.2 }} />
          </motion.g>

          <motion.g animate={{ rotate: [-1, 1, -1] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} style={{ originX: "265px", originY: "250px" }}>
            <motion.path d="M265 260 Q 200 200 140 220" stroke="#795548" strokeWidth="6" fill="none" strokeLinecap="round"
              animate={{ pathLength: growth }} initial={{ pathLength: 0 }} transition={{ delay: 0.4 }} />
            <motion.path d="M265 260 Q 330 200 390 220" stroke="#795548" strokeWidth="6" fill="none" strokeLinecap="round"
              animate={{ pathLength: growth }} initial={{ pathLength: 0 }} transition={{ delay: 0.4 }} />
          </motion.g>

          {/* Ground Glow */}
          <ellipse cx="260" cy="580" rx="120" ry="15" fill="rgba(62, 39, 35, 0.1)" />
        </svg>

        {/* ── LEAVES (Messages) ── */}
        {LEAVES.map((leaf, i) => {
          const isB = bloomed.has(i);
          const pos = [
            [30, 32], [70, 32], 
            [20, 45], [80, 45],
            [35, 20], [65, 20],
            [50, 25], [50, 40]
          ];
          const [lx, ly] = pos[i];
          return (
            <motion.div
              key={`leaf-${i}`}
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                delay: 0.5 + i * 0.1,
                y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 5 + i, repeat: Infinity, ease: "easeInOut" }
              }}
              whileHover={{ scale: 1.2, zIndex: 30 }}
              onClick={() => onLeaf(i)}
              style={{
                position: 'absolute', left: `${lx}%`, top: `${ly}%`,
                width: 34, height: 44, cursor: 'pointer', zIndex: 20,
                transform: 'translate(-50%,-50%)',
                borderRadius: '50% 0 50% 0',
                background: isB 
                  ? `linear-gradient(135deg, white 0%, ${leaf.color} 60%, ${leaf.color}dd 100%)`
                  : 'linear-gradient(135deg, #e0ddd5 0%, #c0bbb0 100%)',
                boxShadow: isB ? `0 0 20px ${leaf.color}88` : 'none',
                border: isB ? `1px solid ${leaf.color}` : '1px solid #dcd9d0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.6s ease'
              }}
            >
              {isB && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ fontSize: 12 }}>✨</motion.span>}
            </motion.div>
          );
        })}

        {/* ── FRUITS (Photo Orbs) ── */}
        {FRUITS.map((fruit, i) => {
          const isO = openedFruits.has(i);
          const fPos = [
            [15, 52], [85, 52], // Layer 1 tips
            [12, 38], [88, 38], // Layer 2 tips
            [18, 25], [82, 25], // Layer 3 tips
            [50, 15],          // Top
            [35, 50], [65, 50], // Mid inner
            [25, 65], [75, 65], // Lower outer
            [40, 75], [60, 75], // Lower inner
          ];
          const [fx, fy] = fPos[i];
          return (
            <motion.div
              key={`fruit-${i}`}
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                y: [0, 8, 0]
              }}
              transition={{ 
                delay: 1 + i * 0.1,
                y: { duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }
              }}
              whileHover={{ scale: 1.15 }}
              onClick={() => onFruit(i)}
              style={{
                position: 'absolute', left: `${fx}%`, top: `${fy}%`,
                width: 52, height: 52, cursor: 'pointer', zIndex: 25,
                transform: 'translate(-50%,-50%)',
              }}
            >
              {/* Organic Fruit Orb */}
              <motion.div
                animate={{
                  boxShadow: isO ? '0 0 30px #ffe082' : '0 0 10px rgba(255,255,255,0.3)',
                  background: isO 
                    ? 'radial-gradient(circle, #fff 0%, #ffecb3 50%, #ffe082 100%)'
                    : 'radial-gradient(circle, #fecfef 0%, #ff9a9e 100%)',
                }}
                style={{
                  width: '100%', height: '100%',
                  borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', // Peach shape
                  border: '2px solid rgba(255,255,255,0.6)',
                }}
              />
              
              {/* Sparkle peek */}
              <AnimatePresence>
                {isO && (
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <img src={fruit.img} alt="" style={{ width: '70%', height: '70%', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid white' }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* ── Modals & Interaction Popups ── */}
      <AnimatePresence>
        {popup?.kind === 'leaf' && (
          <motion.div
            key="leaf-modal"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            onClick={() => setPopup(null)}
            style={{
              position: 'fixed', bottom: '18vh', left: '50%', x: '-50%',
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(20px)', padding: '24px 40px',
              borderRadius: '40px 40px 10px 40px',
              boxShadow: '0 20px 60px rgba(78,52,46,0.15)',
              border: '1px solid rgba(255,255,255,0.5)',
              maxWidth: '85vw', width: 440, textAlign: 'center',
              zIndex: 100, cursor: 'pointer',
            }}
          >
            <p className="script" style={{ margin: 0, fontSize: '1.8rem', color: '#4e342e', lineHeight: 1.3 }}>
              "{popup.text}"
            </p>
            <p style={{ margin: '8px 0 0', fontSize: '0.8rem', color: '#8d6e63', fontWeight: 600 }}>TAP TO CLOSE</p>
          </motion.div>
        )}

        {popup?.kind === 'fruit' && (
          <motion.div
            key="fruit-modal"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setPopup(null)}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(46,34,30,0.9)',
              backdropFilter: 'blur(15px)', zIndex: 200,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {/* The "Peel-Back" Reveal Animation Container */}
            <motion.div
              initial={{ scale: 0.5, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 15 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={e => e.stopPropagation()}
              style={{
                width: '85vw', maxWidth: 480, background: '#fff', borderRadius: 32,
                padding: 12, position: 'relative', overflow: 'hidden',
                boxShadow: '0 40px 100px rgba(0,0,0,0.5)'
              }}
            >
              {/* Outer Peel Layers */}
              <motion.div
                initial={{ x: 0 }} animate={{ x: '-100%' }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
                style={{
                  position: 'absolute', inset: 0, zIndex: 5,
                  background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                }}
              />
              <motion.div
                initial={{ x: 0 }} animate={{ x: '100%' }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
                style={{
                  position: 'absolute', inset: 0, zIndex: 5,
                  background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                }}
              />

              <img src={popup.img} alt="" style={{ width: '100%', borderRadius: 24, display: 'block', maxHeight: '60vh', objectFit: 'cover' }} />
              <div style={{ padding: '24px 10px 10px', textAlign: 'center' }}>
                <h2 className="script" style={{ fontSize: '2.5rem', color: '#4e342e', margin: 0 }}>{popup.caption}</h2>
                <motion.div 
                  animate={{ opacity: [0.5, 1, 0.5] }} 
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ color: '#8d6e63', fontSize: '0.9rem', marginTop: 10, letterSpacing: 2 }}
                >✨ MAGICAL MOMENT ✨</motion.div>
              </div>

              <button
                onClick={() => setPopup(null)}
                style={{
                  position: 'absolute', top: 20, right: 20, zIndex: 10,
                  background: 'rgba(255,255,255,0.9)', color: '#4e342e',
                  border: 'none', borderRadius: '50%', width: 44, height: 44,
                  fontSize: 20, cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }}
              >✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Progress & CTA ── */}
      <div style={{
        position: 'absolute', bottom: '4vh', zIndex: 50,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20
      }}>
        {/* Modern Progress Bar */}
        <div style={{ width: 280, height: 6, background: 'rgba(0,0,0,0.05)', borderRadius: 10, overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(bloomCount / totalItems) * 100}%` }}
            style={{ height: '100%', background: 'linear-gradient(90deg, #ff9a9e, #ffd6a5)', boxShadow: '0 0 10px #ff9a9e' }}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="btn-primary"
          style={{
            background: 'linear-gradient(135deg, #4e342e, #6d4c41)',
            padding: '18px 56px', fontSize: '1.2rem', borderRadius: 60,
            opacity: bloomCount >= 6 ? 1 : 0.4,
            pointerEvents: bloomCount >= 6 ? 'auto' : 'none',
            boxShadow: '0 15px 35px rgba(78,52,46,0.2)'
          }}
        >
          {allDone ? "Continue the Magic ✨" : "Reveal More Memories 🎵"}
        </motion.button>
      </div>
    </div>
  );
}
