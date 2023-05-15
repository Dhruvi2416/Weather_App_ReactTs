import React, { useEffect, useState, useMemo } from "react";
import { debounce } from "lodash";

const CurrentTemp = () => {
  const [data, setData] = useState<any>(null);

  const [city, setCity] = useState<string>("Nadiad");

  const fetchData = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cd2783566a4f7cfc5814d5f6dc152b6c&units=metric`
    );
    let datas = await response.json();

    setData(() => datas);
  };
  const debouncedFetchData = debounce(fetchData, 300); // Create debounced function once

  useEffect(() => {
    debouncedFetchData();
    return () => {
      debouncedFetchData.cancel(); // Cancel any pending debounced invocation when the component unmounts
    };
  }, [city]);

  return (
    <div className="weather" >
      {data != null ? (
        <>
          {data.main != null && data.main.temp != null ? (
            <p>{data.main.temp}</p>
          ) : (
            <p>No data found</p>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
      <form>
        <input
          type="text"
          placeholder="Search any city"
          onChange={(e) => setCity(e.target.value)}
        ></input>
      </form>
    </div>
  );
};

export default CurrentTemp;
