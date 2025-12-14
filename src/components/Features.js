import React from 'react';
import { FEATURES } from '../data/constants';

const Features = () => {
  return (
    <div className="container">
      <div className="features">
        {FEATURES.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <div className="feature-title">{feature.title}</div>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;