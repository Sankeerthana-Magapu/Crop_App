import React, { useState } from 'react';

const PredictionPage = () => {
  const [cropType, setCropType] = useState('wheat');
  const [location, setLocation] = useState('');
  const [season, setSeason] = useState('kharif');
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const cropTypes = [
    'wheat', 'rice', 'corn', 'soybean', 'cotton', 
    'sugarcane', 'potato', 'tomato', 'barley', 'millet'
  ];

  const seasons = [
    'kharif', 'rabi', 'zaid', 'spring', 'summer', 'winter'
  ];

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const yieldPrediction = Math.floor(Math.random() * 5000) + 2000;
      const confidence = (Math.random() * 0.2 + 0.8) * 100;
      
      setPredictionResult({
        crop: cropType,
        predictedYield: yieldPrediction,
        confidence: confidence.toFixed(1),
        recommendation: `Optimal planting time: Next 2 weeks`,
        riskFactors: ['Moderate rainfall expected', 'Soil nutrients adequate']
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="container">
      <div className="prediction-page">
        <h2>Crop Yield Prediction</h2>
        
        <div className="prediction-container">
          <div className="prediction-form">
            <h3>Enter Prediction Parameters</h3>
            <form onSubmit={handlePredict}>
              <div className="form-group">
                <label>Crop Type:</label>
                <select 
                  value={cropType} 
                  onChange={(e) => setCropType(e.target.value)}
                  required
                >
                  {cropTypes.map(crop => (
                    <option key={crop} value={crop}>
                      {crop.charAt(0).toUpperCase() + crop.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Location:</label>
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter location or coordinates"
                  required
                />
              </div>

              <div className="form-group">
                <label>Season:</label>
                <select 
                  value={season} 
                  onChange={(e) => setSeason(e.target.value)}
                  required
                >
                  {seasons.map(season => (
                    <option key={season} value={season}>
                      {season.charAt(0).toUpperCase() + season.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="predict-btn" disabled={loading}>
                {loading ? 'Predicting...' : 'Predict Yield'}
              </button>
            </form>
          </div>

          <div className="prediction-result">
            <h3>Prediction Results</h3>
            {loading ? (
              <div className="loading">Analyzing data... ⏳</div>
            ) : predictionResult ? (
              <div className="result-card">
                <div className="result-header">
                  <h4>{predictionResult.crop.toUpperCase()} Yield Prediction</h4>
                  <div className="confidence">
                    Confidence: {predictionResult.confidence}%
                  </div>
                </div>
                
                <div className="yield-prediction">
                  <span className="yield-value">{predictionResult.predictedYield}</span>
                  <span className="yield-unit">kg/hectare</span>
                </div>

                <div className="recommendation">
                  <strong>Recommendation:</strong> {predictionResult.recommendation}
                </div>

                <div className="risk-factors">
                  <strong>Risk Factors:</strong>
                  <ul>
                    {predictionResult.riskFactors.map((factor, index) => (
                      <li key={index}>{factor}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="no-result">
                Enter parameters and click "Predict Yield" to see results
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionPage;