import React, { useEffect, useState } from "react";
import { debounce } from "lodash";

import HourlyData from "./HourlyData";
import { WeatherAPI } from "../models/weather";

const CurrentTemp = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [data, setData] = useState<WeatherAPI | null>(null);

  const [city, setCity] = useState<string>("");

  const fetchData = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    let datas = await response.json();

    setData(datas);
  };
  const debouncedFetchData = debounce(fetchData, 300); // Create debounced function once

  useEffect(() => {
    debouncedFetchData();
    return () => {
      debouncedFetchData.cancel(); // Cancel any pending debounced invocation when the component unmounts
    };
  }, [city]);

  return (
    <div className="weather  d-flex flex-column  justify-content-center align-items-center">
      <form className="form-control mb-3">
        <input
          type="text"
          placeholder="Search any city"
          onChange={(e) => setCity(e.target.value)}
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
      {data != null ? (
        <>
          {data.main != null ? (
            <>
              <h1>
                {city.charAt(0).toUpperCase() +
                  city.slice(1).toLowerCase() +
                  " (" +
                  data.sys.country +
                  ")"}
              </h1>
              <div className="p-2">
                <h3>Temperature : {data.main.temp} °C</h3>
                <h3>Humidity: {data.main.humidity}</h3>
                <h3>Status: {data.weather[0].description}</h3>
              </div>
              <HourlyData city={city} />
            </>
          ) : (
            <h1>No data found</h1>
          )}
        </>
      ) : (
        <b>Loading...</b>
      )}
    </div>
  );
};

export default CurrentTemp;
