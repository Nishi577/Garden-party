import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import mom1 from '../assets/mom/mom1.jpg';

function Petal({ delay }) {
  const x = Math.random() * 100;
  const size = 12 + Math.random() * 10;
  return (
    <motion.div
      initial={{ opacity: 0, y: '110vh', x: `${x}vw`, rotate: 0 }}
      animate={{ opacity: [0, 1, 1, 0], y: '-10vh', rotate: 360 }}
      transition={{ duration: 6 + Math.random() * 4, delay, repeat: Infinity, ease: 'linear' }}
      style={{
        position: 'fixed', zIndex: 0,
        width: size, height: size * 0.7,
        borderRadius: '50% 0 50% 0',
        background: `hsl(${340 + Math.random() * 30}, 80%, ${80 + Math.random() * 10}%)`,
        opacity: 0.6,
      }}
    />
  );
}

const letter = `Dear Mom,

There are no words big enough to thank you for everything you have done for us… but let me still try.

You have always woken up before the sun, just so we could sleep a little more. You chose our happiness over your own rest. Our dreams over your comfort. Our future over your present.
Mom, these were never small things… they were your quiet, everyday love.

Every meal you cooked, every shirt you ironed, every night you stayed awake worrying for us — everything showed how deeply you cared.
You taught us that discipline is not punishment, but real love.
You taught us that strength is not loud, but the silent courage of showing up every single day.

Mom, you have balanced work and home so beautifully — kaam pan, ghar pan… and still no complaints. Even after Dad was not around, you handled us with so much strength and patience. You supported Dad, and you supported us, through every high and low of life.

And with all this, your food… Mom, not even once it tasted bad. Kabhi nahi. Your cooking is the best in the world — for us, your haath-nu food is worth millions. It is comfort, it is love, it is home.

We are so grateful for every effort you made — for our family, for our life. We know we can never return all that you have done… but we promise, truly promise, we will always try our best to give you back as much as we can, in every way possible.

The world may not give you a trophy for all of this… but in our hearts, you already hold every award.

You didn’t just raise us, Mom.
You lifted us — to the moon, to the stars, to everything beyond.

Thank you… for everything.

With all our love,
Your kids 💛.`;

export default function LoveCapsule({ onRestart, badge }) {
  const [orbOpen, setOrbOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    if (orbOpen) {
      setPetals(Array.from({ length: 20 }, (_, i) => i));
      const timer = setTimeout(() => setShowLetter(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [orbOpen]);

  return (
    <div className="page" style={{
      background: 'linear-gradient(180deg, #1a1128 0%, #2d1b4e 40%, #3d1f5c 100%)',
      minHeight: '100vh',
    }}>
      {/* Petals */}
      {petals.map(i => <Petal key={i} delay={i * 0.3} />)}

      {/* Stars */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="glow-pulse"
          style={{
            position: 'fixed',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: 2 + Math.random() * 3,
            height: 2 + Math.random() * 3,
            borderRadius: '50%',
            background: 'white',
            animationDelay: `${Math.random() * 5}s`,
            zIndex: 0,
          }}
        />
      ))}

      <div style={{
        zIndex: 1, maxWidth: '650px', width: '100%',
        padding: '40px 20px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px',
      }}>
        <AnimatePresence mode="wait">
          {!orbOpen ? (
            /* Glowing orb */
            <motion.div
              key="orb"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 2 }}
              style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '32px', marginTop: '15vh',
              }}
            >
              <h2 className="script" style={{ fontSize: '2.5rem', color: 'rgba(255,255,255,0.9)' }}>
                A gift, just for you
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
                Tap the orb to open your love capsule
              </p>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setOrbOpen(true)}
                animate={{
                  boxShadow: [
                    '0 0 40px rgba(199,184,234,0.3)',
                    '0 0 80px rgba(199,184,234,0.6)',
                    '0 0 40px rgba(199,184,234,0.3)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  width: '200px', height: '200px', borderRadius: '50%',
                  background: 'radial-gradient(circle at 40% 35%, rgba(255,255,255,0.3), rgba(199,184,234,0.4), rgba(241,211,207,0.3))',
                  border: '2px solid rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '4rem',
                  backdropFilter: 'blur(10px)',
                }}
              >
                💌
              </motion.button>
            </motion.div>
          ) : (
            /* Letter */
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              style={{ width: '100%' }}
            >
              {/* Mom photo */}
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <motion.img
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: 'spring' }}
                  src={mom1}
                  alt="Mom"
                  style={{
                    width: '120px', height: '120px', borderRadius: '50%',
                    objectFit: 'cover', border: '4px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 10px 40px rgba(199,184,234,0.4)',
                  }}
                />
              </div>

              {/* Letter card */}
              <motion.div
                className="soft-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                style={{
                  padding: '48px 40px',
                  background: 'rgba(255,255,255,0.92)',
                  maxHeight: '65vh',
                  overflowY: 'auto',
                }}
              >
                <pre style={{
                  fontFamily: 'var(--font-body)',
                  whiteSpace: 'pre-wrap',
                  fontSize: '1.25rem',
                  lineHeight: 1.8,
                  color: '#444',
                }}>
                  {letter}
                </pre>
              </motion.div>

              {/* Badge if earned */}
              {badge && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}
                  style={{
                    textAlign: 'center', marginTop: '24px',
                    padding: '20px', borderRadius: '20px',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                >
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginBottom: '8px' }}>
                    Your Badge of Honor
                  </p>
                  <p style={{ color: 'white', fontSize: '1.2rem' }}>
                    {badge.icon} {badge.title}
                  </p>
                </motion.div>
              )}

              {/* Final message */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="script"
                style={{
                  textAlign: 'center', fontSize: '2rem',
                  color: 'rgba(255,255,255,0.8)',
                  marginTop: '32px',
                }}
              >
                "Thank you for everything — you brought us to the stars." ✨
              </motion.p>

              <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3 }}
                  className="btn-primary"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onRestart}
                  style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  Start Over 🌸
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
