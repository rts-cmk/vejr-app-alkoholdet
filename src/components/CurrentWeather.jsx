export default function CurrentWeather() {

    const BASE_KEY_URL = import.meta.env.VITE_API_KEY;

    const [location, setLocation] = useState(null);

    const [data, setData] = useState(null);

    const city = "Roskilde";

    const temperature = "20°C";

    const weatherDescription = "Sunny";

  return (
    <>
        <h1>Current Weather Component</h1>
        <h2>${city}</h2>

        <p>Temperature: ${temperature}</p>
        <p>Condition: ${weatherDescription}</p>

    </>
  );
}