import axios from "axios";
import { config } from "../config/config";

export class WeatherService {
  async getWeatherForecast(city: string) {
    const API_KEY = config.weatherApiKey;
    const weatherUrl = this.buildWeatherUrl(API_KEY, city);
    const response = await axios.get(weatherUrl);

    return response.data;
  }

  private buildWeatherUrl(api: string, city: string) {
    return `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api}&units=metric`;
  }
}
