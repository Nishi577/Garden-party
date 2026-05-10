import React from 'react';
import { motion } from 'framer-motion';
import NavigationButton from './NavigationButton';
import { Star, Download } from 'lucide-react';

const StarCertificate = ({ onBack, selectedSticker }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center p-8"
      style={{ width: '100%', maxWidth: '800px' }}
    >
      <div 
        id="certificate"
        style={{
          width: '100%',
          aspectRatio: '1.414',
          background: 'white',
          padding: '60px',
          borderRadius: '20px',
          boxShadow: '0 30px 80px rgba(241, 211, 207, 0.4)',
          border: '20px double #F1D3CF',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#2E3A59',
          backgroundImage: 'radial-gradient(circle at center, rgba(255, 253, 248, 0.5) 0%, white 100%)'
        }}
      >
        {/* Certificate Decorative Corners */}
        <div style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '3rem' }}>🌸</div>
        <div style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '3rem' }}>🌸</div>
        <div style={{ position: 'absolute', bottom: '20px', left: '20px', fontSize: '3rem' }}>🌸</div>
        <div style={{ position: 'absolute', bottom: '20px', right: '20px', fontSize: '3rem' }}>🌸</div>

        <Star size={80} color="#EAC98F" fill="#EAC98F" style={{ marginBottom: '30px', filter: 'drop-shadow(0 0 10px rgba(234, 201, 143, 0.5))' }} />
        
        <h1 style={{ fontFamily: 'var(--script-font)', fontSize: '5rem', marginBottom: '15px', color: '#F1D3CF', fontWeight: 400 }}>
          Certificate of Eternal Radiance
        </h1>
        
        <p style={{ fontSize: '1.4rem', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '30px', color: '#888' }}>
          Heartfeltly Presented to
        </p>
        
        <h2 style={{ fontSize: '4.5rem', borderBottom: '3px solid #F1D3CF', paddingBottom: '10px', marginBottom: '30px', minWidth: '400px', fontFamily: 'var(--script-font)', fontWeight: 400 }}>
          Our Beloved Mom
        </h2>
        
        <p style={{ fontSize: '1.5rem', maxWidth: '85%', lineHeight: 1.6, fontStyle: 'italic' }}>
          For being the guiding star in our lives, for the sacrifices made in silence, 
          and for the love that knows no bounds. You are the heartbeat of our constellation.
        </p>

        <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '40px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '5px' }}>{selectedSticker?.icon || '⭐'}</div>
            <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Your Spirit Symbol</p>
          </div>
          <div style={{ width: '150px', borderTop: '1px solid #2E3A59', paddingTop: '5px' }}>
            <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Date</p>
            <p style={{ fontWeight: 600 }}>{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '40px', display: 'flex', gap: '20px' }}>
        <NavigationButton onClick={() => window.print()} className="bg-white" style={{ background: 'white', color: '#2E3A59', border: '1px solid #2E3A59' }}>
          <Download size={20} /> Print Certificate
        </NavigationButton>
        <NavigationButton onClick={onBack}>
          Start Journey Again
        </NavigationButton>
      </div>
    </motion.div>
  );
};

export default StarCertificate;
