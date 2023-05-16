import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
const HourlyData = () => {
  const location = useLocation();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(
  //       `https://api.openweathermap.org/data/2.5/weather?q=${location.state.city}&appid=cd2783566a4f7cfc5814d5f6dc152b6c&units=metric`
  //     );
  //     let datas = await response.json();
  //     console.log(datas);
  //   };
  //   fetchData();
  // }, []);

  return <div>HourlyData {location.state.name}</div>;
};

export default HourlyData;
