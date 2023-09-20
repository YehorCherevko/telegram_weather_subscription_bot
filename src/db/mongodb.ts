import { MongoClient, Db } from "mongodb";
import { config } from "../config/config";

const client = new MongoClient(config.mongoUri);

export async function connectToDatabase(): Promise<Db> {
  await client.connect();
  return client.db("subscription_bot");
}

export async function closeDatabaseConnection(): Promise<void> {
  await client.close();
}
