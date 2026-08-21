import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getLinkStyle = (path) => ({
    color: location.pathname === path ? '#1e3a8a' : '#475569',
    textDecoration: 'none',
    fontWeight: location.pathname === path ? '700' : '600',
    fontSize: isMobile ? '11px' : '15px',
    whiteSpace: 'nowrap'
  });

  return (
    <header style={{ 
      background: '#ffffff', 
      borderBottom: '1px solid #e2e8f0', 
      padding: isMobile ? '8px 10px' : '12px 40px', 
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        boxSizing: 'border-box',
        gap: isMobile ? '4px' : '20px'
      }}>
        {/* Logo Container */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
  <img 
    src="/inc.png" 
    alt="Diamplus INC." 
    style={{ 
      height: isMobile ? '24px' : '36px', 
      width: 'auto', 
      objectFit: 'contain' 
    }} 
  />
</Link>

        {/* Links Container */}
        <div style={{
          display: 'flex',
          gap: isMobile ? '6px' : '20px',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}>
          <Link to="/" style={getLinkStyle('/')}>Home</Link>
          <Link to="/about" style={getLinkStyle('/about')}>About Us</Link>
          <Link to="/inventory" style={getLinkStyle('/inventory')}>Inventory</Link>
          <Link to="/login" style={getLinkStyle('/login')}>Login</Link>
          <Link 
            to="/signup" 
            style={{ 
              background: '#1e3a8a', 
              color: '#ffffff', 
              padding: isMobile ? '4px 6px' : '8px 16px', 
              borderRadius: '4px', 
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: isMobile ? '10px' : '14px',
              whiteSpace: 'nowrap'
            }}
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;