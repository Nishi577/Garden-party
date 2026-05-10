import React from 'react';
import bgVideo from '../assets/animate_this_202605101514.mp4';

const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ 
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      backgroundColor: '#F8F6FB'
    }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.6
        }}
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
      
      {/* Soft overlay for readability and "mothering" feel */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(248, 246, 251, 0.4) 0%, rgba(199, 184, 234, 0.2) 100%)',
        backdropFilter: 'blur(2px)'
      }} />
      
      {/* Gentle floating sparkles (kept for magic) */}
      <div style={{ position: 'absolute', top: '10%', left: '5%', fontSize: '1.5rem', opacity: 0.5 }}>✨</div>
      <div style={{ position: 'absolute', bottom: '15%', right: '8%', fontSize: '2rem', opacity: 0.4 }}>🌸</div>
    </div>
  );
};

export default Background;
