import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${process.env.REACT_APP_URL}q=${query}&units=metric&lang=mk&appid=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  return (
    <div className="container">
      <input
        type="text"
        className="search"
        placeholder="Enter city"
        value={query} onChange={(event) => setQuery(event.target.value)}
        onKeyPress={search}
      />
      {weather.main && (
        <div className="data">
          <h2 className="name">
            <span>{weather.name}</span>
          </h2>
          <div className="boxes-1">
            <div className="temp">
              {Math.round(weather.main.temp)}
              <sup>&deg;C</sup>
            </div>
            <div className="description">
              <p>{weather.weather[0].description}</p>
            </div>
          </div>
          <div className="image">
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
          </div>
          <div className="boxes-2">
            <div classname="box-1">
              <p>Влажност</p>
              {Math.round(weather.main.humidity)}%
            </div>
            <div className="box-2">
              <p>Ветер</p>
              {weather.wind.speed}m/s
            </div>
            <div className="box-3">
              <p>Притисок</p>
              {weather.main.pressure}hPa
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;