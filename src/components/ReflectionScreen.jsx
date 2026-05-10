import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavigationButton from './NavigationButton';
import momThumb1 from '../assets/mom/WhatsApp I2ede2mage 2026-05-10 at 15.34.49.jpeg';
import momThumb2 from '../assets/mom/WhatsApp I3eemage 2026-05-10 at 15.34.52.jpeg';
import momThumb3 from '../assets/mom/WhatsApp Image 2026e3e-05-10 at 15.34.52.jpeg';
import momThumb4 from '../assets/mom/WhatsApp Image3ede 2026-05-10 at 15.34.53.jpeg';

const questions = [
  "What was one of your happiest moments as a mom?",
  "Which challenge shaped you the most?",
  "What makes you proud of your journey?",
  "What’s something you wish we knew earlier?"
];

const thumbnails = [momThumb1, momThumb2, momThumb3, momThumb4];

const ReflectionScreen = ({ onNext }) => {
  const [answeredCount, setAnsweredCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answeredIndices, setAnsweredIndices] = useState([]);

  const handleStarClick = (index) => {
    if (!answeredIndices.includes(index)) {
      setCurrentQuestion(questions[index]);
    }
  };

  const handleAnswerSubmit = () => {
    setAnsweredCount(prev => prev + 1);
    setAnsweredIndices(prev => [...prev, questions.indexOf(currentQuestion)]);
    setCurrentQuestion(null);
  };

  const allAnswered = answeredCount === questions.length;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center w-full min-h-screen"
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {!allAnswered ? (
        <>
          <h2 className="gradient-text" style={{ fontSize: '4rem', position: 'absolute', top: '5%', textAlign: 'center', width: '100%' }}>
            Starry Reflection
          </h2>
          
          <div style={{ position: 'relative', width: '600px', height: '400px' }}>
            {questions.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.3, rotate: 15 }}
                onClick={() => handleStarClick(index)}
                style={{
                  position: 'absolute',
                  top: `${[20, 35, 75, 65][index]}%`,
                  left: `${[25, 75, 35, 85][index]}%`,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  filter: answeredIndices.includes(index) ? 'none' : 'grayscale(100%) opacity(0.4)',
                  transition: 'all 0.5s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '50%', 
                  overflow: 'hidden',
                  border: answeredIndices.includes(index) ? '4px solid #F1D3CF' : '4px solid white',
                  boxShadow: answeredIndices.includes(index) ? '0 0 20px #F1D3CF' : '0 5px 15px rgba(0,0,0,0.1)'
                }}>
                  <img src={thumbnails[index]} alt="Memory" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ fontSize: '1.5rem', marginTop: '-10px' }}>⭐</div>
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {currentQuestion && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="mother-card"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  padding: '50px',
                  zIndex: 10,
                  maxWidth: '450px',
                  textAlign: 'center',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.2)'
                }}
              >
                <p style={{ fontSize: '1.4rem', marginBottom: '25px', color: '#2E3A59', fontFamily: 'var(--script-font)' }}>{currentQuestion}</p>
                <textarea 
                  placeholder="Share your heart..."
                  style={{
                    width: '100%',
                    height: '120px',
                    padding: '15px',
                    borderRadius: '20px',
                    border: '2px solid #F1D3CF',
                    marginBottom: '25px',
                    fontFamily: 'inherit',
                    fontSize: '1rem',
                    outline: 'none',
                    backgroundColor: 'rgba(255,255,255,0.5)'
                  }}
                />
                <NavigationButton onClick={handleAnswerSubmit}>
                  Illuminate Star 🌸
                </NavigationButton>
              </motion.div>
            )}
          </AnimatePresence>
          
          <p style={{ position: 'absolute', bottom: '10%', color: '#2E3A59', fontSize: '1.2rem', fontStyle: 'italic' }}>
            Tap the stars to reflect on your journey.
          </p>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mother-card"
          style={{
            maxWidth: '650px',
            padding: '60px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            backgroundColor: 'rgba(255, 253, 248, 0.95)'
          }}
        >
          <div style={{ fontSize: '4rem', marginBottom: '10px' }}>🌟</div>
          <p style={{ fontSize: '1.8rem', lineHeight: 1.6, color: '#2E3A59', fontFamily: 'var(--script-font)' }}>
            “Your strength carried us farther than words can measure.<br/>
            Your effort took us beyond the clouds…<br/>
            to the moon, the stars, and everything in between.”
          </p>
          <div style={{ alignSelf: 'center', marginTop: '20px' }}>
            <NavigationButton onClick={onNext}>
              Collect Your Gifts 🎁
            </NavigationButton>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ReflectionScreen;
