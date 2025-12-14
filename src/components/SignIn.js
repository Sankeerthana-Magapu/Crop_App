import React, { useState } from 'react';

const SignIn = ({ onSignIn }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    farmSize: '',
    location: '',
    mainCrops: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isSignUp) {
      // Sign up validation
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!");
        return;
      }
      if (formData.password.length < 6) {
        alert("Password must be at least 6 characters long!");
        return;
      }
    }

    // Create user data
    const userData = {
      id: Date.now(),
      name: formData.name || 'New Farmer',
      email: formData.email,
      farmSize: formData.farmSize,
      location: formData.location,
      mainCrops: formData.mainCrops,
      phone: formData.phone,
      joinDate: new Date().toISOString()
    };

    // Sign in the user
    onSignIn(userData);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      farmSize: '',
      location: '',
      mainCrops: '',
      phone: ''
    });
  };

  const handleDemoLogin = () => {
    const demoUser = {
      id: 1,
      name: 'Demo Farmer',
      email: 'demo@farmer.com',
      farmSize: '10 hectares',
      location: 'Odisha, India',
      mainCrops: 'Wheat, Corn, Rice',
      phone: '+91 9876512345',
      joinDate: '2024-01-01'
    };
    onSignIn(demoUser);
  };

  return (
    <div className="container">
      <div className="signin-page">
        <div className="signin-container">
          <div className="signin-header">
            <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
            <p>{isSignUp ? 'Join our farming community' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleSubmit} className="signin-form">
            {isSignUp && (
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required={isSignUp}
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                minLength="6"
              />
            </div>

            {isSignUp && (
              <>
                <div className="form-group">
                  <label>Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm your password"
                  />
                </div>

                <div className="form-group">
                  <label>Farm Size</label>
                  <input
                    type="text"
                    name="farmSize"
                    value={formData.farmSize}
                    onChange={handleChange}
                    placeholder="e.g., 10 hectares"
                  />
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., California, USA"
                  />
                </div>

                <div className="form-group">
                  <label>Main Crops</label>
                  <input
                    type="text"
                    name="mainCrops"
                    value={formData.mainCrops}
                    onChange={handleChange}
                    placeholder="e.g., Wheat, Corn, Rice"
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g., +1 (555) 123-4567"
                  />
                </div>
              </>
            )}

            <button type="submit" className="signin-btn">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="demo-section">
            <button 
              type="button" 
              className="demo-btn"
              onClick={handleDemoLogin}
            >
              🚀 Try Demo Account
            </button>
          </div>

          <div className="signin-footer">
            <p>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button 
                type="button" 
                className="toggle-btn"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>

          <div className="demo-notes">
            <p>💡 <strong>Demo Info:</strong> Use any email and password (min 6 chars) to create an account, or try the demo account!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;