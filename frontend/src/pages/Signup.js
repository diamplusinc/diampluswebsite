import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', company: '', password: '' });
  const [msg, setMsg] = useState('');
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg('');
    
    axios.post('http://localhost:5000/api/signup', form)
      .then(res => {
        setIsError(false);
        setMsg(res.data.message || 'Account created successfully! Redirecting to login...');
        
        // Redirect to login after 1.5 seconds
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      })
      .catch(err => {
        setIsError(true);
        setMsg(err.response?.data?.message || 'Sign up failed. Please try again.');
      });
  };

  return (
    <div style={{ padding: '60px 20px', maxWidth: '480px', margin: '0 auto', color: '#0f172a' }}>
      <div style={{
        background: '#ffffff',
        padding: '40px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          {/* Logo Image */}
          <img 
            src="/logo.jpeg" 
            alt="Diamplus Inc. Logo" 
            style={{ maxHeight: '60px', width: 'auto', marginBottom: '15px', objectFit: 'contain' }} 
            onError={(e) => {
              // Fallback if logo image isn't found in public folder
              e.target.style.display = 'none';
            }}
          />
          <h2 style={{ color: '#1e3a8a', fontSize: '1.8rem', fontFamily: 'Cinzel, serif', fontWeight: '700' }}>
            Create Account
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '4px' }}>
            Join Diamplus Inc. for direct wholesale access
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ color: '#1e3a8a', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
              Full Name
            </label>
            <input 
              type="text" 
              className="form-input" 
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})} 
              required 
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ color: '#1e3a8a', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
              Business / Company Name
            </label>
            <input 
              type="text" 
              className="form-input" 
              value={form.company}
              onChange={e => setForm({...form, company: e.target.value})} 
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ color: '#1e3a8a', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
              Email Address
            </label>
            <input 
              type="email" 
              className="form-input" 
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})} 
              required 
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ color: '#1e3a8a', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
              Password
            </label>
            <input 
              type="password" 
              className="form-input" 
              value={form.password}
              onChange={e => setForm({...form, password: e.target.value})} 
              required 
            />
          </div>

          <button type="submit" className="btn-gold" style={{ width: '100%', marginTop: '10px' }}>
            Register Account
          </button>
        </form>

        {msg && (
          <p style={{ 
            marginTop: '20px', 
            color: isError ? '#dc2626' : '#059669', 
            textAlign: 'center', 
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}

export default Signup;