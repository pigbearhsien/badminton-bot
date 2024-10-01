// conversation.js
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

let client;
let db;

const initDB = async () => {
  if (db) return db; // Return the existing connection if it exists

  client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
    db = client.db("Noah"); // Replace with your database name
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

const getConversation = async (userId) => {
  if (!db) {
    await initDB();
  }
  const collection = db.collection("Chat");
  const conversation = await collection.findOne({ userId });
  return conversation ? conversation.messages : [];
};

const saveConversation = async (userId, messages) => {
  if (!db) {
    await initDB();
  }
  const collection = db.collection("Chat");
  await collection.updateOne(
    { userId },
    { $set: { messages } },
    { upsert: true }
  );
};

module.exports = {
  initDB,
  getConversation,
  saveConversation,
};
