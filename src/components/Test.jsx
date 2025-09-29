import React, { useEffect, useState } from "react";

export default function Test() {
  const BASE_KEY_URL = import.meta.env.VITE_API_KEY;

  const [location, setLocation] = useState(null);

  const [data, setData] = useState(null);

  // useEffect(() => {
  //     fetch(
  //         `http://api.openweathermap.org/geo/1.0/direct?q=roskilde&limit=11&appid=${BASE_KEY_URL}`
  //       )
  //       .then((response) => response.json())
  //       .then((data) => setData(data));
  //   }, []);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=44&lon=24&appid=${BASE_KEY_URL}`
    ).then((response) => response.json().then((data) => console.log(data)));
  }, []);

  return (
    <>
      <h1>Test Component</h1>
      <p>{}</p>
    </>
  );
}
