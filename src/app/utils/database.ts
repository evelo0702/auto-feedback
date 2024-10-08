import { MongoClient } from "mongodb";

const url = process.env.MONGO_URI as string;
let connectDB: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!globalThis._mongo) {
    globalThis._mongo = new MongoClient(url).connect();
  }
  connectDB = globalThis._mongo;
} else {
  connectDB = new MongoClient(url).connect();
}

export { connectDB };
