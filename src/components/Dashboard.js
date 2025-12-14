import React from 'react';
import PredictionChart from './PredictionChart';
import Recommendations from './Recommendations';

const Dashboard = () => {
  return (
    <div className="container">
      <div className="dashboard">
        <h2 className="dashboard-title">Crop Yield Prediction Dashboard</h2>
        <div className="dashboard-content">
          <PredictionChart />
          <Recommendations />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;