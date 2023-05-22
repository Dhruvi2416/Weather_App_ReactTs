import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import HourlyData from "./HourlyData";
import { WeatherAPI } from "../models/weather";

const CurrentTemp = () => {
  // API key will be directly applied to API_KEY from .env file
  const API_KEY = process.env.REACT_APP_API_KEY;
  // Firstly data will be null and then when data will beloaded on searching city WeatherApi data will be displayed
  const [data, setData] = useState<WeatherAPI | null>(null);
  // City is null when city will be searched it will be set accordingly
  const [city, setCity] = useState<string>("");
  // Fetching data function
  const fetchData = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    let datas = await response.json();

    setData(datas);
  };
  // Debounce so that on each city name typed api is not called
  const debouncedFetchData = debounce(fetchData, 300); // Create debounced function once
  // Debounced function will be callled on change of city name
  useEffect(() => {
    debouncedFetchData();
    return () => {
      debouncedFetchData.cancel(); // Cancel any pending debounced invocation when the component unmounts
    };
  }, [city]);
  // While on enter it do not refresh the page
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  return (
    <div className="weather  d-flex flex-column  justify-content-center align-items-center">
      <form className="form-control mb-3">
        <input
          type="text"
          placeholder="Search any city"
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        ></input>
      </form>
      <span>
        {city !== "" && (
          <h5>
            Searched for -{" "}
            {city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()}
          </h5>
        )}
      </span>
      {/* Data is not found then loading else if data is found 2 answers can be get 1. API called as per city name or else cityname is wrong then it will give data with error */}
      {data != null ? (
        <>
          {/* Data may be found but city name is wrong hence if else i.e if ? city name is correct else city name is not correct */}
          {data.main != null ? (
            <>
              <h1>
                {city.charAt(0).toUpperCase() +
                  city.slice(1).toLowerCase() +
                  " (" +
                  data.sys.country +
                  ")"}
              </h1>
              <div className="p-2 pb-3 d-flex flex-column align-items-center">
                <h3>Temperature : {data.main.temp} °C</h3>
                <h3>Humidity: {data.main.humidity}</h3>
                <h3>Status: {data.weather[0].description}</h3>
              </div>
              <div className="hourly pt-3">
                {/* Table details of temp */}
                <HourlyData city={city} />
              </div>
            </>
          ) : (
            <>
              <h1>No data found</h1>
              <p>(Please type correct place)</p>
            </>
          )}
        </>
      ) : (
        <b>Loading...</b>
      )}
    </div>
  );
};

export default CurrentTemp;
