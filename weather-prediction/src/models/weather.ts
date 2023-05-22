// typescript interfaces declaring types of states and data
// interface for api fetching and will contain below data objects
export interface WeatherAPI {
  weather: Weather[];
  main: Main;
  sys: Sys;
  name: string;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
}
export interface Main {
  temp: number;
  humidity: number;
}
export interface Sys {
  country: string;
}

// Hourly Data TS

export interface HourlyDataAPI {
  list: List1[];
  city: City;
}

export interface List1 {
  main: Main1;
  weather: Weather[];
  dt_txt: string;
}

export interface Main1 {
  temp: number;
  humidity: number;
}

export interface City {
  country: string;
}
