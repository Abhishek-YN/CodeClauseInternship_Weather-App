import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./Boxinfo.css";

export default function Boxinfo({ info }) {
  const baseIconUrl = "https://openweathermap.org/img/wn/";

  const weatherEmojis = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Drizzle: "🌦️",
    Thunderstorm: "⛈️",
    Snow: "❄️",
    Mist: "🌫️",
    Haze: "🌫️",
    Smoke: "💨",
    Dust: "🌪️",
    Fog: "🌫️",
    Sand: "🏜️",
    Ash: "🌋",
    Squall: "🌬️",
    Tornado: "🌪️",
  };

  const getWeatherEmoji = (weather) => {
    return weatherEmojis[weather] || "🌈"; 
  };

  return (
    <div className="Boxinfo">
      <div className='cardContainer'>
        <Card sx={{ maxWidth: 380, borderRadius: '15px', boxShadow: '0 8px 25px rgba(0,0,0,0.1)' }}> 
          <CardMedia
            component="img"
            height="120" 
            image={`${baseIconUrl}${info.icon}@4x.png`} 
            alt="weather icon"
            sx={{ objectFit: "contain", backgroundColor: "transparent", mt: 2 }} 
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="div" sx={{ fontWeight: 600, color: '#333' }}>
              {info.city} {getWeatherEmoji(info.weather)} 
            </Typography>
            <Typography variant="h5" color="text.primary" sx={{ mb: 1, fontWeight: 700 }}>
              {info.temp} &deg;C
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }} component={'span'}>
              <div className="weather-detail">Humidity: <strong>{info.humidity} %</strong></div>
              <div className="weather-detail">Max Temp: <strong>{info.tempMax} &deg;C</strong></div>
              <div className="weather-detail">Min Temp: <strong>{info.tempMin} &deg;C</strong></div>
              <div className="weather-detail">Feels like: <strong>{info.feelslike} &deg;C</strong></div>
              <div className="weather-description">
                The weather can be described as <i>{info.description}</i>.
              </div>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}