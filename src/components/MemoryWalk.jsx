import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import welcomeVideo from '../assets/animate_this_202605101514.mp4';
import mom2 from '../assets/mom/mom2.jpg';
import mom3 from '../assets/mom/mom3.jpg';
import mom4 from '../assets/mom/mom4.jpg';
import mom5 from '../assets/mom/mom5.jpg';
import mom6 from '../assets/mom/mom6.jpg';

const memories = [
  {
    photo: mom2,
    line: 'A young woman with dreams bigger than the world around her.',
    thought: 'Every dream began with your courage.',
  },
  {
    photo: mom3,
    line: 'The day love found its purest form.',
    thought: 'The world changed when you held us.',
  },
  {
    photo: mom4,
    line: 'Countless steps you took quietly — each one a gift to us.',
    thought: 'Your silence spoke volumes of love.',
  },
  {
    photo: mom5,
    line: 'The routines you built became our foundation.',
    thought: 'Discipline is love in disguise.',
  },
  {
    photo: mom6,
    line: 'All the mothers, whose efforts light the pathway we walk today.',
    thought: 'You carried us to the stars.',
  },
];

export default function MemoryWalk({ onNext }) {
  const [step, setStep] = useState(0);
  const current = memories[step];
  const isLast = step === memories.length - 1;

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
          opacity: 0.6
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
        background: 'radial-gradient(circle, transparent 0%, rgba(0,0,0,0.5) 100%)',
        zIndex: 0
      }} />

      <div style={{
        zIndex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '24px', padding: '40px 20px',
        maxWidth: '600px', width: '100%',
      }}>
        {/* Progress dots */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {memories.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === step ? '32px' : '10px',
                height: '10px',
                borderRadius: '5px',
                background: i <= step ? 'var(--blush)' : 'rgba(255,255,255,0.5)',
                transition: 'all 0.4s ease',
              }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.5 }}
            className="soft-card"
            style={{
              padding: '0',
              overflow: 'hidden',
              width: '100%',
            }}
          >
            {/* Photo */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '400px',
              overflow: 'hidden',
              backgroundColor: '#f5ede4',
            }}>
              {/* Blurred background fill */}
              <img
                src={current.photo}
                alt=""
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: '-20px',
                  width: 'calc(100% + 40px)',
                  height: 'calc(100% + 40px)',
                  objectFit: 'cover',
                  filter: 'blur(20px) brightness(0.7)',
                }}
              />
              {/* Actual centered photo */}
              <img
                src={current.photo}
                alt={`Memory ${step + 1}`}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  zIndex: 1,
                }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(transparent, rgba(46,58,89,0.8))',
                padding: '40px 24px 20px',
                zIndex: 2,
              }}>
                <p className="script" style={{ fontSize: '1.6rem', color: 'white' }}>
                  "{current.thought}"
                </p>
              </div>
            </div>

            {/* Text */}
            <div style={{ padding: '28px 32px' }}>
              <p style={{
                fontSize: '1.15rem', lineHeight: 1.7, color: '#444',
                fontStyle: 'italic',
              }}>
                {current.line}
              </p>

              {/* Music cue indicator */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                marginTop: '20px', color: 'var(--lavender)',
              }}>
                <span>🎵</span>
                <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '18px' }}>
                  {[1, 2, 3, 4, 5].map(i => (
                    <motion.div
                      key={i}
                      animate={{ height: [4, 16, 4] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                      style={{ width: '3px', background: 'var(--lavender)', borderRadius: '2px' }}
                    />
                  ))}
                </div>
                <span style={{ fontSize: '0.8rem', color: '#999' }}>soft melody playing…</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.button
          className="btn-primary"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => isLast ? onNext() : setStep(s => s + 1)}
        >
          {isLast ? 'Continue the Journey ✨' : 'Next Memory →'}
        </motion.button>
      </div>
    </div>
  );
}
