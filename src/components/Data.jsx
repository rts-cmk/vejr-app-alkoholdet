import { useState } from "react";

export function useWeatherData() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [foreCastInfo, setForeCastInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchWeather = async (cityName) => {
    setIsLoading(true);
    setError(null);
    setWeatherInfo(null);
    setForeCastInfo(null);

    try {
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
      );
      const geoData = await geoResponse.json();

      if (!geoData || geoData.length === 0) {
        setError("City not found. Please try another city.");
        setIsLoading(false);
        return;
      }

      const { lat, lon } = geoData[0];

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const weatherData = await weatherResponse.json();

      const foreCastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );


      const foreCastData = await foreCastResponse.json();
      console.log(foreCastData);
     

      setWeatherInfo({
        location: geoData[0]?.name,
        // location: weatherData.name,
        country: weatherData.sys?.country,
        temp: Math.round(weatherData.main?.temp),
        feelsLike: Math.round(weatherData.main?.feels_like),
        description: weatherData.weather?.[0]?.description,
        icon: weatherData.weather?.[0]?.icon,
        humidity: weatherData.main?.humidity,
        windSpeed: weatherData.wind?.speed,
      });

      setForeCastInfo({
        foreCastList: foreCastData.list,
        city: foreCastData.city,
        country: foreCastData.city?.country,
      });

    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");;
    } finally {
      setIsLoading(false);
    }
  };

  return { weatherInfo, foreCastInfo, isLoading, error, fetchWeather };
}
