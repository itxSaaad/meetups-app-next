import { connectDb } from "../../db";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const newMeetup = {
      title: data.title,
      image: data.image,
      address: data.address,
      description: data.description,
    };

    const client = await connectDb();
    const db = client.db();

    const result = await db.collection("meetups").insertOne(newMeetup);

    // console.log(result);

    res.status(201).json({ message: "Meetup Inserted!" });
  }
}

export default handler;
