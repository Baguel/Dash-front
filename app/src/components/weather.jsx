import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function WeatherWidget({id}) {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(5);
  let token = localStorage.getItem("token");
  const navigate = useNavigate();

  const API_KEY = "d81ffeff9a8bada9238ea792ddabe4fc"; 

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Veuillez entrer une ville.");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`
      );
      setWeather(response.data);
      setError("");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("");
      }
      setWeather(null);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  };

  useEffect(() => {
      const b = setInterval(() => {
          console.log('oku')
          fetchWeather();
      }, timer * 1000)
      return () => { clearInterval(b) };
    }, [timer]);

    function alert(id) {
      axios.delete(`http://localhost:3000/user/deleteService/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then((res) => {
           navigate("/home")
        })
        .catch((err) => {
            console.log(err)
        });
  }

  return (
    <div className="aspect-video rounded-xl bg-muted/50">
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-end">
          <p onClick={() => alert(id)} className="text-red-500 font-semibold hover:cursor-pointer">x</p>
      </div>
        <div className="overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]"> 
            <div className="p-6 pb-2 flex flex-row items-center justify-between border-b border-gray-100">
                <div className="flex items-center space-x-3">
                    <h3 className="text-xl font-semibold text-gray-900"> 🌍 Météo en temps réel </h3>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                    <span className="hidden sm:inline-block">Powered by&nbsp;</span>
                    <span className="font-medium text-indigo-600">WeatherAPI</span>
                </div>
            </div>
            <div className="m-5">

                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Entrez une ville"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                />
                <button
                  onClick={fetchWeather}
                  className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-4 transition duration-300"
                >
                  Rechercher
                </button>
            </div>
            {weather && (
            <div className="mt-4 text-center">
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
              <p className="text-sm text-gray-600">🌅 Lever du soleil : {formatTime(weather.sys.sunrise)}</p>
              <p className="text-sm text-gray-600">🌇 Coucher du soleil : {formatTime(weather.sys.sunset)}</p>
            </div>
          )}
            <div className="flex justify-between gap-3 pt-2 pb-2 px-6">
                <div className="flex gap-2">
                  <p className="my-auto block mb-2 text-sm font-medium text-gray-700">Timer</p>
                  <input className="w-24 rounded-md border p-1" type="number" name="timer" id="timer" value={timer} onChange={e => setTimer(e.target.value)}/>
                  <p className="my-auto block mb-2 text-sm font-medium text-gray-700">Seconds</p>
                </div>
            </div>
        </div>
    </div>
    </div>
  );
}