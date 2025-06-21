import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import "./Searchbox.css";
import { useState } from 'react';

export default function Searchbox({ updateInfo }) {
  const [city, setCity] = useState("");
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "9c05250d871f5f79a4cb1d7ab567d6f6";

  const getWeatherInfo = async () => {
    try {
      setLoading(true);
      setErr(false); 
      let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      let jsonResponse = await response.json();

      if (jsonResponse.cod !== 200) {
        setErr(true);
        setLoading(false);
        return null; 
      }

      let result = {
        city: jsonResponse.name, 
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelslike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].main, 
        description: jsonResponse.weather[0].description, 
        icon: jsonResponse.weather[0].icon,
      };

      setLoading(false);
      return result;
    } catch (error) {
      console.error("Error fetching weather data:", error); 
      setErr(true);
      setLoading(false);
      return null; 
    }
  };

  const handleChange = (event) => {
    setCity(event.target.value);
    setErr(false); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (city.trim() === "") { 
      setErr(true);
      return;
    }
    let newInfo = await getWeatherInfo();
    if (newInfo) {
      updateInfo(newInfo);
    }
    setCity(""); 
  };

  return (
    <div className="Searchbox">
      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="Enter City Name" 
          variant="outlined"
          value={city}
          onChange={handleChange}
          required
          fullWidth 
          autoFocus
          error={err}
          helperText={err ? "No such place exists. Please try again!" : ""} 
          sx={{ mb: 2 }} 
        />
        <Button
          variant="contained"
          type="submit"
          disabled={loading}
          className='button'
          fullWidth 
          sx={{ height: 50, fontSize: '1.1rem' }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Search"}
        </Button>
      </form>
    </div>
  );
}