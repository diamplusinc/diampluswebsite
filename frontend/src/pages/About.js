import React from 'react';

function About() {
  return (
    <div style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto', color: '#0f172a' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ color: '#1e3a8a', fontSize: '2.5rem', marginBottom: '15px', fontFamily: 'Cinzel, serif', fontWeight: '700' }}>
          About Diamplus Inc.
        </h1>
        <p style={{ color: '#475569', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
          Premier wholesaler of certified Lab-Grown & Earth-Mined Natural Diamonds located in the heart of Los Angeles.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '50px' }}>
        <div style={{ background: '#ffffff', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
          <h3 style={{ color: '#1e3a8a', marginBottom: '15px', fontSize: '1.25rem', fontFamily: 'Cinzel, serif' }}>💎 Our Expertise</h3>
          <p style={{ color: '#334155', lineHeight: '1.8', fontSize: '0.95rem' }}>
            Diamplus Inc. supplies a full array of diamond shapes—from Round Brilliant to Fancy cuts like Marquise, Emerald, Asscher, and Cushion. We handle carats ranging from 1.00ct to over 10.00ct+.
          </p>
        </div>

        <div style={{ background: '#ffffff', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
          <h3 style={{ color: '#1e3a8a', marginBottom: '15px', fontSize: '1.25rem', fontFamily: 'Cinzel, serif' }}>📜 Certified Quality</h3>
          <p style={{ color: '#334155', lineHeight: '1.8', fontSize: '0.95rem' }}>
            Every diamond in our collection is backed by authentic laboratory grading from <strong style={{ color: '#1e3a8a' }}>GIA (Gemological Institute of America)</strong> or <strong style={{ color: '#1e3a8a' }}>IGI (International Gemological Institute)</strong>.
          </p>
        </div>
      </div>

      {/* Leadership & Office Section */}
      <div style={{ padding: '40px', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
        <h2 style={{ color: '#1e3a8a', fontSize: '1.8rem', marginBottom: '30px', textAlign: 'center', fontFamily: 'Cinzel, serif' }}>
          Executive Leadership & Office Location
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', color: '#0f172a' }}>
          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
            <h4 style={{ color: '#1e3a8a', marginBottom: '8px', fontSize: '1rem' }}>👤 Primary Contact</h4>
            <p style={{ color: '#334155', fontWeight: '600' }}>Vishnu Jalan</p>
          </div>

          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
            <h4 style={{ color: '#1e3a8a', marginBottom: '8px', fontSize: '1rem' }}>📍 Office Address</h4>
            <p style={{ color: '#334155', lineHeight: '1.6' }}>
              550 S. Hill St. Suite 905<br />
              Los Angeles, CA 90013
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
            <h4 style={{ color: '#1e3a8a', marginBottom: '8px', fontSize: '1rem' }}>📞 Direct Lines</h4>
            <p style={{ color: '#334155', lineHeight: '1.6' }}>
              <strong>Phone:</strong> (213) 841-5661<br />
              <strong>Tel:</strong> (213) 623-2645<br />
              <strong>Fax:</strong> (213) 623-8609<br />
              <strong>Email:</strong> <a href="mailto:diamplus_inc@yahoo.com" style={{ color: '#1e3a8a', textDecoration: 'underline' }}>diamplus_inc@yahoo.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;