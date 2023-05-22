import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { HourlyDataAPI, List1 } from "../models/weather";

type HourlyDataProp = {
  city: string;
};
const HourlyData: React.FC<HourlyDataProp> = ({ city }) => {
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [data, setData] = useState<HourlyDataAPI | null>(null);
  const date = new Date();
  const formattedDate = format(date, "dd");
  // On first loading data will be displayed by calling API
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
    <div className="data-collection d-flex flex-column align-items-center">
      <h3>Forecasted 3 hours Data</h3>
      <div className="table-container mt-2">
        <table className="table">
          <thead className="headpart">
            <tr>
              <th scope="col">Tempearature</th>
              <th scope="col">Humidity</th>
              <th scope="col">Status</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody className="mt-4">
            {data != null ? (
              <>
                {data.list != null ? (
                  <>
                    {data.list.map((val: List1, index: number) =>
                      // checking only dates will forcast 3 hr data of today and two more days
                      parseInt(val.dt_txt.slice(8, 10)) -
                        parseInt(formattedDate) <=
                      2 ? (
                        <tr key={index}>
                          <td>
                            <p>{val.main.temp} °C</p>
                          </td>
                          <td>
                            <p>{val.main.humidity}</p>
                          </td>
                          <td>
                            <p>{val.weather[0].description}</p>
                          </td>
                          <td>
                            {/* achieve formatted date */}
                            {val.dt_txt.slice(8, 10) +
                              "-" +
                              val.dt_txt.slice(5, 7) +
                              "-" +
                              val.dt_txt.slice(0, 4) +
                              " " +
                              val.dt_txt.slice(10, 19)}
                          </td>{" "}
                        </tr>
                      ) : null
                    )}
                  </>
                ) : (
                  <h1>No data found</h1>
                )}
              </>
            ) : (
              <h4>Loading...</h4>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HourlyData;
