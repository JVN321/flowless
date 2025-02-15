
import React, { useState, useEffect } from 'react';
import { CloudRain, Sun, Cloud, Loader } from "lucide-react";

interface WeatherData {
  temp: number;
  humidity: number;
  description: string;
}

const WEATHER_KEY = process.env.WEATHERAPI_KEY;

export default function WeatherInfo() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);      

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        // Using the public endpoint (not recommended for production)
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=bd5e378503939ddaee76f12ad7a97608` );
        const data = await response.json();

        if (data.main) {
          setWeather({
            temp: Math.round(data.main.temp),
            humidity: data.main.humidity,
            description: data.weather[0].description
          });
        }
      } catch (err) {
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    
    fetchWeather(9.9512592,76.4085689);

    
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md flex justify-center items-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Current Weather</h2>
      {weather && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {weather.description.includes('rain') ? (
              <CloudRain className="w-6 h-6 text-blue-500" />
            ) : weather.description.includes('cloud') ? (
              <Cloud className="w-6 h-6 text-gray-500" />
            ) : (
              <Sun className="w-6 h-6 text-yellow-500" />
            )}
            <span className="text-lg capitalize">
              {weather.description}
            </span>
          </div>
          <p className="text-lg">Temperature: {weather.temp}°C</p>
          <p className="text-lg">Humidity: {weather.humidity}%</p>
        </div>
      )}
    </div>
  );
}