import React, { useState, useEffect } from 'react';

const SoilAnalysis = () => {
  const [soilData, setSoilData] = useState(null);

  useEffect(() => {
    // Simulate soil data API call
    setTimeout(() => {
      setSoilData([
        { parameter: 'pH Level', value: 6.8, status: 'Optimal', range: '6.0-7.0' },
        { parameter: 'Nitrogen', value: 45, status: 'Low', range: '50-100 ppm' },
        { parameter: 'Phosphorus', value: 65, status: 'Optimal', range: '50-100 ppm' },
        { parameter: 'Potassium', value: 85, status: 'Optimal', range: '50-100 ppm' },
        { parameter: 'Organic Matter', value: 3.2, status: 'Good', range: '2.5-4.0%' },
        { parameter: 'Moisture', value: 35, status: 'Optimal', range: '30-40%' }
      ]);
    }, 1500);
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Optimal': return '#4caf50';
      case 'Good': return '#8bc34a';
      case 'Low': return '#ff9800';
      case 'Critical': return '#f44336';
      default: return '#666';
    }
  };

  return (
    <div className="container">
      <div className="soil-analysis">
        <h2>Soil Analysis Report</h2>
        {soilData ? (
          <div className="parameters-grid">
            {soilData.map((item, index) => (
              <div key={index} className="parameter-card">
                <h3>{item.parameter}</h3>
                <p style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold',
                  color: getStatusColor(item.status)
                }}>
                  {item.value}
                </p>
                <p>Status: <strong>{item.status}</strong></p>
                <p>Optimal Range: {item.range}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading soil analysis data...</p>
        )}
        
        <div style={{ marginTop: '30px', padding: '20px', background: '#f0f7f0', borderRadius: '8px' }}>
          <h3>Soil Improvement Recommendations</h3>
          <ul>
            <li>Apply nitrogen-rich fertilizer to address low nitrogen levels</li>
            <li>Consider adding compost to maintain organic matter</li>
            <li>Monitor pH levels monthly</li>
            <li>Implement crop rotation for soil health</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SoilAnalysis;