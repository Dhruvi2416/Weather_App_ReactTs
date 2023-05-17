export interface WeatherAPI {
  weather: Weather[];

  main: Main;

  dt: number;
  sys: Sys;

  id: number;
  name: string;
}

export interface Sys {
  country: string;
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

export interface HourlyDataAPI {
  list: List1[];
  city: City;
}

export interface List1 {
  dt: number;
  main: Main1;
  weather: Weather[];

  dt_txt: string;
}

export interface Main1 {
  temp: number;

  humidity: number;
}

export interface Weather {
  description: string;
}

export interface City {
  country: string;
}
