import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

const Data = forwardRef(({ locationName }, ref) => {
  const BASE_KEY_URL = import.meta.env.VITE_API_KEY;

  const [data, setData] = useState(null);

  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (locationName) {
      fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${locationName}&limit=1&appid=${BASE_KEY_URL}`
      )
        .then((response) => response.json())
        .then((data) => setData(data));
    }
  }, [locationName]);

  useEffect(() => {
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

  // Functions for fetching specific data on each location

  const getLocationName = () => {
    if (data && weatherData) {
      // Pair each geocoding location with its corresponding weather location
      const pairedNames = data.map((location, index) => {
        const geoName = location?.name;
        const weatherName = weatherData[index]?.name;

        // If they're the same, just return one name
        if (geoName === weatherName) {
          return geoName;
        }

        // If they're different, combine them
        return `${geoName}, ${weatherName}`;
      });

      console.log(
        "Geo names:",
        data.map((loc) => loc?.name)
      );
      console.log(
        "Weather names:",
        weatherData.map((weather) => weather?.name)
      );
      console.log("Paired names:", pairedNames);

      return pairedNames.join(" | ");
    }

    // Fallback to just geo names if weather data isn't ready yet
    if (data) {
      return data.map((location) => location?.name).join(", ");
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

  // Exposing the functions
  useImperativeHandle(ref, () => ({
    getLocationName,
    getLocationTemp,
    getLocationIcon,
    getLocationDescription,
    weatherData,
    data,
  }));

  return <></>;
});

export default Data;
