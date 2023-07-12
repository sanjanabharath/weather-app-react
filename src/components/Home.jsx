import React, { useState, useEffect } from "react";
import axios from "axios";
import sunriseIcon from "../assets/sunrise.png";
import sunsetIcon from "../assets/sunset.png";
import humidityIcon from "../assets/humidity.png";
import windIcon from "../assets/wind.png";
import backgroundImg from "../assets/bg1.jpg";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      if (city) {
        setLoading(true);

        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=517eb6c41ae9819953b59adb05531f85&units=metric`
          );
          setWeather(response.data);
        } catch (error) {
          console.error(error);
        }

        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="bg-white rounded-lg shadow-lg p-14 w-90">
        <h1 className="text-4xl text-center font-bold mb-6">
          Search Your City
        </h1>
        <div className="flex">
          <input
            type="text"
            className="border border-gray-300 rounded-l px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r"
            onClick={() => setCity("")}
          >
            Clear
          </button>
        </div>
        {loading ? (
          <div className="flex items-center justify-center mt-6">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : weather ? (
          <div className="mt-6">
            <h2 className="text-xl mb-2 font-semibold">{weather.name}</h2>
            <div className="border-b border-gray-400"></div>

            <div className="flex items-center justify-center mb-6">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt={weather.weather[0].description}
                className="w-12 mt-4 h-12"
              />
              <p className="text-3xl font-bold ml-2">{weather.main.temp}°C</p>
            </div>
            <p className="text-slate-700 font-semibold uppercase">
              {weather.weather[0].description}
            </p>
            <div className="border-b border-gray-400"></div>
            <div className="flex items-center mt-4">
              <div className="flex items-center mr-4">
                <img src={sunriseIcon} alt="Sunrise" className="w-6 h-6 mr-1" />
                <p>
                  {new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
                    timeStyle: "short",
                  })}
                </p>
              </div>
              <div className="flex items-center mr-4">
                <img src={sunsetIcon} alt="Sunset" className="w-6 h-6 mr-1" />
                <p>
                  {new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
                    timeStyle: "short",
                  })}
                </p>
              </div>
              <div className="flex items-center">
                <img
                  src={humidityIcon}
                  alt="Humidity"
                  className="w-6 h-6 mr-1"
                />
                <p>{weather.main.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <img src={windIcon} alt="Wind Speed" className="w-6 h-6 mr-1" />
              <p>{weather.wind.speed} m/s</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default WeatherApp;
