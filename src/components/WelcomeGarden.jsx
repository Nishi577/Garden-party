import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import welcomeVideo from '../assets/animate_this_202605101514.mp4';
import mom1 from '../assets/mom/mom1.jpg';

const affirmations = [
  { emoji: '🌸', text: 'You are endlessly loved' },
  { emoji: '✨', text: 'Your kindness lights the world' },
  { emoji: '🦋', text: 'Grace runs in your veins' },
  { emoji: '🌷', text: 'You make ordinary days magical' },
  { emoji: '💫', text: 'The stars shine because of you' },
];

export default function WelcomeGarden({ onNext }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div className="page" style={{ background: '#000' }}>
      {/* Premium Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          opacity: 0.7
        }}
      >
        <source src={welcomeVideo} type="video/mp4" />
      </video>

      {/* Overlay for readability */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle, transparent 0%, rgba(0,0,0,0.4) 100%)',
        zIndex: 0
      }} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px',
          padding: '40px 20px',
          maxWidth: '700px',
          textAlign: 'center',
          justifyContent: 'center',
          minHeight: '100vh'
        }}
      >
        {/* Mom image with soft frame */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          style={{ position: 'relative' }}
        >
          <img
            src={mom1}
            alt="Mom"
            style={{
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '6px solid white',
              boxShadow: '0 15px 50px rgba(199, 184, 234, 0.4)',
            }}
          />
          <motion.div
            className="glow-pulse"
            style={{
              position: 'absolute', inset: '-8px',
              borderRadius: '50%',
              border: '2px solid rgba(199,184,234,0.3)',
            }}
          />
        </motion.div>

        {/* Title */}
        <div className="soft-card" style={{ padding: '40px 50px', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(15px)' }}>
          <h1
            className="script"
            style={{ fontSize: '3.5rem', color: 'var(--deep)', marginBottom: '16px' }}
          >
            Welcome to Your Garden, Mom
          </h1>
          <p style={{ fontSize: '1.2rem', lineHeight: 1.7, color: '#444' }}>
            Today is a celebration of the strength, love, and quiet magic 
            that carried us from small steps to star-filled heights.
          </p>
        </div>

        {/* Floating Affirmation Orbs */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {affirmations.map((a, i) => (
            <motion.div
              key={i}
              onHoverStart={() => setHoveredIdx(i)}
              onHoverEnd={() => setHoveredIdx(null)}
              whileHover={{ scale: 1.15, y: -8 }}
              className="float"
              style={{
                animationDelay: `${i * 0.5}s`,
                width: '72px', height: '72px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.95)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2rem',
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              {a.emoji}
              <AnimatePresence>
                {hoveredIdx === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: -60, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    style={{
                      position: 'absolute',
                      bottom: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'white',
                      padding: '10px 18px',
                      borderRadius: '16px',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                      whiteSpace: 'nowrap',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: 'var(--deep)',
                    }}
                  >
                    {a.text}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          className="btn-primary"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={onNext}
          style={{ marginTop: '8px', fontSize: '1.25rem', padding: '18px 48px' }}
        >
          Begin the Journey 🌸
        </motion.button>
      </motion.div>
    </div>
  );
}
