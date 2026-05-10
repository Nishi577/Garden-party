import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavigationButton from './NavigationButton';
import { Award, Heart, Trophy, Crown } from 'lucide-react';
import momGiftImg from '../assets/mom/WhatsApp Ima890ge 2026-05-10 at 15.34.48.jpeg';

const gifts = [
  {
    name: "Strength Medal",
    text: "For every challenge you conquered with grace.",
    icon: <Award size={40} color="#EAC98F" />,
    id: 1
  },
  {
    name: "Golden Heart Badge",
    text: "For giving more love than anyone could ask for.",
    icon: <Heart size={40} color="#F1D3CF" fill="#F1D3CF" />,
    id: 2
  },
  {
    name: "Star Maker Trophy",
    text: "For shaping lives that shine because of you.",
    icon: <Trophy size={40} color="#F8E47C" fill="#F8E47C" />,
    id: 3
  },
  {
    name: "90s Melody Crown",
    text: "For the rhythms and memories you carry so beautifully.",
    icon: <Crown size={40} color="#C7B8EA" fill="#C7B8EA" />,
    id: 4
  }
];

const GiftCard = ({ gift }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      style={{ perspective: '1000px', width: '200px', height: '240px', cursor: 'pointer' }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          borderRadius: '24px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          border: '2px solid #F8F6FB'
        }}>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ filter: 'drop-shadow(0 0 10px rgba(234, 201, 143, 0.5))' }}
          >
            {gift.icon}
          </motion.div>
          <p style={{ marginTop: '20px', fontWeight: 600, color: '#2E3A59' }}>{gift.name}</p>
          <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '10px' }}>Tap to Open</p>
        </div>

        {/* Back */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F1D3CF',
          borderRadius: '40px',
          padding: '25px',
          textAlign: 'center',
          color: '#2E3A59',
          transform: 'rotateY(180deg)',
          border: '4px solid white',
          boxShadow: 'inset 0 0 20px rgba(255,255,255,0.5)'
        }}>
          <h4 style={{ color: '#2E3A59', marginBottom: '15px', fontSize: '1.4rem', fontFamily: 'var(--script-font)' }}>{gift.name}</h4>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.4, fontWeight: 500 }}>{gift.text}</p>
          <div style={{ marginTop: '20px', fontSize: '2.5rem' }}>✨</div>
        </div>
      </motion.div>
    </div>
  );
};

const RewardsScreen = ({ onNext }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center py-12"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '40px' }}
    >
      <div style={{ textAlign: 'center', maxWidth: '600px' }}>
        <h2 className="gradient-text" style={{ fontSize: '4rem', marginBottom: '10px' }}>Your Gift Gallery</h2>
        <p className="script-text" style={{ fontSize: '1.8rem', color: '#2E3A59' }}>
          “A life made of gold, for a heart made of love.”
        </p>
      </div>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ width: '100%', maxWidth: '300px' }}
        >
          <img 
            src={momGiftImg} 
            alt="Mom Reward" 
            style={{ 
              width: '100%', 
              borderRadius: '20px', 
              border: '6px solid white',
              boxShadow: '0 15px 40px rgba(234, 201, 143, 0.4)',
              transform: 'rotate(-3deg)'
            }} 
          />
          <div style={{ 
            marginTop: '20px', 
            padding: '15px', 
            background: 'white', 
            borderRadius: '15px', 
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
            fontStyle: 'italic',
            color: '#2E3A59'
          }}>
            You deserve every star in the sky, and every trophy on this shelf.
          </div>
        </motion.div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '20px', 
          maxWidth: '500px'
        }}>
          {gifts.map(gift => (
            <GiftCard key={gift.id} gift={gift} />
          ))}
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <NavigationButton onClick={onNext}>
          Next Surprise 🌸
        </NavigationButton>
      </div>
    </motion.div>
  );
};

export default RewardsScreen;
