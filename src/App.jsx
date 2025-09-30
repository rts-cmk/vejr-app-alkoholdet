import { useState, useEffect } from "react";
import { SearchBar } from "./components/SearchBar.jsx";
import { useWeatherData } from "./components/Data.jsx";

export default function App() {
  const [searchInput, setSearchInput] = useState("");
  const [currentCity, setCurrentCity] = useState("Lyngby");
  const { weatherInfo, forecast, isLoading, error, fetchWeather } =
    useWeatherData();

  const handleSearch = () => {
    if (searchInput.trim()) {
      setCurrentCity(searchInput.trim());
      fetchWeather(searchInput.trim());
    }
  };

  // Load initial city weather on mount
  useEffect(() => {
    fetchWeather(currentCity);
  }, []);

  // Debug forecast data
  // console.log("Forecast state:", forecast);
  // console.log("Forecast list length:", forecast?.forecastList?.length);
  // if (forecast?.forecastList && forecast.forecastList.length > 0) {
  //   console.log("First forecast item:", forecast.forecastList[0]);
  //   console.log("First forecast temp:", forecast.forecastList[0]?.main?.temp);
  // }

  const forecastMap = forecast?.forecastList?.map((item, index) => (
    <li key={index} className="text-center">
      <div className="text-lg font-semibold text-white-800">
        {Math.round(item?.main?.temp)}°C
      </div>
      <div className="text-sm text-white-500 capitalize">
        {item?.weather?.[0]?.description}
      </div>
      <div className="text-sm text-white-500">
        <img
          src={`https://openweathermap.org/img/wn/${item?.weather?.[0]?.icon}@2x.png`}
          alt={item?.weather?.[0]?.description}
        />
      </div>
      <div className="text-sm text-white-500">
        {new Date(item?.dt_txt).toLocaleDateString(undefined, {
          weekday: "short",
          month: "short",
          day: "numeric",
        })}
      </div>
    </li>
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <SearchBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          onSearch={handleSearch}
        />

        {isLoading && (
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-24 bg-gray-200 rounded w-24 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center">
            <div className="text-red-500 text-lg">❌ {error}</div>
          </div>
        )}

        {weatherInfo && !isLoading && (
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 animate-fadeIn">
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="text-2xl">📍</span>
              <h2 className="text-2xl font-bold text-gray-800">
                {weatherInfo.location}
                {weatherInfo.country && (
                  <span className="text-gray-500 text-lg ml-2">
                    {weatherInfo.country}
                  </span>
                )}
              </h2>
            </div>

            <div className="flex items-center justify-center gap-4 mb-6">
              {weatherInfo.icon && (
                <img
                  src={`https://openweathermap.org/img/wn/${weatherInfo.icon}@4x.png`}
                  alt={weatherInfo.description}
                  className="w-32 h-32"
                />
              )}
              <div>
                <div className="text-6xl font-bold text-gray-800">
                  {weatherInfo.temp}°
                </div>
                <div className="text-gray-500 capitalize mt-2">
                  {weatherInfo.description}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl mb-2">🌡️</div>
                <div className="text-sm text-gray-500">Feels like</div>
                <div className="text-lg font-semibold text-gray-800">
                  {weatherInfo.feelsLike}°
                </div>
              </div>

              <div className="text-center">
                <div className="text-2xl mb-2">💧</div>
                <div className="text-sm text-gray-500">Humidity</div>
                <div className="text-lg font-semibold text-gray-800">
                  {weatherInfo.humidity}%
                </div>
              </div>

              <div className="text-center">
                <div className="text-2xl mb-2">💨</div>
                <div className="text-sm text-gray-500">Wind</div>
                <div className="text-lg font-semibold text-gray-800">
                  {weatherInfo.windSpeed} m/s
                </div>
              </div>
            </div>
          </div>
        )}
        <ul className="flex">{forecastMap}</ul>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
