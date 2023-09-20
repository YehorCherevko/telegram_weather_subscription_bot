import TelegramBot from "node-telegram-bot-api";
import { Command } from "./command";
import { WeatherService } from "../weather/weather-service";
import { WeatherForecast } from "../weather/weather-interfaces";

export class LocationCommand implements Command {
  private bot: TelegramBot;
  private weatherService: WeatherService;

  constructor(bot: TelegramBot, weatherService: WeatherService) {
    this.bot = bot;
    this.weatherService = weatherService;
  }

  async execute(message: TelegramBot.Message): Promise<void> {
    const chatId = message.chat.id;
    const city = message.text;

    if (city && city.toLowerCase() !== "/start") {
      try {
        const weatherData = await this.weatherService.getWeatherForecast(city);
        const weatherMessage = this.formatWeather(city, weatherData);

        this.bot.sendMessage(chatId, weatherMessage, {
          parse_mode: "HTML",
        });
      } catch (error) {
        console.error("Error fetching weather data", error);
        this.bot.sendMessage(chatId, `The forecast for ${city} is not found`);
      }
    }
  }

  formatWeather(city: string, weatherData: WeatherForecast): string {
    let message = `Here's the 1-day / 3-hour weather forecast for <b>${city}</b>:\n\n`;
    const numberOfForecasts = 8; // 8 forecasts every day

    for (let i = 0; i < numberOfForecasts; i++) {
      const forecast = weatherData.list[i];
      const timestamp = new Date(forecast.dt * 1000);
      const temperature = forecast.main.temp;
      const description = forecast.weather[0].description;
      const humidity = forecast.main.humidity;
      const windSpeed = forecast.wind.speed;
      const cloudiness = forecast.clouds.all;

      message +=
        `<i>${timestamp.toLocaleString()}</i>\n` +
        `🌡️ Temperature: <b>${temperature}°C</b>\n` +
        `☁️ Description: <b>${description}</b>\n` +
        `💧 Humidity: <b>${humidity}%</b>\n` +
        `🌬️ Wind Speed: <b>${windSpeed} m/s</b>\n` +
        `☁️ Cloudiness: <b>${cloudiness}%</b>\n\n`;
    }

    return message;
  }
}
