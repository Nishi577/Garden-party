import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavigationButton from './NavigationButton';
import { Play, Music, Star, Disc } from 'lucide-react';
import momMusicImg from '../assets/mom/WhatsApp I3eemage 2026-05-10 at 15.34.52.jpeg';

const vibes = [
  { label: 'Chill', color: '#7FCFEF', emoji: '☁️' },
  { label: 'Romantic', color: '#F1D3CF', emoji: '💖' },
  { label: 'Energetic', color: '#F8E47C', emoji: '⚡' },
  { label: 'Dance Vibe', color: '#EAC98F', emoji: '💃' },
  { label: 'Classic 90s Feel', color: '#C7B8EA', emoji: '📻' }
];

const MusicGameScreen = ({ onNext, setUnlockedStickers }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVibe, setSelectedVibe] = useState(null);
  const [showReward, setShowReward] = useState(false);

  const handleVibeSelect = (vibe) => {
    setSelectedVibe(vibe);
    setShowReward(true);
    setUnlockedStickers(prev => [...prev, '90s Melody Queen']);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mother-card"
      style={{
        maxWidth: '800px',
        width: '100%',
        padding: '50px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '30px'
      }}
    >
      <h2 className="gradient-text" style={{ fontSize: '4rem' }}>Guess the Vibe!</h2>
      <p style={{ color: '#2E3A59', fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '10px' }}>
        “Music is the shorthand of emotion.” — Feel the 90s magic!
      </p>

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Vinyl Player */}
        <div style={{ position: 'relative' }}>
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{
              width: '240px',
              height: '240px',
              borderRadius: '50%',
              background: '#111',
              border: '10px solid #333',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
              position: 'relative'
            }}
          >
            {/* Vinyl grooves */}
            <div style={{ position: 'absolute', inset: '10px', borderRadius: '50%', border: '1px solid #444' }} />
            <div style={{ position: 'absolute', inset: '30px', borderRadius: '50%', border: '1px solid #444' }} />
            <div style={{ position: 'absolute', inset: '50px', borderRadius: '50%', border: '1px solid #444' }} />
            
            {/* Center Label (Mom's Photo) */}
            <div style={{ 
              width: '100px', 
              height: '100px', 
              borderRadius: '50%', 
              backgroundColor: 'white',
              overflow: 'hidden',
              border: '4px solid #C7B8EA',
              zIndex: 2
            }}>
              <img src={momMusicImg} alt="Mom" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: '#F1D3CF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 5px 15px rgba(241, 211, 207, 0.5)',
              border: '4px solid white',
              zIndex: 10
            }}
          >
            {isPlaying ? (
              <div style={{ display: 'flex', gap: '3px' }}>
                {[1, 2, 3].map(i => (
                  <motion.div
                    key={i}
                    animate={{ height: [5, 20, 5] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                    style={{ width: '4px', backgroundColor: '#2E3A59', borderRadius: '2px' }}
                  />
                ))}
              </div>
            ) : (
              <Play size={30} fill="#2E3A59" color="#2E3A59" />
            )}
          </motion.button>
        </div>

        {/* Vibe Selection */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '300px' }}>
          <p className="script-text" style={{ fontSize: '1.5rem', color: '#2E3A59' }}>What rhythm does this heart play?</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {vibes.map((vibe) => (
              <motion.button
                key={vibe.label}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleVibeSelect(vibe.label)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '20px',
                  background: selectedVibe === vibe.label ? vibe.color : 'white',
                  color: '#2E3A59',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  border: `2px solid ${vibe.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                }}
              >
                <span>{vibe.emoji}</span> {vibe.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: '20px',
              padding: '20px',
              borderRadius: '20px',
              background: 'rgba(248, 228, 124, 0.2)',
              border: '1px solid #F8E47C',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}
          >
            <Star fill="#F8E47C" color="#F8E47C" />
            <p style={{ fontWeight: 600, color: '#2E3A59' }}>
              You unlocked a new sticker: 90s Melody Queen! 🎶✨
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {showReward && (
        <NavigationButton onClick={onNext}>
          Next Step →
        </NavigationButton>
      )}
    </motion.div>
  );
};

export default MusicGameScreen;
