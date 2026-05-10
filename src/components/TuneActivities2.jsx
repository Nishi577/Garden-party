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

/* ── 4. Happy Micro-Moments Wheel ── */
const wheelSegments = [
  { label: 'Your morning smile before school', color: '#F1D3CF', icon: '☀️' },
  { label: 'Your voice waking me up gently', color: '#C7B8EA', icon: '🌸' },
  { label: 'Your way of celebrating small wins', color: '#7FCFEF', icon: '🎉' },
  { label: 'Your chai on cold evenings', color: '#EAC98F', icon: '☕' },
  { label: 'Your laugh that lit the room', color: '#F8E47C', icon: '😄' },
  { label: 'Your hug that fixed everything', color: '#FBCFE8', icon: '🤗' },
];

export function MicroMomentsWheel({ onBack, youtubeId, hookLine, startAt }) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    const spins = 1800 + Math.random() * 1000;
    const finalRot = rotation + spins;
    setRotation(finalRot);
    setTimeout(() => {
      const normalised = finalRot % 360;
      const idx = Math.floor(((360 - normalised) % 360) / (360 / wheelSegments.length));
      setResult(wheelSegments[idx % wheelSegments.length]);
      setSpinning(false);
    }, 4000);
  };

  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <MusicHero youtubeId={youtubeId} hookLine={hookLine} startAt={startAt} />
      
      <div style={{ marginBottom: 8 }}>
        <h3 style={{ fontFamily: 'Great Vibes, cursive', fontSize: '2.5rem', color: '#2E3A59', margin: 0 }}>Micro-Moments Wheel 🎡</h3>
        <p style={{ color: '#888', fontStyle: 'italic', fontSize: '0.9rem' }}>Spin for a small, beautiful memory</p>
      </div>

      <div style={{ position: 'relative', width: 240, height: 240 }}>
        <div style={{ position: 'absolute', top: -15, left: '50%', transform: 'translateX(-50%)', fontSize: '2rem', zIndex: 10 }}>📍</div>
        <motion.div animate={{ rotate: rotation }} transition={{ duration: 4, ease: [0.1, 0.7, 0.2, 1] }} style={{ width: 240, height: 240, borderRadius: '50%', overflow: 'hidden', position: 'relative', border: '8px solid white', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', background: 'white' }}>
          <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
            {wheelSegments.map((seg, i) => {
              const angle = 360 / wheelSegments.length;
              const startA = (i * angle) * Math.PI / 180;
              const endA = ((i + 1) * angle) * Math.PI / 180;
              const x1 = 100 + 100 * Math.cos(startA);
              const y1 = 100 + 100 * Math.sin(startA);
              const x2 = 100 + 100 * Math.cos(endA);
              const y2 = 100 + 100 * Math.sin(endA);
              return <path key={i} d={`M100,100 L${x1},${y1} A100,100 0 0,1 ${x2},${y2} Z`} fill={seg.color} stroke="white" strokeWidth="1" />;
            })}
          </svg>
        </motion.div>
      </div>

      <button className="btn-primary" onClick={spin} disabled={spinning} style={{ padding: '12px 32px', fontSize: '1rem', opacity: spinning ? 0.7 : 1 }}>{spinning ? 'SPINNING...' : 'TAP TO SPIN 🎡'}</button>
      
      <AnimatePresence mode="wait">
        {result && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ background: 'white', borderRadius: 20, padding: '16px 24px', maxWidth: 360, border: `2px solid ${result.color}`, boxShadow: '0 8px 20px rgba(0,0,0,0.05)' }}>
            <p style={{ fontWeight: 600, color: '#2E3A59', fontSize: '1.05rem', margin: 0 }}>"{result.label}"</p>
          </motion.div>
        )}
      </AnimatePresence>
      <button className="btn-secondary" onClick={onBack} style={{ padding: '8px 20px', fontSize: '0.85rem' }}>← Back</button>
    </div>
  );
}

/* ── 5. Support Timeline ── */
export function SupportTimeline({ onBack, youtubeId, hookLine, startAt }) {
  const [active, setActive] = useState(null);
  const supportDots = [{ label: 'First Step', msg: 'When I didn\'t know how to start, you were the beginning.' }, { label: 'First Fall', msg: 'When I failed, you didn\'t say a word — you just held me.' }, { label: 'The Climb', msg: 'You worked quietly in the background so I could climb higher.' }, { label: 'The Peak', msg: 'You were prouder of my wins than I ever was myself.' }, { label: 'The Journey Ahead', msg: 'And even now, your belief in me is the road I walk on.' }];

  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <MusicHero youtubeId={youtubeId} hookLine={hookLine} startAt={startAt} />
      
      <div style={{ marginBottom: 8 }}>
        <h3 style={{ fontFamily: 'Great Vibes, cursive', fontSize: '2.5rem', color: '#2E3A59', margin: 0 }}>Support Timeline 🌿</h3>
        <p style={{ color: '#888', fontStyle: 'italic', fontSize: '0.9rem' }}>The trail of love you left behind</p>
      </div>

      <div style={{ position: 'relative', width: '100%', maxWidth: 440, height: 120, background: 'rgba(255,255,255,0.2)', borderRadius: 24, padding: '10px' }}>
        <svg viewBox="0 0 440 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          <path d="M 30 70 Q 110 20 190 60 Q 270 100 350 40 Q 390 20 420 50" fill="none" stroke="#C7B8EA" strokeWidth="3" strokeDasharray="8 4" />
          {supportDots.map((dot, i) => {
            const positions = [[30,70],[110,30],[200,65],[340,45],[420,50]];
            const [cx, cy] = positions[i];
            return (
              <motion.circle key={i} cx={cx} cy={cy} r={active === i ? 18 : 14} fill={active === i ? '#EAC98F' : 'white'} stroke="#C7B8EA" strokeWidth="3" onClick={() => setActive(i)} style={{ cursor: 'pointer', filter: active === i ? 'drop-shadow(0 0 10px rgba(234,201,143,0.5))' : 'none' }} />
            );
          })}
        </svg>
      </div>

      <AnimatePresence mode="wait">
        {active !== null && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'white', borderRadius: 20, padding: '20px', maxWidth: 360, boxShadow: '0 8px 20px rgba(0,0,0,0.05)' }}>
            <p style={{ fontStyle: 'italic', color: '#444', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>"{supportDots[active].msg}"</p>
          </motion.div>
        )}
      </AnimatePresence>
      <button className="btn-secondary" onClick={onBack} style={{ padding: '8px 20px', fontSize: '0.85rem' }}>← Back</button>
    </div>
  );
}

/* ── 6. Sky Lantern Release ── */
export function SkyLantern({ onBack, youtubeId, hookLine, startAt }) {
  const [released, setReleased] = useState(false);

  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <MusicHero youtubeId={youtubeId} hookLine={hookLine} startAt={startAt} isDark={true} />
      
      <div style={{ marginBottom: 8 }}>
        <h3 style={{ fontFamily: 'Great Vibes, cursive', fontSize: '2.5rem', color: released ? 'white' : '#2E3A59', transition: 'color 1s' }}>Sky Lantern 🏮</h3>
        <p style={{ color: released ? 'rgba(255,255,255,0.6)' : '#888', fontStyle: 'italic', fontSize: '0.9rem', transition: 'color 1s' }}>Let your gratitude fly to the stars</p>
      </div>

      <div style={{ position: 'relative', width: '100%', height: 260, background: released ? 'transparent' : 'rgba(0,0,0,0.02)', borderRadius: 32, overflow: 'hidden' }}>
        {released && Array.from({ length: 30 }).map((_, i) => (
          <motion.div key={i} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, delay: Math.random() * 5, repeat: Infinity }} style={{ position: 'absolute', top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, width: 2, height: 2, borderRadius: '50%', background: 'white', boxShadow: '0 0 8px white' }} />
        ))}
        <motion.div onClick={() => !released && setReleased(true)} animate={released ? { y: -280, opacity: [1, 1, 0], scale: [1, 0.5] } : { y: [0, -10, 0] }} transition={released ? { duration: 4 } : { duration: 2, repeat: Infinity }} style={{ position: 'absolute', bottom: 30, left: 'calc(50% - 35px)', width: 70, height: 90, cursor: 'pointer', zIndex: 20 }}>
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to bottom, #F8E47C, #EAC98F)', borderRadius: '8px 8px 40% 40%', boxShadow: '0 0 30px rgba(248,228,124,0.5)', position: 'relative' }} />
        </motion.div>
      </div>

      <AnimatePresence>
        {released && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2 }} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 24, padding: '24px 32px', maxWidth: 400, border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(15px)' }}>
            <p style={{ fontFamily: 'Great Vibes, cursive', fontSize: '2rem', color: '#F8E47C', marginBottom: 8 }}>Forever Grateful</p>
            <p style={{ color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, fontSize: '1.1rem' }}>"Thank you for lifting me higher than the sky. You are the star that guides me home."</p>
          </motion.div>
        )}
      </AnimatePresence>
      <button className="btn-secondary" onClick={onBack} style={{ padding: '8px 20px', fontSize: '0.85rem', color: released ? 'white' : '#AAA', borderColor: released ? 'rgba(255,255,255,0.2)' : '#EEE' }}>← Back</button>
    </div>
  );
}
