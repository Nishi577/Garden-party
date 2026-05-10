import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Shared Music Hero ── */
function MusicHero({ youtubeId, hookLine, startAt, isDark }) {
  return (
    <div style={{ 
      width: '100%', 
      marginBottom: 32, 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: 16,
      position: 'relative'
    }}>
      {/* Hidden YouTube Autoplay Player */}
      <iframe 
        width="1" 
        height="1" 
        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0&controls=0&showinfo=0&rel=0&start=${startAt}`} 
        title="Hidden Music Player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
      />
      
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="script"
        style={{ 
          fontSize: '2.2rem', 
          color: isDark ? '#F8E47C' : '#C7B8EA',
          textAlign: 'center',
          lineHeight: 1.2,
          maxWidth: 500,
          textShadow: isDark ? '0 0 15px rgba(248,228,124,0.4)' : '0 2px 10px rgba(199,184,234,0.2)'
        }}
      >
        "{hookLine}"
      </motion.p>
      
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', opacity: 0.6 }}>
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: '50%', background: isDark ? '#F8E47C' : '#C7B8EA' }} />
        <span style={{ fontSize: '0.75rem', color: isDark ? '#FFF' : '#666', letterSpacing: 1 }}>PLAYING BACKGROUND MELODY</span>
      </div>
    </div>
  );
}

/* ── 1. Memory Bloom ── */
const petalMoments = [
  "When you sat with me through every exam night, silently cheering.",
  "When you travelled hours just to surprise me on my birthday.",
  "When you cried at my success more than I did — that was love.",
  "When you chose less for yourself so I could have more.",
  "When you said 'I'm proud of you' and I felt it in my bones.",
  "When you held my hand without me even asking.",
];

export function MemoryBloom({ onBack, youtubeId, hookLine, startAt }) {
  const [openedPetals, setOpenedPetals] = useState([]);
  const [activePetal, setActivePetal] = useState(null);
  const petalAngles = [0, 60, 120, 180, 240, 300];

  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <MusicHero youtubeId={youtubeId} hookLine={hookLine} startAt={startAt} />
      
      <div style={{ marginBottom: 8 }}>
        <h3 style={{ fontFamily: 'Great Vibes, cursive', fontSize: '2.5rem', color: '#2E3A59', margin: 0 }}>Memory Bloom 🌸</h3>
        <p style={{ color: '#888', fontStyle: 'italic', fontSize: '0.9rem' }}>A petal for every time you were our strength</p>
      </div>

      <div style={{ position: 'relative', width: 280, height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(241,211,207,0.2) 0%, transparent 70%)', zIndex: 0 }} />
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }} style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #F8E47C, #EAC98F)', boxShadow: '0 0 20px rgba(248,228,124,0.4)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', border: '3px solid white' }}>💛</motion.div>
        {petalAngles.map((angle, i) => {
          const isOpen = openedPetals.includes(i);
          return (
            <motion.button
              key={i}
              initial={{ scale: 0, rotate: angle }}
              animate={{ scale: 1, rotate: angle, y: isOpen ? -15 : 0 }}
              onClick={() => { if (!isOpen) setOpenedPetals(p => [...p, i]); setActivePetal(i); }}
              style={{ position: 'absolute', width: 60, height: 90, borderRadius: '50% 50% 50% 50% / 80% 80% 20% 20%', background: isOpen ? `linear-gradient(to bottom, hsl(${340 + i * 5}, 80%, 85%), hsl(${340 + i * 5}, 70%, 75%))` : 'linear-gradient(to bottom, #FFF, #FDF4F5)', border: '1px solid rgba(241,211,207,0.2)', boxShadow: isOpen ? '0 8px 15px rgba(241,211,207,0.3)' : '0 2px 6px rgba(0,0,0,0.03)', cursor: 'pointer', zIndex: 5, transformOrigin: 'bottom center', top: '20%', left: 'calc(50% - 30px)' }}
            />
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {activePetal !== null && (
          <motion.div key={activePetal} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ background: 'white', borderRadius: 20, padding: '16px 24px', maxWidth: 380, boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #F0F0F0' }}>
            <p style={{ fontStyle: 'italic', color: '#2E3A59', fontSize: '1.05rem', margin: 0 }}>"{petalMoments[activePetal]}"</p>
          </motion.div>
        )}
      </AnimatePresence>
      <button className="btn-secondary" onClick={onBack} style={{ padding: '8px 20px', fontSize: '0.85rem' }}>← Back</button>
    </div>
  );
}

/* ── 2. Emotion Light Orb ── */
export function EmotionLightOrb({ onBack, youtubeId, hookLine, startAt }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <MusicHero youtubeId={youtubeId} hookLine={hookLine} startAt={startAt} />
      
      <div style={{ marginBottom: 8 }}>
        <h3 style={{ fontFamily: 'Great Vibes, cursive', fontSize: '2.5rem', color: '#2E3A59', margin: 0 }}>Emotion Light Orb ✨</h3>
        <p style={{ color: '#888', fontStyle: 'italic', fontSize: '0.9rem' }}>A message waiting for your touch</p>
      </div>

      <div style={{ position: 'relative', width: 200, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.1, 0.2] }} transition={{ duration: 3, repeat: Infinity }} style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', background: 'radial-gradient(circle, #C7B8EA 0%, transparent 70%)' }} />
        <motion.button
          onClick={() => setOpen(true)}
          animate={{ boxShadow: open ? '0 0 80px rgba(241,211,207,0.7)' : ['0 0 30px rgba(199,184,234,0.3)', '0 0 60px rgba(199,184,234,0.5)', '0 0 30px rgba(199,184,234,0.3)'] }}
          transition={{ duration: 2, repeat: open ? 0 : Infinity }}
          style={{ width: 120, height: 120, borderRadius: '50%', background: open ? 'linear-gradient(135deg, #FFF, #F1D3CF)' : 'radial-gradient(circle at 30% 30%, #FFF, #C7B8EA)', border: 'none', fontSize: '3.5rem', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {open ? '💌' : '✨'}
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'white', borderRadius: 24, padding: '32px', maxWidth: 400, boxShadow: '0 15px 40px rgba(0,0,0,0.1)', border: '1px solid #F1D3CF' }}>
            <p style={{ fontFamily: 'Great Vibes, cursive', fontSize: '1.8rem', color: '#C7B8EA', marginBottom: 12, textAlign: 'left' }}>Dear Mom,</p>
            <p style={{ lineHeight: 1.7, color: '#444', fontSize: '1.05rem', textAlign: 'left' }}>You were never just in the background — you were the foundation. Every time I wasn't sure I could make it, I thought of your strength, and somehow that was enough. You are the heart of our world.</p>
          </motion.div>
        )}
      </AnimatePresence>
      <button className="btn-secondary" onClick={onBack} style={{ padding: '8px 20px', fontSize: '0.85rem' }}>← Back</button>
    </div>
  );
}

/* ── 3. Rain Reflection ── */
export function RainReflection({ onBack, youtubeId, hookLine, startAt }) {
  const [tapped, setTapped] = useState([]);
  const [showNote, setShowNote] = useState(null);
  const rainNotes = ["The sound of rain reminds me of your voice.", "You were my umbrella on every stormy day.", "Thank you for being my shelter, always.", "Your love nourished my soul like rain.", "Every drop of effort watered my future.", "After every rain, you showed me the light.", "Your patience was as steady as a monsoon.", "Thank you for being there through every storm."];
  const drops = Array.from({ length: 10 }).map((_, i) => ({ x: 10 + (i * 8), delay: i * 0.4 }));

  const handleTap = (i) => {
    if (!tapped.includes(i)) setTapped(p => [...p, i]);
    setShowNote(rainNotes[i % rainNotes.length]);
    setTimeout(() => setShowNote(null), 3000);
  };

  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <MusicHero youtubeId={youtubeId} hookLine={hookLine} startAt={startAt} />
      
      <div style={{ marginBottom: 8 }}>
        <h3 style={{ fontFamily: 'Great Vibes, cursive', fontSize: '2.5rem', color: '#2E3A59', margin: 0 }}>Rain Reflection 🌧️</h3>
        <p style={{ color: '#888', fontStyle: 'italic', fontSize: '0.9rem' }}>Catch the gratitude raindrops</p>
      </div>

      <div style={{ position: 'relative', width: '100%', height: 220, borderRadius: 24, background: 'linear-gradient(180deg, #F0F9FF 0%, #E0F2FE 100%)', overflow: 'hidden', border: '1px solid rgba(127,207,239,0.1)' }}>
        {drops.map((d, i) => (
          <motion.div key={i} initial={{ y: -40, opacity: 0 }} animate={tapped.includes(i) ? { scale: [1, 2], opacity: [1, 0] } : { y: ['0%', '100%'], opacity: [0, 0.8, 0] }} transition={tapped.includes(i) ? { duration: 0.3 } : { duration: 4, delay: d.delay, repeat: Infinity, ease: "linear" }} onClick={() => handleTap(i)} style={{ position: 'absolute', left: `${d.x}%`, top: 0, fontSize: '2rem', cursor: 'pointer', zIndex: 5 }}>💧</motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {showNote && (
          <motion.div key={showNote} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} style={{ background: 'white', borderRadius: 16, padding: '16px 24px', maxWidth: 360, fontStyle: 'italic', color: '#2E3A59', fontSize: '1rem', boxShadow: '0 8px 20px rgba(0,0,0,0.05)' }}>"{showNote}"</motion.div>
        )}
      </AnimatePresence>
      <button className="btn-secondary" onClick={onBack} style={{ padding: '8px 20px', fontSize: '0.85rem' }}>← Back</button>
    </div>
  );
}
