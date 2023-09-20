import { Message } from "node-telegram-bot-api";

export interface Command {
  execute(message: Message): Promise<void>;
}
