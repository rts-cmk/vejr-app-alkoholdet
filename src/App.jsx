import { useRef, useState } from "react";
import Test from "./components/Test";

function App() {
  const testRef = useRef();
  const [weatherInfo, setWeatherInfo] = useState({ location: "", temp: "" });

  // Example on how we can use the functions from the test aka data component
  const handleGetWeatherInfo = () => {
    if (testRef.current) {
      const location = testRef.current.getLocationName();
      const temp = testRef.current.getLocationTemp();
      setWeatherInfo({ location, temp });

      // testRef.current.getLocationIcon();
      // testRef.current.getLocationDescription();
      // testRef.current.weatherData;
      // testRef.current.data;
    }
  };

  return (
    <>
      <Test ref={testRef} locationName="Lyngby" />

      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          border: "1px solid #ccc",
        }}>
        <h2>Weather Info from App.jsx:</h2>
        <button onClick={handleGetWeatherInfo}>Get Weather Info</button>
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
