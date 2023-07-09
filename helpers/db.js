import { MongoClient } from "mongodb";

export async function connectDb() {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();

    console.log(`MongoDB Connection Build Successfully!`);
    return client;
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
}
