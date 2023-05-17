import React, { useEffect, useState } from "react";

import { format } from "date-fns";
type hourlyDataProp = {
  city: string;
};
const HourlyData: React.FC<hourlyDataProp> = ({ city }) => {
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [data, setData] = useState<any>(null);
  const date = new Date();
  const formattedDate = format(date, "dd");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      let datas = await response.json();
      console.log(datas);
      setData(datas);
    };
    fetchData();
  }, []);
  console.log(data);
  return (
    <div className="data-collection">
      <h3>Forecasted 3 hours Data</h3>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Tempearature</th>
              <th scope="col">Humidity</th>
              <th scope="col">Status</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            {data != null ? (
              <>
                {data.list != null ? (
                  <>
                    {data.list.map((val: any, index: number) =>
                      parseInt(val.dt_txt.slice(8, 10)) -
                        parseInt(formattedDate) <=
                      2 ? (
                        <tr key={index}>
                          {/* <td>
                          {" "}
                          <img
                            src={`https://source.unsplash.com/random/900x700/?${val.weather[0].description}`}
                            className="card-img-top"
                            alt="..."
                          />
                        </td> */}
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
