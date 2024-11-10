import { MongoClient } from "mongodb";

const client = new MongoClient(
  "mongodb+srv://kanksha44:kanksha44@cluster0.2outp2n.mongodb.net/nextusers?retryWrites=true&w=majority&appName=Cluster0"
);

async function connectToDatabase() {
  const db = client.db("nextusers");
  return db;
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const db = await connectToDatabase();
      const usersCollection = db.collection("users");
      const users = await usersCollection.find({}).toArray();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }

  if (req.method === "POST") {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    try {
      const db = await connectToDatabase();
      const usersCollection = db.collection("users");
      const user = { name, email };
      const result = await usersCollection.insertOne(user);
      const createdUser = await usersCollection.findOne({
        _id: result.insertedId,
      });
      res.status(201).json(createdUser);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  }
}
