import TelegramBot from "node-telegram-bot-api";
import { Command } from "./command";
import BotInteractionHandler from "../bot/bot-interaction-handler";
import { WeatherService } from "../weather/weather-service";

export class SubscriptionCommand implements Command {
  private bot: TelegramBot;
  private weatherService: WeatherService;

  constructor(bot: TelegramBot, weatherService: WeatherService) {
    this.bot = bot;
    this.weatherService = weatherService;
  }

  async execute(message: TelegramBot.Message): Promise<void> {
    const interactionHandler = new BotInteractionHandler(
      this.bot,
      this.weatherService
    );
    interactionHandler.handleSubscription(message);
  }
}
