require("dotenv").config();

const express = require("express");
const api = require("./api");
// const line = require("@line/bot-sdk");
// const openAIChat = require("./utils/openai");

// // create LINE SDK config from env variables
// const config = {
//   channelSecret: process.env.CHANNEL_SECRET,
// };

// // create LINE SDK client
// const client = new line.messagingApi.MessagingApiClient({
//   channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
// });

const app = express();

app.use("/", api);

// app.post("/callback", line.middleware(config), (req, res) => {
//   Promise.all(req.body.events.map(handleEvent))
//     .then((result) => res.json(result))
//     .catch((err) => {
//       console.error(err);
//       res.status(500).end();
//     });
// });

// // event handler
// async function handleEvent(event) {
//   if (event.type !== "message" || event.message.type !== "text") {
//     // ignore non-text-message event
//     return Promise.resolve(null);
//   }

//   const response = await openAIChat(event.message.text);

//   // create an echoing text message
//   const echo = { type: "text", text: response };

//   // use reply API
//   return client.replyMessage({
//     replyToken: event.replyToken,
//     messages: [echo],
//   });
// }

// const jsonParser = express.json();

// app.get("/test", jsonParser, async (req, res) => {
//   const { message } = req.body;

//   if (!message) {
//     res.send({ error: "No messages provided" });
//     return;
//   }

//   try {
//     const response = await openAIChat(message);
//     res.send(response);
//   } catch (error) {
//     res.status(500).send({ error: error.name });
//   }
// });

app.get("*", (req, res) => {
  res.status(404).json({ error: "Page did not exist" });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
