// conversation.js
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

const options = {
  serverSelectionTimeoutMS: 5000, // Adjust as needed
};

let client;
let db;
let clientPromise;

const initDB = async () => {
  if (db) return db; // Return the existing connection if it exists

  if (!clientPromise) {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }

  client = new MongoClient(uri, options);

  try {
    await clientPromise;
    console.log("Connected to MongoDB Atlas");
    db = client.db("Noah");
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

const getConversation = async (userId) => {
  await initDB();
  if (!db) {
    throw new Error("Database not initialized");
  }
  const collection = db.collection("Chat");
  const conversation = await collection.findOne({ userId });
  return conversation ? conversation.messages : [];
};

const saveConversation = async (userId, messages) => {
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
