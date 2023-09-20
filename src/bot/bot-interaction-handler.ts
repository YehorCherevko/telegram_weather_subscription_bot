import TelegramBot, { Message } from "node-telegram-bot-api";
import { LocationCommand } from "../commands/location-command";
import { WeatherService } from "../weather/weather-service";
import { StartCommand } from "../commands/start-command";
import { connectToDatabase } from "../db/mongodb";

class BotInteractionHandler {
  private bot: TelegramBot;
  private locationHandler: LocationCommand;
  private startHandler: StartCommand;

  constructor(bot: TelegramBot, weatherService: WeatherService) {
    this.bot = bot;
    this.locationHandler = new LocationCommand(bot, weatherService);
    this.startHandler = new StartCommand(bot);
  }

  async handle(message: Message): Promise<void> {
    const input = message.text?.trim().toLowerCase() || "";

    if (input.startsWith("/start")) {
      await this.startHandler.execute(message);
    } else if (input.startsWith("/subscribe")) {
      await this.handleSubscription(message);
    } else {
      await this.locationHandler.execute(message);
    }
  }

  async handleSubscription(message: Message): Promise<void> {
    const userId = message.from?.id;
    const commandText = message.text || "";

    if (userId && commandText.startsWith("/subscribe ")) {
      const city = commandText.substring("/subscribe ".length).trim();

      const db = await connectToDatabase();
      const collection = db.collection("subscriptions");

      await collection.updateOne(
        { userId },
        { $set: { userId, city } },
        { upsert: true }
      );

      await this.bot.sendMessage(
        message.chat.id,
        `You are subscribed to weather updates for ${city}!`
      );
    } else {
      await this.bot.sendMessage(
        message.chat.id,
        `To subscribe, use the format: /subscribe city`
      );
    }
  }
}

export default BotInteractionHandler;
