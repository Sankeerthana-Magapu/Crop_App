import React from 'react';
import { RECOMMENDATIONS } from '../data/constants';

const Recommendations = () => {
  return (
    <div className="recommendations">
      <h3>Personalized Recommendations</h3>
      <ul>
        {RECOMMENDATIONS.map((rec, index) => (
          <li key={index}>{rec}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;