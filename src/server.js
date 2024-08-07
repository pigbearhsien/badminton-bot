require("dotenv").config();

const express = require("express");
const cors = require("cors");
const api = require("./api");

const app = express();

app.use(cors());

app.use("/api", api);

app.get("*", (req, res) => {
  res.status(404).json({ error: "Page did not exist" });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
