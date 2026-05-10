import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  {
    q: 'How many times have you chosen your kids over rest?',
    emoji: '🛌',
    options: ['Too many to count', 'Every single day', 'Rest? What rest?', 'Always, without thinking'],
  },
  {
    q: 'Which superhero power do you secretly have?',
    emoji: '🦸‍♀️',
    options: ['Healing with a hug', 'Time manipulation (fitting 48hrs in 24)', 'Mind reading', 'Infinite patience'],
  },
  {
    q: 'Pick your daily routine style.',
    emoji: '☀️',
    options: ['Sunrise warrior', 'Organized chaos master', 'Calm & steady', 'Spontaneous magic'],
  },
  {
    q: 'What fuels your energy the most?',
    emoji: '⚡',
    options: ['Seeing my kids smile', 'A quiet cup of chai', 'Music from the 90s', 'A good night\'s sleep'],
  },
];

const badges = [
  { title: 'You lifted us to the stars.', icon: '🚀', color: '#C7B8EA' },
  { title: 'Your dedication shaped our world.', icon: '🌍', color: '#7FCFEF' },
  { title: 'Your love is quiet, but its impact is cosmic.', icon: '💫', color: '#F1D3CF' },
];

export default function EffortMeter({ onNext, onBadge }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showBadge, setShowBadge] = useState(false);
  const [earnedBadge, setEarnedBadge] = useState(null);

  const handleAnswer = (ans) => {
    const next = [...answers, ans];
    setAnswers(next);
    if (step < questions.length - 1) {
      setStep(s => s + 1);
    } else {
      // Pick badge based on answers
      const idx = next.length % badges.length;
      const b = badges[idx];
      setEarnedBadge(b);
      onBadge(b);
      setShowBadge(true);
    }
  };

  return (
    <div className="page" style={{
      background: 'linear-gradient(160deg, #FFF9F0 0%, #F0E6FF 50%, #FFE8E3 100%)',
    }}>
      {/* Floating decorative elements */}
      <motion.div className="float" style={{ position: 'absolute', top: '8%', left: '10%', fontSize: '3rem', opacity: 0.3, animationDelay: '0s' }}>⭐</motion.div>
      <motion.div className="float" style={{ position: 'absolute', top: '15%', right: '8%', fontSize: '2.5rem', opacity: 0.3, animationDelay: '1s' }}>🎀</motion.div>
      <motion.div className="float" style={{ position: 'absolute', bottom: '10%', left: '15%', fontSize: '2rem', opacity: 0.25, animationDelay: '2s' }}>🌸</motion.div>
      <motion.div className="float" style={{ position: 'absolute', bottom: '20%', right: '12%', fontSize: '2rem', opacity: 0.25, animationDelay: '0.5s' }}>🌟</motion.div>

      <div style={{ zIndex: 1, maxWidth: '600px', width: '100%', padding: '40px 20px' }}>
        <AnimatePresence mode="wait">
          {!showBadge ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
            >
              {/* Progress */}
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <p style={{ fontSize: '0.85rem', color: '#888', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Question {step + 1} of {questions.length}
                </p>
                <div style={{
                  width: '100%', height: '6px', borderRadius: '3px',
                  background: 'rgba(199,184,234,0.2)', marginTop: '12px',
                }}>
                  <motion.div
                    animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                    style={{ height: '100%', borderRadius: '3px', background: 'var(--lavender)' }}
                  />
                </div>
              </div>

              {/* Question card */}
              <div className="soft-card" style={{ padding: '40px 36px', textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '20px' }}>{questions[step].emoji}</div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '32px', lineHeight: 1.4 }}>
                  {questions[step].q}
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {questions[step].options.map((opt, i) => (
                    <motion.button
                      key={i}
                      className="btn-secondary"
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(opt)}
                      style={{ textAlign: 'left', padding: '16px 24px', fontSize: '1.05rem' }}
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            /* Badge result */
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: 'spring' }}
              style={{ textAlign: 'center' }}
            >
              <div className="soft-card" style={{ padding: '50px 40px' }}>
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{
                    width: '140px', height: '140px', borderRadius: '50%',
                    background: earnedBadge.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 24px',
                    fontSize: '4rem',
                    boxShadow: `0 15px 50px ${earnedBadge.color}66`,
                  }}
                >
                  {earnedBadge.icon}
                </motion.div>

                <h2 className="script" style={{ fontSize: '2.5rem', marginBottom: '16px', color: 'var(--deep)' }}>
                  Your Badge of Honor
                </h2>
                <p style={{ fontSize: '1.3rem', lineHeight: 1.6, color: '#555', maxWidth: '400px', margin: '0 auto 32px' }}>
                  "{earnedBadge.title}"
                </p>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <motion.button
                    className="btn-primary"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={onNext}
                  >
                    Continue 🌳
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
