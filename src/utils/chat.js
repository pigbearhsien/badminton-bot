// conversation.js
const { MongoClient } = require("mongodb");

let db;

const initDB = async () => {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db("Noah");
};

const getConversation = async (userId) => {
  const collection = db.collection("chat");
  const conversation = await collection.findOne({ userId });
  return conversation ? conversation.messages : [];
};

const saveConversation = async (userId, messages) => {
  const collection = db.collection("chat");
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
