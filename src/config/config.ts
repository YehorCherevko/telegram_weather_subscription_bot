import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  botToken: process.env.TOKEN || "",
  weatherApiKey: process.env.API_KEY || "",
  mongoUri: process.env.MONGO_URI || "",
  TZ: process.env.TZ || "UTC",
};
