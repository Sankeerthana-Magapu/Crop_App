import React from 'react';
import { STATS } from '../data/constants';

const Stats = () => {
  return (
    <div className="container">
      <div className="stats">
        {STATS.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;