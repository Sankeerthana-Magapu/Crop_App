import React, { useState, useEffect } from 'react';

const PredictionChart = () => {
  const [predictionData, setPredictionData] = useState([]);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPredictionData([
        { month: 'Jan', yield: 65 },
        { month: 'Feb', yield: 68 },
        { month: 'Mar', yield: 72 },
        { month: 'Apr', yield: 78 },
        { month: 'May', yield: 82 },
        { month: 'Jun', yield: 85 },
        { month: 'Jul', yield: 88 },
        { month: 'Aug', yield: 90 },
        { month: 'Sep', yield: 92 },
        { month: 'Oct', yield: 95 },
        { month: 'Nov', yield: 93 },
        { month: 'Dec', yield: 89 }
      ]);
    }, 1000);
  }, []);
  
  const maxYield = Math.max(...predictionData.map(item => item.yield));
  
  return (
    <div className="prediction-chart">
      {predictionData.length > 0 ? (
        <div style={{ 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          alignItems: 'flex-end', 
          justifyContent: 'space-around', 
          padding: '20px' 
        }}>
          {predictionData.map((item, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ 
                width: '30px', 
                height: `${(item.yield / maxYield) * 200}px`, 
                backgroundColor: '#4caf50', 
                borderRadius: '4px 4px 0 0',
                marginBottom: '10px',
                transition: 'height 0.5s ease'
              }}></div>
              <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{item.month}</span>
              <span style={{ fontSize: '10px' }}>{item.yield}%</span>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading prediction data...</div>
      )}
    </div>
  );
};

export default PredictionChart;