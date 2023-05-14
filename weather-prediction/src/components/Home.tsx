import React, { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState<any>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [city, setCity] = useState<string>("Nadiad");
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    const fetchData= async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cd2783566a4f7cfc5814d5f6dc152b6c&units=metric`
      );
      let datas = await response.json();
      // console.log(datas.main.temp)
      setData(datas);
    };
    fetchData();
  }, [city]);
  return (
    <div>
      {data != null ? (<>
        <p>
          Your current loation is {latitude} & {longitude}
        </p>
         {data.main!=null && data.main.temp!= null?<p>{data.main.temp}</p>:<p>No data found</p>}
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

export default Home;
