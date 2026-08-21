import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const svgStyle = { 
  width: '38px', 
  height: '38px', 
  fill: 'none', 
  stroke: '#1e3a8a', /* Royal Blue Icons */
  strokeWidth: '1.5'
};

export const DiamondIcons = {
  'Round': (
    <svg viewBox="0 0 100 100" style={svgStyle}>
      <circle cx="50" cy="50" r="45" />
      <circle cx="50" cy="50" r="22" />
      <path d="M50 5 L50 95 M5 50 L95 50 M18 18 L82 82 M18 82 L82 18" strokeWidth="0.8" opacity="0.6" />
    </svg>
  ),
  'Princess': (
    <svg viewBox="0 0 100 100" style={svgStyle}>
      <rect x="10" y="10" width="80" height="80" />
      <path d="M10 10 L90 90 M10 90 L90 10 M50 10 L50 90 M10 50 L90 50" strokeWidth="0.8" opacity="0.6" />
    </svg>
  ),
  'Emerald': (
    <svg viewBox="0 0 100 100" style={svgStyle}>
      <polygon points="25,10 75,10 90,25 90,75 75,90 25,90 10,75 10,25" />
      <polygon points="35,25 65,25 75,35 75,65 65,75 35,75 25,60 25,35" strokeWidth="0.8" opacity="0.6" />
    </svg>
  ),
  'Radiant': (
    <svg viewBox="0 0 100 100" style={svgStyle}>
      <polygon points="20,10 80,10 90,20 90,80 80,90 20,90 10,80 10,20" />
      <line x1="10" y1="20" x2="90" y2="80" strokeWidth="0.8" opacity="0.6" />
      <line x1="10" y1="80" x2="90" y2="20" strokeWidth="0.8" opacity="0.6" />
    </svg>
  ),
  'Oval': (
    <svg viewBox="0 0 100 100" style={svgStyle}>
      <ellipse cx="50" cy="50" rx="32" ry="45" />
      <line x1="50" y1="5" x2="50" y2="95" strokeWidth="0.8" opacity="0.6" />
      <line x1="18" y1="50" x2="82" y2="50" strokeWidth="0.8" opacity="0.6" />
    </svg>
  ),
  'Pear': (
    <svg viewBox="0 0 100 100" style={svgStyle}>
      <path d="M50 5 C75 35 85 60 85 72 A35 35 0 0 1 15 72 C15 60 25 35 50 5 Z" />
      <line x1="50" y1="5" x2="50" y2="95" strokeWidth="0.8" opacity="0.6" />
    </svg>
  ),
  'Marquise': (
    <svg viewBox="0 0 100 100" style={svgStyle}>
      <path d="M50 5 C85 35 85 65 50 95 C15 65 15 35 50 5 Z" />
      <line x1="50" y1="5" x2="50" y2="95" strokeWidth="0.8" opacity="0.6" />
      <line x1="15" y1="50" x2="85" y2="50" strokeWidth="0.8" opacity="0.6" />
    </svg>
  ),
  'Asscher': (
    <svg viewBox="0 0 100 100" style={svgStyle}>
      <polygon points="30,10 70,10 90,30 90,70 70,90 30,90 10,70 10,30" />
      <polygon points="40,25 60,25 75,40 75,60 60,75 40,75 25,60 25,40" strokeWidth="0.8" opacity="0.6" />
    </svg>
  ),
  'Cushion': (
    <svg viewBox="0 0 100 100" style={svgStyle}>
      <rect x="12" y="12" width="76" height="76" rx="20" ry="20" />
      <path d="M12 12 L88 88 M12 88 L88 12" strokeWidth="0.8" opacity="0.6" />
    </svg>
  ),
  'Heart': (
    <svg viewBox="0 0 100 100" style={svgStyle}>
      <path d="M50 88 L15 50 A22 22 0 0 1 50 20 A22 22 0 0 1 85 50 Z" />
    </svg>
  )
};

const diamondShapes = [
  { name: 'Round', label: 'ROUND BRILLIANT' },
  { name: 'Princess', label: 'PRINCESS' },
  { name: 'Emerald', label: 'EMERALD' },
  { name: 'Radiant', label: 'RADIANT' },
  { name: 'Oval', label: 'OVAL' },
  { name: 'Pear', label: 'PEAR' },
  { name: 'Marquise', label: 'MARQUISE' },
  { name: 'Asscher', label: 'ASSCHER' },
  { name: 'Cushion', label: 'CUSHION' },
  { name: 'Heart', label: 'HEART' }
];

export default function Home() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleShapeClick = (shapeName) => {
    navigate(`/inventory?shape=${shapeName}`);
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', 
        color: '#ffffff', 
        padding: isMobile ? '50px 15px' : '80px 20px', 
        textAlign: 'center' 
      }}>
        <h1 style={{ 
          color: '#d4af37', 
          fontSize: isMobile ? '2rem' : '2.8rem', 
          marginBottom: '15px', 
          fontFamily: 'Cinzel, serif' 
        }}>
          DIAMPLUS INC.
        </h1>
        <p style={{ 
          color: '#e2e8f0', 
          fontSize: isMobile ? '0.95rem' : '1.1rem', 
          maxWidth: '700px', 
          margin: '0 auto 30px' 
        }}>
          Premier Wholesale Supplier of Certified GIA Natural Diamonds & IGI Lab-Grown Diamonds
        </p>
        <div style={{ 
          display: 'flex', 
          gap: '15px', 
          justifyContent: 'center', 
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center'
        }}>
          <button 
            onClick={() => navigate('/inventory')}
            style={{ 
              background: '#d4af37', 
              color: '#0f172a', 
              border: 'none', 
              padding: '12px 28px', 
              borderRadius: '6px', 
              fontWeight: 'bold', 
              cursor: 'pointer',
              width: isMobile ? '100%' : 'auto',
              maxWidth: '300px'
            }}
          >
            BROWSE FULL INVENTORY
          </button>
          <button 
            onClick={() => navigate('/contact')}
            style={{ 
              background: 'transparent', 
              color: '#ffffff', 
              border: '1px solid #d4af37', 
              padding: '12px 28px', 
              borderRadius: '6px', 
              cursor: 'pointer',
              width: isMobile ? '100%' : 'auto',
              maxWidth: '300px'
            }}
          >
            Contact Us
          </button>
        </div>
      </section>

      {/* Available Shapes Section */}
      <section style={{ 
        padding: isMobile ? '40px 15px' : '60px 20px', 
        maxWidth: '1200px', 
        margin: '0 auto', 
        textAlign: 'center' 
      }}>
        <h2 style={{ 
          color: '#1e3a8a', 
          fontSize: isMobile ? '1.8rem' : '2.2rem', 
          marginBottom: '10px', 
          fontFamily: 'Cinzel, serif' 
        }}>
          AVAILABLE SHAPES
        </h2>
        <p style={{ color: '#64748b', marginBottom: '40px', fontSize: '0.95rem' }}>
          Click any shape below to view live stock from our inventory
        </p>

        {/* Dynamic Grid: 5 columns on desktop, 2 columns on mobile */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, minmax(0, 1fr))', 
          gap: isMobile ? '12px' : '20px' 
        }}>
          {diamondShapes.map((shape) => (
            <div 
              key={shape.name} 
              onClick={() => handleShapeClick(shape.name)}
              style={{ 
                background: '#ffffff', 
                border: '1px solid #e2e8f0', 
                borderRadius: '10px', 
                padding: isMobile ? '18px 8px' : '25px 15px', 
                cursor: 'pointer', 
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                {DiamondIcons[shape.name] || DiamondIcons['Round']}
              </div>
              <h4 style={{ 
                color: '#1e3a8a', 
                fontSize: isMobile ? '0.75rem' : '0.85rem', 
                fontWeight: '700', 
                letterSpacing: isMobile ? '0px' : '1px', 
                textTransform: 'uppercase', 
                margin: 0 
              }}>
                {shape.label}
              </h4>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}