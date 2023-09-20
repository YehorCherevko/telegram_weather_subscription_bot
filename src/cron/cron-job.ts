import cron from "cron";
import { closeDatabaseConnection, connectToDatabase } from "../db/mongodb";
import { WeatherService } from "../weather/weather-service";
import TelegramBot from "node-telegram-bot-api";
import { WeatherForecast } from "../weather/weather-interfaces";
import { LocationCommand } from "../commands/location-command";
import { config } from "../config/config";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const timeZone = config.TZ;

const bot = new TelegramBot(config.botToken);

const cronJob = new cron.CronJob("30 08 * * *", async () => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("subscriptions");
    const subscribers = await collection.find({}).toArray();

    if (subscribers.length === 0) {
      console.log("No subscribers found.");
      return;
    }

    const weatherService = new WeatherService();
    const locationCommand = new LocationCommand(bot, weatherService);

    for (const subscriber of subscribers) {
      const { userId, city } = subscriber;

      const weatherData: WeatherForecast =
        await weatherService.getWeatherForecast(city);

      const weatherMessage = locationCommand.formatWeather(city, weatherData);

      await bot.sendMessage(userId, weatherMessage, {
        parse_mode: "HTML",
      });
    }

    console.log("Weather notifications sent.");
  } catch (error) {
    console.error("Error sending weather notifications:", error);
  } finally {
    closeDatabaseConnection();
  }
});

cronJob.start();
