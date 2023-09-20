export interface WeatherForecastItem {
  dt: number;
  main: WeatherMainData;
  weather: WeatherDescription[];
  wind: WindData;
  clouds: CloudData;
}

interface WeatherMainData {
  temp: number;
  humidity: number;
}

interface WeatherDescription {
  description: string;
}

interface WindData {
  speed: number;
}

interface CloudData {
  all: number;
}

export interface WeatherForecast {
  list: WeatherForecastItem[];
}
