import React, { useState } from 'react';
import Header from './components/Header';
import Features from './components/Features';
import Stats from './components/Stats';
import Dashboard from './components/Dashboard';
import WeatherWidget from './components/WeatherWidget';
import SoilAnalysis from './components/SoilAnalysis';
import SignIn from './components/SignIn';

function App() {
  const [currentView, setCurrentView] = useState('signin'); // Start with signin
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const languages = ['English', 'Hindi', 'Tamil', 'Telugu'];

  // Your backend URLs - update these with your actual URLs
  const BACKEND_URLS = {
    prediction: 'http://localhost:8502/', // Your Python prediction URL
    recommendations: 'http://localhost:8501/' // Your Python recommendations URL
  };
  
  // Handle user sign in
  const handleSignIn = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  // Handle user sign out
  const handleSignOut = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentView('signin');
  };

  // Redirect to Python backend
  const redirectToBackend = (service) => {
    window.open(BACKEND_URLS[service], '_blank');
  };

  // Render the main app content when authenticated
  const renderAppContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <>
            <Features />
            <Stats />
            <Dashboard />
          </>
        );
      case 'weather':
        return <WeatherWidget />;
      case 'soil':
        return <SoilAnalysis />;
      case 'prediction':
        return (
          <div className="container">
            <div className="backend-redirect">
              <div className="redirect-content">
                <h2>🔮 AI Prediction Engine</h2>
                <p>Redirecting to our advanced prediction system...</p>
                <div className="redirect-actions">
                  <button 
                    className="redirect-btn primary"
                    onClick={() => redirectToBackend('prediction')}
                  >
                    Open Prediction System
                  </button>
                  <button 
                    className="redirect-btn secondary"
                    onClick={() => setCurrentView('dashboard')}
                  >
                    Back to Dashboard
                  </button>
                </div>
                <div className="redirect-info">
                  <h4>What you'll find in the Prediction System:</h4>
                  <ul>
                    <li>Real-time crop yield predictions</li>
                    <li>Machine learning models</li>
                    <li>Historical data analysis</li>
                    <li>Custom prediction parameters</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      case 'recommendations':
        return (
          <div className="container">
            <div className="backend-redirect">
              <div className="redirect-content">
                <h2>💡 Smart Recommendations</h2>
                <p>Redirecting to our personalized recommendation engine...</p>
                <div className="redirect-actions">
                  <button 
                    className="redirect-btn primary"
                    onClick={() => redirectToBackend('recommendations')}
                  >
                    Open Recommendations
                  </button>
                  <button 
                    className="redirect-btn secondary"
                    onClick={() => setCurrentView('dashboard')}
                  >
                    Back to Dashboard
                  </button>
                </div>
                <div className="redirect-info">
                  <h4>What you'll find in the Recommendation System:</h4>
                  <ul>
                    <li>Personalized farming advice</li>
                    <li>Optimal planting schedules</li>
                    <li>Fertilizer recommendations</li>
                    <li>Pest control strategies</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="container">
            <div className="profile-page">
              <h2>My Profile</h2>
              <div className="profile-info">
                <div className="info-item">
                  <label>Name:</label>
                  <p>{user?.name || 'Not provided'}</p>
                </div>
                <div className="info-item">
                  <label>Email:</label>
                  <p>{user?.email || 'Not provided'}</p>
                </div>
                <div className="info-item">
                  <label>Farm Size:</label>
                  <p>{user?.farmSize || 'Not provided'}</p>
                </div>
                <div className="info-item">
                  <label>Location:</label>
                  <p>{user?.location || 'Not provided'}</p>
                </div>
                <div className="info-item">
                  <label>Main Crops:</label>
                  <p>{user?.mainCrops || 'Not provided'}</p>
                </div>
                <div className="info-item">
                  <label>Phone:</label>
                  <p>{user?.phone || 'Not provided'}</p>
                </div>
                <div className="info-item">
                  <label>Member Since:</label>
                  <p>{user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'Today'}</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  // If not authenticated, show sign in page
  if (!isAuthenticated) {
    return (
      <div className="app">
        <Header
          currentLanguage={currentLanguage}
          onLanguageChange={setCurrentLanguage}
          languages={languages}
          isAuthenticated={isAuthenticated}
          user={user}
          onSignOut={handleSignOut}
        />
        <SignIn onSignIn={handleSignIn} />
      </div>
    );
  }

  // If authenticated, show the main app with sidebar
  return (
    <div className="app">
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        languages={languages}
        isAuthenticated={isAuthenticated}
        user={user}
        onSignOut={handleSignOut}
      />

      <div className="app-layout">
        {/* Sidebar Navigation */}
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="user-welcome">
              <div className="user-avatar">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="user-info">
                <span className="welcome-text">Welcome back,</span>
                <span className="user-name">{user?.name || 'User'}</span>
              </div>
            </div>
          </div>
          <nav className="sidebar-nav">
            <button
              className={`sidebar-btn ${currentView === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentView('dashboard')}
            >
              <span className="btn-icon">📊</span>
              <span className="btn-text">Dashboard</span>
            </button>

            <button
              className={`sidebar-btn ${currentView === 'weather' ? 'active' : ''}`}
              onClick={() => setCurrentView('weather')}
            >
              <span className="btn-icon">🌤️</span>
              <span className="btn-text">Weather</span>
            </button>

            <button
              className={`sidebar-btn ${currentView === 'soil' ? 'active' : ''}`}
              onClick={() => setCurrentView('soil')}
            >
              <span className="btn-icon">🌱</span>
              <span className="btn-text">Soil Analysis</span>
            </button>

            <button
              className={`sidebar-btn ${currentView === 'prediction' ? 'active' : ''}`}
              onClick={() => setCurrentView('prediction')}
            >
              <span className="btn-icon">🔮</span>
              <span className="btn-text">Prediction</span>
            </button>

            <button
              className={`sidebar-btn ${currentView === 'recommendations' ? 'active' : ''}`}
              onClick={() => setCurrentView('recommendations')}
            >
              <span className="btn-icon">💡</span>
              <span className="btn-text">Recommendations</span>
            </button>

            {/* Added Profile Button */}
            <button
              className={`sidebar-btn ${currentView === 'profile' ? 'active' : ''}`}
              onClick={() => setCurrentView('profile')}
            >
              <span className="btn-icon">👤</span>
              <span className="btn-text">My Profile</span>
            </button>

            {/* Added Sign Out Button */}
            <button
              className="sidebar-btn signout-btn"
              onClick={handleSignOut}
            >
              <span className="btn-icon">🚪</span>
              <span className="btn-text">Sign Out</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {renderAppContent()}
        </div>
      </div>
    </div>
  );
}

export default App;