import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
const HourlyData = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const location = useLocation();
  const city = location.state.city;
  const [data, setData] = useState<any>(null);
  const date = new Date();
  const formattedDate = format(date, "yyyy-MM-dd");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      let datas = await response.json();

      setData(datas);
    };
    fetchData();
  }, []);

  return (
    <div>
      {data != null ? (
        <>
          {data.list != null ? (
            <>
              <h1>
                {city.charAt(0).toUpperCase() +
                  city.slice(1).toLowerCase() +
                  " (" +
                  data.city.country +
                  ")"}
              </h1>

              <div className="card-collection">
                {data.list.map((val: any, index: number) =>
                  val.dt_txt.slice(0, 10) == formattedDate ? (
                    <div key={index}>
                      <div className="card m-2 d-flex">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                          <h5 className="card-title"></h5>
                          <hr />
                          <h6 className="card-text">
                            <p>Temperature : {val.main.temp} °C</p>
                            <p>Humidity: {val.main.humidity}</p>
                            <p>Status: {val.weather[0].description}</p>
                          </h6>
                          <p>
                            Hourly Data of <b>{val.dt_txt}</b>
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null
                )}
              </div>
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

export default HourlyData;
