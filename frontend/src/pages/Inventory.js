import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Inventory() {
  const [diamonds, setDiamonds] = useState([]);
  const [selectedShape, setSelectedShape] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Authentication Check
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  // Sync URL parameter (?shape=Princess)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const shapeParam = params.get('shape');
    if (shapeParam) {
      setSelectedShape(shapeParam);
    } else {
      setSelectedShape('All');
    }
  }, [location.search]);

  // Fetch items from Express backend if authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setLoading(true);
    axios.get('http://localhost:5000/api/diamonds', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setDiamonds(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching inventory:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
        }
        setLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Prevent rendering inventory content if not logged in
  if (!isAuthenticated) {
    return null;
  }

  // Filter matching logic
  const filteredDiamonds = diamonds.filter(item => {
    if (!item) return false;
    
    const itemShape = (item.Shape || item.shape || '').toString().trim().toLowerCase();
    const filterShape = selectedShape.trim().toLowerCase();
    
    const matchShape = filterShape === 'all' || itemShape === filterShape || itemShape.includes(filterShape);
    
    const isLabGrown = item['lab grown'] === true || item['lab grown'] === 'True' || item.Lab === 'IGI';
    const matchType = selectedType === 'All' || 
      (selectedType === 'Lab Grown' && isLabGrown) || 
      (selectedType === 'Natural' && !isLabGrown);

    return matchShape && matchType;
  });

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1300px', margin: '0 auto', color: '#0f172a' }}>
      
      {/* Page Header & Logout Action */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#1e3a8a', fontSize: '2.2rem', fontFamily: 'Cinzel, serif', fontWeight: '700', margin: 0 }}>
          Live Wholesale Inventory
        </h1>
        <button 
          onClick={handleLogout}
          style={{
            background: '#dc2626',
            color: '#ffffff',
            border: 'none',
            padding: '8px 18px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem'
          }}
        >
          Logout
        </button>
      </div>

      {/* Filter Toolbar */}
      <div style={{ background: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', marginBottom: '30px', display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
        <div>
          <label style={{ marginRight: '10px', color: '#1e3a8a', fontWeight: 'bold' }}>Shape:</label>
          <select 
            value={selectedShape} 
            onChange={e => setSelectedShape(e.target.value)} 
            style={{ padding: '8px 12px', background: '#ffffff', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: '4px', outline: 'none' }}
          >
            <option value="All">All Shapes</option>
            <option value="Round">Round</option>
            <option value="Princess">Princess</option>
            <option value="Emerald">Emerald</option>
            <option value="Radiant">Radiant</option>
            <option value="Oval">Oval</option>
            <option value="Pear">Pear</option>
            <option value="Marquise">Marquise</option>
            <option value="Asscher">Asscher</option>
            <option value="Cushion">Cushion</option>
            <option value="Heart">Heart</option>
          </select>
        </div>

        <div>
          <label style={{ marginRight: '10px', color: '#1e3a8a', fontWeight: 'bold' }}>Origin Type:</label>
          <select 
            value={selectedType} 
            onChange={e => setSelectedType(e.target.value)} 
            style={{ padding: '8px 12px', background: '#ffffff', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: '4px', outline: 'none' }}
          >
            <option value="All">All Origins</option>
            <option value="Lab Grown">Lab Grown (IGI)</option>
            <option value="Natural">Natural (GIA)</option>
          </select>
        </div>

        <button 
          onClick={() => { setSelectedShape('All'); setSelectedType('All'); }} 
          style={{ padding: '8px 16px', background: '#f1f5f9', border: '1px solid #cbd5e1', color: '#475569', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}
        >
          Reset Filters
        </button>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <p style={{ textAlign: 'center', color: '#1e3a8a', fontSize: '1.2rem', fontWeight: '600' }}>Loading live stock list...</p>
      ) : filteredDiamonds.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <p style={{ color: '#64748b', fontSize: '1.1rem' }}>No diamonds found matching shape "{selectedShape}".</p>
          <button 
            onClick={() => { setSelectedShape('All'); setSelectedType('All'); }} 
            style={{ marginTop: '15px', background: '#1e3a8a', color: '#ffffff', border: 'none', padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' }}
          >
            View All Available Inventory ({diamonds.length})
          </button>
        </div>
      ) : (
        <div style={{ overflowX: 'auto', background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: '#0f172a', color: '#d4af37', borderBottom: '2px solid #1e3a8a' }}>
                <th style={{ padding: '14px 12px' }}>Stock #</th>
                <th style={{ padding: '14px 12px' }}>Shape</th>
                <th style={{ padding: '14px 12px' }}>Weight</th>
                <th style={{ padding: '14px 12px' }}>Color</th>
                <th style={{ padding: '14px 12px' }}>Clarity</th>
                <th style={{ padding: '14px 12px' }}>Lab</th>
                <th style={{ padding: '14px 12px' }}>Type</th>
                <th style={{ padding: '14px 12px' }}>Total Price</th>
                <th style={{ padding: '14px 12px' }}>Certificate</th>
              </tr>
            </thead>
            <tbody>
              {filteredDiamonds.map((d, i) => {
                const stockNo = d['Stock Number'] || d['StockNumber'] || d['bar_code'] || 'N/A';
                const shape = d.Shape || d.shape || 'N/A';
                const weight = d.Weight || d.weight || 'N/A';
                const color = d.Color || d.color || 'N/A';
                const clarity = d.Clarity || d.clarity || 'N/A';
                const lab = d.Lab || d.lab || 'IGI';
                const isLabGrown = d['lab grown'] === true || d['lab grown'] === 'True' || lab === 'IGI';
                const price = d['Total Price'] || d['Price'] || d['Sell Price'];
                const certUrl = d['Cert Url'] || d['CertUrl'] || d['Stone Detail URL'];

                return (
                  <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: i % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold', color: '#1e3a8a' }}>{stockNo}</td>
                    <td style={{ padding: '12px', color: '#334155' }}>{shape}</td>
                    <td style={{ padding: '12px', color: '#334155' }}>{weight} ct</td>
                    <td style={{ padding: '12px', color: '#334155' }}>{color}</td>
                    <td style={{ padding: '12px', color: '#334155' }}>{clarity}</td>
                    <td style={{ padding: '12px', color: '#334155' }}>{lab}</td>
                    <td style={{ padding: '12px', fontWeight: '600', color: isLabGrown ? '#059669' : '#b45309' }}>{isLabGrown ? 'Lab Grown' : 'Natural'}</td>
                    <td style={{ padding: '12px', fontWeight: 'bold', color: '#0f172a' }}>${price ? Number(price).toLocaleString() : 'P.O.A.'}</td>
                    <td style={{ padding: '12px' }}>
                      {certUrl ? (
                        <a href={certUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#1e3a8a', fontWeight: '600', textDecoration: 'underline' }}>View Cert</a>
                      ) : <span style={{ color: '#94a3b8' }}>N/A</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Inventory;