import React, { useState, useEffect } from "react";
import axios from "axios";

export function WeatherLocation() {
  const [weather, setWeather] = useState(null);
  const [timer, setTimer] = useState(5)
  const API_KEY = "d81ffeff9a8bada9238ea792ddabe4fc"; 

  useEffect(() => {
    const b = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              await fetchWeatherByCoords(latitude, longitude);
            },
            
        );
    }, timer * 1000)
    return () => { clearInterval(b) };
  }, [timer]);

  const fetchWeatherByCoords = async (lat, lon) => {
   
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`
      );
      setWeather(response.data);
    
  };

  return (
    <div className="aspect-video rounded-xl bg-muted/50">
    <div className="max-w-2xl mx-auto p-4">
        <div className="overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]"> 
            <div className="p-6 pb-2 flex flex-row items-center justify-between border-b border-gray-100">
                <div className="flex items-center space-x-3">
                    <h3 className="text-xl font-semibold text-gray-900"> 📍 Meteo Local</h3>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                    <span className="hidden sm:inline-block">Powered by&nbsp;</span>
                    <span className="font-medium text-indigo-600">WeatherAPI</span>
                </div>
            </div>
            
            {weather  && ( <div className="p-6">
                <div className="space-y-5">
                    <div className="relative">
                        <form>
                             <h3 className="text-2xl font-bold">{weather.name}, {weather.sys.country}</h3>
                            <img
                                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                alt={weather.weather[0].description}
                                className="mx-auto"
                            />
                            <p className="text-xl font-semibold">
                                {weather.main.temp}°C - {weather.weather[0].description}
                            </p>
                            <p className="text-sm text-gray-600">🌡️ Température ressentie : {weather.main.feels_like}°C</p>
                            <p className="text-sm text-gray-600">💨 Vent : {weather.wind.speed} km/h</p>
                            <p className="text-sm text-gray-600">💧 Humidité : {weather.main.humidity}%</p>
                            <div className="flex justify-between gap-3 pt-2 pb-2 px-6">
                                <div className="flex gap-2">
                                    <p className="my-auto block mb-2 text-sm font-medium text-gray-700">Timer</p>
                                    <input className="w-24 rounded-md border p-1" type="number" name="timer" id="timer" value={timer} onChange={e => setTimer(e.target.value)}/>
                                    <p className="my-auto block mb-2 text-sm font-medium text-gray-700">Seconds</p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            )}
        </div>
    </div>
    </div>
  );
}

