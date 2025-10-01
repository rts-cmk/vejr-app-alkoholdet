import { useState } from "react";

export function useWeatherData() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [forecast, setForecast] = useState([]);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchWeather = async (cityName) => {
    setIsLoading(true);
    setError(null);
    setWeatherInfo(null);

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

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );

      const forecastData = await forecastResponse.json();
      console.log("Forecast data:", forecastData);

      // Filter forecast to get one entry per unique date
      const seenDates = new Set();
      const dailyForecast = forecastData.list
        .filter((item) => {
          // Extract date part from dt_txt (e.g., "2023-10-15 12:00:00" -> "2023-10-15")
          const dateOnly = item.dt_txt.split(" ")[0];

          // If we haven't seen this date before, add it and include this item
          if (!seenDates.has(dateOnly)) {
            seenDates.add(dateOnly);
            console.log("New date found:", dateOnly, "Time:", item.dt_txt);
            return true;
          }
          // If we've seen this date before, skip it
          return false;
        })
        .slice(0, 5); // Limit to 5 days

      console.log("Daily forecast:", dailyForecast);

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

      setForecast({
        forecastList: dailyForecast,
      });
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { weatherInfo, forecast, isLoading, error, fetchWeather };
}
