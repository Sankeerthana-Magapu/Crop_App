import React, { useState, useEffect } from 'react';

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Simulate weather API call
    setTimeout(() => {
      setWeatherData({
        current: {
          temp: 24,
          humidity: 65,
          rainfall: 2.5,
          wind: 12
        },
        forecast: [
          { day: 'Today', temp: 24, rain: 2.5 },
          { day: 'Tomorrow', temp: 26, rain: 1.2 },
          { day: 'Day 3', temp: 28, rain: 0.5 },
          { day: 'Day 4', temp: 25, rain: 3.1 },
          { day: 'Day 5', temp: 23, rain: 4.2 }
        ]
      });
    }, 1500);
  }, []);

  return (
    <div className="container">
      <div className="weather-widget">
        <h2>Real-Time Weather Data</h2>
        {weatherData ? (
          <>
            <div className="weather-grid">
              <div className="weather-card">
                <h3>Temperature</h3>
                <p className="stat-value">{weatherData.current.temp}°C</p>
              </div>
              <div className="weather-card">
                <h3>Humidity</h3>
                <p className="stat-value">{weatherData.current.humidity}%</p>
              </div>
              <div className="weather-card">
                <h3>Rainfall</h3>
                <p className="stat-value">{weatherData.current.rainfall}mm</p>
              </div>
              <div className="weather-card">
                <h3>Wind Speed</h3>
                <p className="stat-value">{weatherData.current.wind} km/h</p>
              </div>
            </div>
            
            <h3 style={{ marginTop: '30px', marginBottom: '15px' }}>5-Day Forecast</h3>
            <div className="weather-grid">
              {weatherData.forecast.map((day, index) => (
                <div key={index} className="weather-card">
                  <h4>{day.day}</h4>
                  <p>Temp: {day.temp}°C</p>
                  <p>Rain: {day.rain}mm</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;