import TelegramBot from "node-telegram-bot-api";
import { Command } from "./command";

export class StartCommand implements Command {
  private bot: TelegramBot;

  constructor(bot: TelegramBot) {
    this.bot = bot;
  }

  async execute(message: TelegramBot.Message): Promise<void> {
    this.bot.sendMessage(
      message.chat.id,
      "Provide location to see forecast or type: /subscribe city to subscrebe for our everyday forecast at 8.30 UTC! eg. /subscribe London"
    );
  }
}
