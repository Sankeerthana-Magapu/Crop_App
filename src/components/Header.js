import React from 'react';
import farmImage from '../assests/Images/c1.jpg';
const Header = ({ currentLanguage, onLanguageChange, languages, isAuthenticated, user, onSignOut }) => {
  return (
    <header className="container">
       <div className="header-top">
        <div className="header-left">
          {isAuthenticated && user && (
            <div className="user-badge">
              <span className="welcome-text">Welcome, {user.name}</span>
            </div>
          )}
        </div>
        
        <div className="header-right">
          <div className="language-switcher">
            <select 
              value={currentLanguage} 
              onChange={(e) => onLanguageChange(e.target.value)}
              className="language-select"
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
          
          {isAuthenticated && (
            <button className="header-signout-btn" onClick={onSignOut}>
              Sign Out
            </button>
          )}
        </div>
      </div>
       <div className="dashboard-image-section">
          <img 
            src={farmImage} 
            alt="Farm Field with Crops" 
            className="dashboard-image"
          />
          <div className="image-overlay">
            <h3>Krishi AI</h3>
            <p>Advanced AI technology for modern agriculture</p>
          </div>
        </div> 
      <h1>AI-Powered Crop Yield Prediction & Optimization</h1>
      <p className="subtitle">
        Increase your crop productivity by up to 15% with advanced machine learning models, 
        real-time weather integration, and personalized recommendations for small-scale farmers
      </p>
    </header>
  );
};

export default Header;