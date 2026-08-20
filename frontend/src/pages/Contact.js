import React, { useState } from 'react';
import axios from 'axios';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [msg, setMsg] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/contact', form)
      .then(res => {
        setMsg(res.data.message);
        setIsError(false);
      })
      .catch(() => {
        setMsg('Error sending message. Please try again.');
        setIsError(true);
      });
  };

  return (
    <div style={{ padding: '60px 20px', maxWidth: '600px', margin: '0 auto', color: '#0f172a' }}>
      <div style={{
        background: '#ffffff',
        padding: '40px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)'
      }}>
        <h2 style={{
          color: '#1e3a8a',
          fontSize: '2rem',
          marginBottom: '10px',
          textAlign: 'center',
          fontFamily: 'Cinzel, serif',
          fontWeight: '700'
        }}>
          Contact Diamplus Inc.
        </h2>
        
        <p style={{
          color: '#64748b',
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '0.95rem',
          lineHeight: '1.5'
        }}>
          Contact Vishnu Jalan for wholesale diamond inquiries and certificate details.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ color: '#1e3a8a', fontSize: '0.9rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
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

          <div style={{ marginBottom: '18px' }}>
            <label style={{ color: '#1e3a8a', fontSize: '0.9rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
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

          <div style={{ marginBottom: '18px' }}>
            <label style={{ color: '#1e3a8a', fontSize: '0.9rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
              Message
            </label>
            <textarea 
              rows="4" 
              className="form-input" 
              value={form.message}
              onChange={e => setForm({...form, message: e.target.value})} 
              required 
            />
          </div>

          <button 
            type="submit" 
            className="btn-gold" 
            style={{ width: '100%', marginTop: '10px' }}
          >
            Send Message
          </button>
        </form>

        {msg && (
          <p style={{ 
            marginTop: '20px', 
            color: isError ? '#dc2626' : '#059669', 
            textAlign: 'center',
            fontWeight: '600',
            fontSize: '0.95rem'
          }}>
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}

export default Contact;