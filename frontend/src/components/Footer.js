import React from 'react';

function Footer() {
  return (
    <footer style={{ background: '#050c18', borderTop: '1px solid var(--card-border)', padding: '40px 30px', marginTop: '60px', color: '#8892b0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
        
        {/* Column 1: Company Profile */}
        <div>
          <h3 style={{ color: 'var(--gold-primary)' }}>DIAMPLUS INC.</h3>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
            Your trusted wholesale partner for certified Lab Grown and Natural Diamonds in Los Angeles Jewelry District.
          </p>
          <p style={{ color: '#fff', fontWeight: 'bold' }}>Contact Person: Vishnu Jalan</p>
        </div>

        {/* Column 2: Location */}
        <div>
          <h4 style={{ color: '#fff' }}>Office Address</h4>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
            550 S. Hill St. Suite 905<br />
            Los Angeles, CA 90013
          </p>
        </div>

        {/* Column 3: Contact Channels */}
        <div>
          <h4 style={{ color: '#fff' }}>Get In Touch</h4>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
            <strong>Phone:</strong> (213) 841-5661<br />
            <strong>Tel:</strong> (213) 623-2645<br />
            <strong>Fax:</strong> (213) 623-8609<br />
            <strong>Email:</strong> diamplus_inc@yahoo.com
          </p>
        </div>

      </div>

      <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '30px', paddingTop: '20px', fontSize: '0.8rem' }}>
        © {new Date().getFullYear()} Diamplus Inc. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;