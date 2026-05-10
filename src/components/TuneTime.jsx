import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MemoryBloom, EmotionLightOrb, RainReflection } from './TuneActivities1';
import { MicroMomentsWheel, SupportTimeline, SkyLantern } from './TuneActivities2';

const songs = [
  { id: 'bloom', title: 'Pal Pal Dil Ke Paas', icon: '🌸', color: '#F1D3CF', youtubeId: 'AMuRRXCuy-4', hookLine: 'Pal pal dil ke paas, tum rehti ho...', startAt: 11 },
  { id: 'orb', title: 'Dil Kya Kare', icon: '✨', color: '#C7B8EA', youtubeId: 'EnZsLEoqq-0', hookLine: 'Dil kya kare jab kisi se, kisi ko pyaar ho jaaye...', startAt: 42 },
  { id: 'rain', title: 'Rimjhim Gire Saawan', icon: '🌧️', color: '#7FCFEF', youtubeId: '6C7R_CUJgHQ', hookLine: 'Rimjhim gire saawan, sulag sulag jaaye mann...', startAt: 17 },
  { id: 'wheel', title: 'Gaata Rahe Mera Dil', icon: '🎡', color: '#F8E47C', youtubeId: 'eNlIQyAjiWs', hookLine: 'Gaata rahe mera dil, tu hi meri manzil...', startAt: 8 },
  { id: 'timeline', title: 'O Saathi Re', icon: '🌿', color: '#EAC98F', youtubeId: '_w14bUcxl1c', hookLine: 'O saathi re, tere bina bhi kya jina...', startAt: 72 },
  { id: 'lantern', title: 'Neele Neele Ambar Par', icon: '🏮', color: '#2E3A59', youtubeId: 'eVnG_Rqfgg4', hookLine: 'Neele neele ambar par, chaand jab aaye...', startAt: 64 },
];

const activityMap = {
  bloom: MemoryBloom,
  orb: EmotionLightOrb,
  rain: RainReflection,
  wheel: MicroMomentsWheel,
  timeline: SupportTimeline,
  lantern: SkyLantern,
};

/* ── Retro Vinyl Player Component ── */
function VinylPlayer({ song, isPlaying }) {
  return (
    <div style={{ position: 'relative', width: 280, height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Background Glow based on song */}
      <motion.div 
        animate={{ opacity: isPlaying ? [0.2, 0.4, 0.2] : 0.1 }}
        style={{ 
          position: 'absolute', width: 350, height: 350, borderRadius: '50%',
          background: `radial-gradient(circle, ${song?.color || '#C7B8EA'} 0%, transparent 70%)`,
          zIndex: 0
        }} 
      />

      {/* Floating Dust Particles (Simulated) */}
      {isPlaying && Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: [0, 0.3, 0], x: (Math.random() - 0.5) * 200, y: (Math.random() - 0.5) * 200 }}
          transition={{ duration: 4 + Math.random() * 4, repeat: Infinity }}
          style={{ position: 'absolute', width: 2, height: 2, background: 'white', borderRadius: '50%', zIndex: 1 }}
        />
      ))}

      {/* The Vinyl Disc */}
      <motion.div
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{
          width: 240, height: 240, borderRadius: '50%',
          background: 'radial-gradient(circle, #222 0%, #111 100%)',
          border: '4px solid #333',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', zIndex: 2
        }}
      >
        {/* Grooves */}
        <div style={{ position: 'absolute', width: '90%', height: '90%', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', width: '80%', height: '80%', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', width: '70%', height: '70%', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)' }} />
        
        {/* Label */}
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: song?.color || '#333',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '2rem', border: '3px solid white'
        }}>
          {song?.icon || '🎵'}
        </div>
        <div style={{ position: 'absolute', width: 8, height: 8, borderRadius: '50%', background: '#111', border: '1px solid #333' }} />
      </motion.div>

      {/* Needle Arm */}
      <motion.div
        animate={{ rotate: isPlaying ? 25 : 0 }}
        transition={{ type: 'spring', damping: 10 }}
        style={{
          position: 'absolute', top: 20, right: 20,
          width: 120, height: 12, background: '#888',
          borderRadius: 6, transformOrigin: 'right center',
          zIndex: 10, boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          display: 'flex', alignItems: 'center'
        }}
      >
        <div style={{ width: 30, height: 16, background: '#444', borderRadius: 4, marginLeft: -15 }} />
      </motion.div>
    </div>
  );
}

export default function TuneTime({ onNext }) {
  const [active, setActive] = useState(null);
  const [played, setPlayed] = useState([]);

  const activeSong = songs.find(s => s.id === active);
  const ActiveComponent = active ? activityMap[active] : null;

  return (
    <div className="page" style={{ 
      background: active === 'lantern' 
        ? 'linear-gradient(180deg, #0d0d1a 0%, #1a1128 50%, #0f0a1e 100%)'
        : 'linear-gradient(160deg, #1a1a2e 0%, #16213e 100%)',
      minHeight: '100vh', transition: 'background 1s ease'
    }}>
      
      <div style={{ 
        width: '100%', maxWidth: 1000, padding: '40px 20px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40,
        zIndex: 1
      }}>

        <header style={{ textAlign: 'center' }}>
          <motion.h2 
            animate={{ color: activeSong ? activeSong.color : 'white' }}
            style={{ fontFamily: 'Great Vibes, cursive', fontSize: '3.5rem', margin: 0, textShadow: '0 4px 10px rgba(0,0,0,0.3)' }}
          >
            Nostalgia Room
          </motion.h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>Pick a record to travel back in time...</p>
        </header>

        <div style={{ 
          width: '100%', display: 'flex', flexWrap: 'wrap', 
          justifyContent: 'center', alignItems: 'center', gap: 60 
        }}>
          
          {/* Hero: Vinyl Player */}
          <VinylPlayer song={activeSong} isPlaying={!!active} />

          {/* Record Selection Shelf */}
          <div style={{ 
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: 15, background: 'rgba(255,255,255,0.05)',
            padding: '25px', borderRadius: '24px', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            {songs.map((song) => (
              <motion.button
                key={song.id}
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActive(song.id);
                  if (!played.includes(song.id)) setPlayed(p => [...p, song.id]);
                }}
                style={{
                  width: 80, height: 80, borderRadius: '12px',
                  background: active === song.id ? song.color : 'rgba(255,255,255,0.1)',
                  border: `2px solid ${active === song.id ? 'white' : 'transparent'}`,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.8rem', position: 'relative', transition: 'all 0.3s ease'
                }}
              >
                {song.icon}
                {played.includes(song.id) && (
                  <div style={{ position: 'absolute', bottom: -5, right: -5, fontSize: '0.8rem' }}>✅</div>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Activity Presentation */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={{ 
                  width: '100%', maxWidth: 600, 
                  background: 'rgba(255,255,255,0.95)', 
                  borderRadius: '40px', padding: '30px',
                  boxShadow: `0 30px 100px rgba(0,0,0,0.5)`,
                  position: 'relative', overflow: 'hidden'
                }}
              >
                {/* Visualizer Waves */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 40, display: 'flex', alignItems: 'flex-end', gap: 2, opacity: 0.1 }}>
                  {Array.from({ length: 40 }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [10, Math.random() * 40, 10] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
                      style={{ width: 15, background: activeSong?.color || '#C7B8EA' }}
                    />
                  ))}
                </div>

                <ActiveComponent 
                  onBack={() => setActive(null)} 
                  youtubeId={activeSong?.youtubeId}
                  hookLine={activeSong?.hookLine}
                  startAt={activeSong?.startAt}
                />
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', marginTop: 20 }}
              >
                <p>Select a song to unlock the room's magic...</p>
                {played.length >= 2 && (
                  <button className="btn-primary" onClick={onNext} style={{ marginTop: 20 }}>
                    Proceed to the Finale 💌
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
