import React, { Component, ChangeEvent, KeyboardEvent } from "react";
import { debounce } from "lodash";
import HourlyData from "./HourlyData";
import { WeatherAPI } from "../models/weather";

interface CurrentTempState {
  data: WeatherAPI | null;
  city: string;
}

class CurrentTemp extends Component<{}, CurrentTempState> {
  private API_KEY: string;
  private debouncedFetchData: any;

  constructor(props: {}) {
    super(props);
    this.state = {
      data: null,
      city: "",
    };
    this.API_KEY = process.env.REACT_APP_API_KEY || "";
    this.debouncedFetchData = debounce(this.fetchData, 300);
  }

  fetchData = async () => {
    const { city } = this.state;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.API_KEY}&units=metric`
    );
    const datas = await response.json();
    this.setState({ data: datas });
  };

  handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.debouncedFetchData();
    }
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ city: e.target.value });
  };

  componentDidMount() {
    this.debouncedFetchData();
  }

  componentWillUnmount() {
    this.debouncedFetchData.cancel();
  }

  render() {
    const { data, city } = this.state;

    return (
      <div className="weather d-flex flex-column justify-content-center align-items-center">
        <form className="form-control mb-5">
          <input
            type="text"
            placeholder="Search any city"
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
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
                <div className="p-2 pb-5 d-flex flex-column align-items-center">
                  <h3>Temperature: {data.main.temp} °C</h3>
                  <h3>Humidity: {data.main.humidity}</h3>
                  <h3>Status: {data.weather[0].description}</h3>
                </div>
                <div className="hourly pt-5">
                  <HourlyData city={city} />
                </div>
              </>
            ) : (
              <>
                <h1>No data found</h1>
                <p>(Please type the correct place and then ENTER)</p>
              </>
            )}
          </>
        ) : (
          <b>Loading...</b>
        )}
      </div>
    );
  }
}

export default CurrentTemp;





// import React, { useEffect, useState } from "react";
// import { debounce } from "lodash";

// import HourlyData from "./HourlyData";
// import { WeatherAPI } from "../models/weather";

// const CurrentTemp = () => {
//   const API_KEY = process.env.REACT_APP_API_KEY;

//   const [data, setData] = useState<WeatherAPI | null>(null);

//   const [city, setCity] = useState<string>("");

//   const fetchData = async () => {
//     const response = await fetch(
//       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
//     );
//     let datas = await response.json();

//     setData(datas);
//   };
//   const debouncedFetchData = debounce(fetchData, 300); // Create debounced function once

//   useEffect(() => {
//     debouncedFetchData();
//     return () => {
//       debouncedFetchData.cancel(); // Cancel any pending debounced invocation when the component unmounts
//     };
//   }, [city]);

//   function handleKeyDown(e:React.KeyboardEvent<HTMLInputElement>) {
//     if (e.key === 'Enter') {
//       e.preventDefault();
    
//     }
//   }

//   return (
//     <div className="weather  d-flex flex-column  justify-content-center align-items-center">
//       <form className="form-control mb-5">
//         <input
//           type="text"
          
//           placeholder="Search any city"
//           onChange={(e) => setCity(e.target.value)}
//           onKeyDown={(e)=>handleKeyDown(e)}
//         ></input>
//       </form>
//       <span>
//         {city !== "" && (
//           <h5>
//             Searched for -{" "}
//             {city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()}
//           </h5>
//         )}
//       </span>
//       {data != null ? (
//         <>
//           {data.main != null ? (
//             <>
//               <h1>
//                 {city.charAt(0).toUpperCase() +
//                   city.slice(1).toLowerCase() +
//                   " (" +
//                   data.sys.country +
//                   ")"}
//               </h1>
//               <div className="p-2 pb-5">
//                 <h3>Temperature : {data.main.temp} °C</h3>
//                 <h3>Humidity: {data.main.humidity}</h3>
//                 <h3>Status: {data.weather[0].description}</h3>
//               </div>
//               <div className="hourly pt-5">
//               <HourlyData city={city} />
//               </div>
//             </>
//           ) : (<>
//             <h1>No data found</h1>
//             <p>(Please type correct place)</p></>
//           )}
//         </>
//       ) : (
//         <b>Loading...</b>
//       )}
//     </div>
//   );
// };

// export default CurrentTemp;



