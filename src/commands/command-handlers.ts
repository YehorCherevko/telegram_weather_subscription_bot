import TelegramBot from "node-telegram-bot-api";
import { Command } from "./command";
import { StartCommand } from "./start-command";
import { SubscriptionCommand } from "./subscription-command";
import { WeatherService } from "../weather/weather-service";

export function getCommandHandlers(
  bot: TelegramBot,
  weatherService: WeatherService
): Map<string, Command> {
  const handlers = new Map<string, Command>();
  handlers.set("/start", new StartCommand(bot));
  handlers.set("/subscribe", new SubscriptionCommand(bot, weatherService));
  return handlers;
}
