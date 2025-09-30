import { useRef, useState } from "react";
import Test from "./components/Test";

function App() {
  const locationRef = useRef();
  const [weatherInfo, setWeatherInfo] = useState({ location: "", temp: "" });
  const [cityName, setCityName] = useState("");

  // Example on how we can use the functions from the test aka data component
  const handleGetWeatherInfo = () => {
    if (locationRef.current) {
      console.log("locationRef.current:", locationRef.current);
      const location = locationRef.current.getLocationName();
      const temp = locationRef.current.getLocationTemp();
      setWeatherInfo({ location, temp });

      // locationRef.current.getLocationIcon();
      // locationRef.current.getLocationDescription();
      // locationRef.current.weatherData;
      // locationRef.current.data;
    }
  };

  const handleSearch = (event) => {
    const cityName = event.target.value;
    return setCityName(cityName);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search for a city..."
        onChange={handleSearch}
      />
      <button onClick={handleGetWeatherInfo}>Get Weather Info</button>
      <Test ref={locationRef} locationName={cityName} />

      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          border: "1px solid #ccc",
        }}>
        <h2>Weather Info</h2>
        {weatherInfo.location && (
          <div>
            <p>Location: {weatherInfo.location}</p>
            <p>Temperature: {weatherInfo.temp} °C</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
