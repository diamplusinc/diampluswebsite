import React from 'react';
import { useNavigate } from 'react-router-dom';

const svgStyle = { 
  width: '38px', 
  height: '38px', 
  fill: 'none', 
  stroke: '#d4af37', 
  strokeWidth: '1.5', 
  filter: 'drop-shadow(0px 0px 4px rgba(212,175,55,0.4))' 
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
      <polygon points="35,25 65,25 75,35 75,65 65,75 35,75 25,65 25,35" strokeWidth="0.8" opacity="0.6" />
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

const shapesList = [
  { name: 'ROUND BRILLIANT', key: 'Round' },
  { name: 'PRINCESS', key: 'Princess' },
  { name: 'EMERALD', key: 'Emerald' },
  { name: 'RADIANT', key: 'Radiant' },
  { name: 'OVAL', key: 'Oval' },
  { name: 'PEAR', key: 'Pear' },
  { name: 'MARQUISE', key: 'Marquise' },
  { name: 'ASSCHER', key: 'Asscher' },
  { name: 'CUSHION', key: 'Cushion' },
  { name: 'HEART', key: 'Heart' }
];

export default function ShapeGrid() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', // minmax(0, 1fr) forces 5 equal columns regardless of child content width
      gap: '16px',
      width: '100%',
      maxWidth: '1000px', // Constrains container width to fit perfectly on desktop views
      margin: '0 auto',
      padding: '0 20px',
      boxSizing: 'border-box'
    }}>
      {shapesList.map((shape, idx) => (
        <div
          key={idx}
          onClick={() => navigate(`/inventory?shape=${shape.key}`)}
          style={{
            background: '#091322',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '10px',
            padding: '20px 10px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            width: '100%',
            boxSizing: 'border-box',
            transition: 'all 0.2s ease-in-out'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#d4af37';
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.background = '#0e1d33';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.background = '#091322';
          }}
        >
          {DiamondIcons[shape.key]}
          <span style={{ 
            color: '#ffffff', 
            fontSize: '0.75rem', 
            fontWeight: '600', 
            letterSpacing: '0.8px', 
            textAlign: 'center',
            lineHeight: '1.2'
          }}>
            {shape.name}
          </span>
        </div>
      ))}
    </div>
  );
}