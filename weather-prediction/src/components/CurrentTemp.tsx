import React, { useEffect, useState, useMemo } from "react";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";

const CurrentTemp = () => {
  const API_KEY = process.env.REACT_APP_API_KEY
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  
  const [city, setCity] = useState<string>("Nadiad");

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
    <div className="weather">
      <form>
        <input
          type="text"
          placeholder="Search any city"
          onChange={(e) => setCity(e.target.value)}
        ></input>
      </form>
      <span>
        <h5>
          Searched for -{" "}
          {city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()}
        </h5>
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
              <h3>Temperature : {data.main.temp} °C</h3>
              <h3>Humidity: {data.main.humidity}</h3>
              <h3>Status: {data.weather[0].description}</h3>
              <button
                onClick={() =>
                  navigate("/hourly", {
                    state: { city: city },
                  })
                }
              >
                Get Hourly Data
              </button>
              <button onClick={() => navigate("/monthly")}>
                Get Monthly Data
              </button>
              <button onClick={() => navigate("/yearly")}>
                Get Yearly Data
              </button>
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
