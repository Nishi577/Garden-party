import React from 'react';
import { motion } from 'framer-motion';
import NavigationButton from './NavigationButton';
import img1 from '../assets/mom/WhatsApp Image 2026-05-10 at 15.34.48.jpeg';
import img2 from '../assets/mom/WhatsApp Imag4e3de 2026-05-10 at 15.34.51.jpeg';
import img5 from '../assets/mom/WhatsApp Ima3ededge 2026-05-10 at 15.34.55.jpeg';

const timelineData = [
  {
    title: "The Early Days",
    description: "A young woman with dreams bigger than the world around her.",
    thought: "Every dream began with your courage.",
    icon: "🌸",
    image: img1
  },
  {
    title: "Becoming a Mom",
    description: "The day love found its purest form.",
    thought: "The world changed when you held us.",
    icon: "🤱",
    image: img2
  },
  {
    title: "The Silent Sacrifices",
    description: "Countless steps you took quietly — each one a gift to us.",
    icon: "💝"
  },
  {
    title: "Your Discipline",
    description: "The routines you built became our foundation.",
    icon: "🏛️"
  },
  {
    title: "Carrying Us to the Stars",
    description: "Your effort lit the pathway we walk today.",
    thought: "Your strength is our guiding light.",
    icon: "🚀",
    image: img5
  }
];

const TimelineScreen = ({ onNext }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center py-12"
      style={{ width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h2 className="gradient-text" style={{ fontSize: '4rem', marginBottom: '40px' }}>Timeline of You</h2>
      
      <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* The connecting line */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          bottom: 0, 
          left: '50%', 
          width: '6px', 
          background: 'rgba(241, 211, 207, 0.6)',
          transform: 'translateX(-50%)',
          zIndex: 0,
          borderRadius: '3px'
        }} />

        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            style={{
              display: 'flex',
              justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
              width: '100%',
              marginBottom: '60px',
              position: 'relative',
              zIndex: 1
            }}
          >
            <div className="mother-card" style={{
              width: '42%',
              padding: '30px',
              position: 'relative',
              boxShadow: '0 15px 35px rgba(241, 211, 207, 0.3)',
              textAlign: index % 2 === 0 ? 'right' : 'left',
              display: 'flex',
              flexDirection: 'column',
              alignItems: index % 2 === 0 ? 'flex-end' : 'flex-start'
            }}>
              {item.image && (
                <div style={{ width: '100%', marginBottom: '20px' }}>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    style={{ 
                      width: '100%', 
                      borderRadius: '20px', 
                      border: '4px solid white',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                    }} 
                  />
                  {item.thought && (
                    <p className="script-text" style={{ fontSize: '1.2rem', marginTop: '10px' }}>
                      "{item.thought}"
                    </p>
                  )}
                </div>
              )}
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{item.icon}</div>
              <h3 style={{ color: '#2E3A59', marginBottom: '10px', fontSize: '1.8rem', fontFamily: 'var(--script-font)' }}>{item.title}</h3>
              <p style={{ color: '#555', lineHeight: 1.6, fontSize: '1.1rem' }}>{item.description}</p>
              
              {/* Dot on the line */}
              <div style={{
                position: 'absolute',
                top: '50%',
                [index % 2 === 0 ? 'right' : 'left']: '-19%',
                width: '24px',
                height: '24px',
                backgroundColor: '#F1D3CF',
                borderRadius: '50%',
                border: '6px solid white',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                transform: 'translateY(-50%)'
              }} />
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: '40px' }}>
        <NavigationButton onClick={onNext}>
          Continue the Story →
        </NavigationButton>
      </div>
    </motion.div>
  );
};

export default TimelineScreen;
