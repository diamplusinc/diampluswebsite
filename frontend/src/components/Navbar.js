import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const getLinkStyle = (path) => ({
    color: location.pathname === path ? '#1e3a8a' : '#475569',
    textDecoration: 'none',
    fontWeight: location.pathname === path ? '700' : '500',
    fontSize: '0.95rem',
  });

  return (
    <header style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '12px 40px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1300px', margin: '0 auto' }}>
        
        {/* Unconstrained Rectangular Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
          <img 
            src="/logo.jpeg" 
            alt="Diamplus Inc Logo" 
            style={{ 
              height: '48px', 
              width: 'auto', 
              objectFit: 'contain',
              display: 'block' 
            }} 
          />
          <div>
            <h3 style={{ margin: 0, color: '#1e3a8a', fontSize: '1.25rem', fontFamily: 'Cinzel, serif', letterSpacing: '1px', fontWeight: '700' }}>
              DIAMPLUS INC.
            </h3>
            <span style={{ color: '#b45309', fontSize: '0.65rem', fontWeight: '600', letterSpacing: '0.8px', display: 'block' }}>
              LAB GROWN & NATURAL DIAMONDS
            </span>
          </div>
        </Link>

        {/* Links */}
        <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          <Link to="/" style={getLinkStyle('/')}>Home</Link>
          <Link to="/inventory" style={getLinkStyle('/inventory')}>Inventory</Link>
          <Link to="/about" style={getLinkStyle('/about')}>About Us</Link>
          <Link to="/contact" style={getLinkStyle('/contact')}>Contact</Link>
          <Link to="/login" style={getLinkStyle('/login')}>Login</Link>
          <Link to="/signup" style={{ background: '#1e3a8a', color: '#ffffff', padding: '8px 18px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>Sign Up</Link>
        </div>

      </nav>
    </header>
  );
}

export default Navbar;