require("dotenv").config();

const express = require("express");
const cors = require("cors");
const api = require("./api");
const PORT = 3001;

// Initialize the database and start the server
const { initDB } = require("./utils/chat");

initDB()
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.error("Failed to initialize database", err);
  });

const app = express();

app.use(cors());

app.use("/api", api);

app.get("*", (req, res) => {
  res.status(404).json({ error: "Page did not exist" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
