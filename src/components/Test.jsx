import React, { useEffect } from 'react';

export default function Test() {

    const BASE_KEY_URL = import.meta.env.VITE_API_KEY;
    
    useEffect (() => {
        fetch(`${BASE_KEY_URL}`)
        .then(response => response.json())
        .then(data => console.log(data))
    }
    , []);

  return (
    <>
      <h1>Test Component</h1>
      <p>{}</p>
    </>
  )
}