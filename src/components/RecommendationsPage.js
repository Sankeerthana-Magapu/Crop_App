import React, { useState } from 'react';

const RecommendationsPage = () => {
  const [selectedCrop, setSelectedCrop] = useState('wheat');
  const [recommendations, setRecommendations] = useState(null);

  const cropData = {
    wheat: {
      irrigation: 'Water requirement: 450-650mm. Irrigate at crown root initiation and flowering stages.',
      fertilizer: 'Apply 120-150 kg N/ha, 60-80 kg P2O5/ha, 40-60 kg K2O/ha',
      pestControl: 'Monitor for aphids and rust. Use neem-based pesticides.',
      harvesting: 'Harvest when moisture content is 20-25%'
    },
    rice: {
      irrigation: 'Maintain 2-5 cm water depth during vegetative phase',
      fertilizer: 'Apply 100-120 kg N/ha in split doses',
      pestControl: 'Control stem borer with appropriate insecticides',
      harvesting: 'Harvest when 80-85% grains are ripe'
    },
    corn: {
      irrigation: 'Critical stages: knee-high, tasseling, and grain filling',
      fertilizer: 'Apply 150-180 kg N/ha, 60-80 kg P2O5/ha',
      pestControl: 'Monitor for fall armyworm and use integrated pest management',
      harvesting: 'Harvest when kernels are hard and glossy'
    }
  };

  const generateRecommendations = () => {
    setRecommendations(cropData[selectedCrop]);
  };

  return (
    <div className="container">
      <div className="recommendations-page">
        <h2>Personalized Crop Recommendations</h2>
        
        <div className="recommendations-container">
          <div className="crop-selector">
            <h3>Select Crop for Recommendations</h3>
            <select 
              value={selectedCrop} 
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="crop-select"
            >
              <option value="wheat">Wheat</option>
              <option value="rice">Rice</option>
              <option value="corn">Corn</option>
              <option value="soybean">Soybean</option>
              <option value="cotton">Cotton</option>
            </select>
            
            <button 
              onClick={generateRecommendations}
              className="generate-btn"
            >
              Generate Recommendations
            </button>
          </div>

          <div className="recommendations-display">
            <h3>Recommendations for {selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)}</h3>
            
            {recommendations ? (
              <div className="recommendations-grid">
                <div className="rec-card irrigation">
                  <h4>🚰 Irrigation</h4>
                  <p>{recommendations.irrigation}</p>
                </div>
                
                <div className="rec-card fertilizer">
                  <h4>🌱 Fertilizer</h4>
                  <p>{recommendations.fertilizer}</p>
                </div>
                
                <div className="rec-card pest">
                  <h4>🐛 Pest Control</h4>
                  <p>{recommendations.pestControl}</p>
                </div>
                
                <div className="rec-card harvest">
                  <h4>⏰ Harvesting</h4>
                  <p>{recommendations.harvesting}</p>
                </div>
              </div>
            ) : (
              <div className="no-recommendations">
                Select a crop and click "Generate Recommendations" to see personalized advice
              </div>
            )}
          </div>
        </div>

        <div className="ai-insights">
          <h3>AI-Generated Insights</h3>
          <div className="insights-grid">
            <div className="insight-card">
              <h4>📈 Yield Optimization</h4>
              <p>Based on current soil and weather data, we recommend adjusting planting density by 15% for optimal yield.</p>
            </div>
            <div className="insight-card">
              <h4>💧 Water Management</h4>
              <p>Smart irrigation schedule can reduce water usage by 20% while maintaining yield.</p>
            </div>
            <div className="insight-card">
              <h4>🌱 Soil Health</h4>
              <p>Consider crop rotation with legumes to improve soil nitrogen content.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage;