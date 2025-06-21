import Searchbox from "./Searchbox";
import Boxinfo from "./Boxinfo";
import { useState } from "react";
import weatherBackgrounds from "./weatherBackgrounds";
import "./WeatherApp.css";

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState({
    city: "New York", 
    feelslike: 18.0,
    temp: 20.0,
    tempMin: 15.0,
    tempMax: 25.0,
    humidity: 60,
    weather: "Clear", 
    description: "clear sky", 
    icon: "01d", 
  });

  const updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  const bgStyle = {
    background: weatherBackgrounds[weatherInfo.weather] || weatherBackgrounds["Default"],
    transition: 'background 1.5s ease-in-out', 
  };

  return (
    <div className="weather-app" style={bgStyle}>
      <div className="content-container">
        <h2>🌦 Weather Lens</h2> 
        <Searchbox updateInfo={updateInfo} />
        <Boxinfo info={weatherInfo} />
      </div>
    </div>
  );
}