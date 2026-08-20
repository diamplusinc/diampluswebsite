import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ onLoginSuccess }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setMsg('');
    
    axios.post('http://localhost:5000/api/login', form)
      .then(res => {
        setIsError(false);
        setMsg(res.data.message || 'Login successful!');
        
        // Save auth token/user data returned from backend
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
        }
        if (res.data.user) {
          localStorage.setItem('user', JSON.stringify(res.data.user));
        }

        // Trigger callback if passed from parent app
        if (onLoginSuccess) {
          onLoginSuccess(res.data);
        }

        // Redirect to inventory page after successful login
        setTimeout(() => {
          navigate('/inventory');
        }, 1000);
      })
      .catch(err => {
        setIsError(true);
        setMsg(err.response?.data?.message || 'Invalid email or password. Please try again.');
      });
  };

  const handleForgot = (e) => {
    e.preventDefault();
    setIsError(false);
    setMsg(`Password reset link sent to ${resetEmail}`);
    setShowForgot(false);
  };

  return (
    <div style={{ padding: '60px 20px', maxWidth: '450px', margin: '0 auto', color: '#0f172a' }}>
      <div style={{
        background: '#ffffff',
        padding: '40px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>💎</div>
          <h2 style={{ color: '#1e3a8a', fontSize: '1.8rem', fontFamily: 'Cinzel, serif', fontWeight: '700' }}>
            Client Login
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '4px' }}>
            Access wholesale inventory & diamond certificates
          </p>
        </div>

        {!showForgot ? (
          <form onSubmit={handleLogin}>
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

            <div style={{ marginBottom: '8px' }}>
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

            <div style={{ textAlign: 'right', marginBottom: '20px' }}>
              <button 
                type="button" 
                onClick={() => { setShowForgot(true); setMsg(''); }} 
                style={{ background: 'none', border: 'none', color: '#1e3a8a', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline', fontWeight: '500' }}
              >
                Forgot Password?
              </button>
            </div>

            <button type="submit" className="btn-gold" style={{ width: '100%' }}>
              Login to Portal
            </button>
          </form>
        ) : (
          <form onSubmit={handleForgot}>
            <h3 style={{ color: '#1e3a8a', marginBottom: '10px', fontSize: '1.1rem', fontFamily: 'Cinzel, serif' }}>
              Reset Password
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '15px' }}>
              Enter your email to receive a password recovery link.
            </p>
            <input 
              type="email" 
              className="form-input" 
              placeholder="Your registered email" 
              value={resetEmail}
              onChange={e => setResetEmail(e.target.value)} 
              required 
            />
            
            <button type="submit" className="btn-gold" style={{ width: '100%', marginBottom: '10px' }}>
              Send Reset Link
            </button>
            <button 
              type="button" 
              onClick={() => { setShowForgot(false); setMsg(''); }} 
              style={{ width: '100%', background: '#f1f5f9', border: '1px solid #cbd5e1', color: '#475569', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}
            >
              Back to Login
            </button>
          </form>
        )}

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

export default Login;