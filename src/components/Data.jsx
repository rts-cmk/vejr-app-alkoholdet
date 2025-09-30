import { useEffect, useState, forwardRef, useImperativeHandle } from "react";

export const DataComponent = forwardRef(({ locationName }, ref) => {
  const BASE_KEY_URL = "dad2950ecdb0d9ab4cb97fa736308f75";

  const [data, setData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (locationName) {
      console.log("Fetching data for location:", locationName);
      fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${locationName}&limit=2&appid=${BASE_KEY_URL}`
      )
        .then((response) => response.json())
        .then((data) => setData(data));
    }
  }, [locationName]);

  useEffect(() => {
    console.log("Data changed:", data);
    if (data) {
      Promise.all(
        data.map((locations) =>
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${locations?.lat}&lon=${locations?.lon}&units=metric&appid=${BASE_KEY_URL}`
          ).then((res) => res.json())
        )
      ).then((data) => setWeatherData(data));
    }
  }, [data]);

  const getLocationName = () => {
    if (weatherData) {
      return weatherData.map((locations) => locations?.name).join(", ");
    }
  };

  const getLocationTemp = () => {
    if (weatherData) {
      return weatherData.map((locations) => locations?.main?.temp).join(", ");
    }
  };

  const getLocationIcon = () => {
    if (weatherData) {
      return weatherData
        .map(
          (locations) =>
            `http://openweathermap.org/img/wn/${locations?.weather?.[0]?.icon}@2x.png`
        )
        .join(", ");
    }
  };

  const getLocationDescription = () => {
    if (weatherData) {
      return weatherData
        .map((locations) => locations?.weather?.[0]?.description)
        .join(", ");
    }
  };

  useImperativeHandle(ref, () => ({
    getLocationName,
    getLocationTemp,
    getLocationIcon,
    getLocationDescription,
    weatherData,
    data,
  }));

  return null;
});