import TelegramBot, { Message } from "node-telegram-bot-api";
import { config } from "./config/config";
import BotInteractionHandler from "./bot/bot-interaction-handler";
import { WeatherService } from "./weather/weather-service";

import "./cron/cron-job";

const TOKEN = config.botToken;

const bot: TelegramBot = new TelegramBot(TOKEN, { polling: true });
const weatherService = new WeatherService();

const interactionHandler = new BotInteractionHandler(bot, weatherService);

bot.onText(/.*/, (message: Message) => {
  interactionHandler.handle(message);
});
