const line = require("@line/bot-sdk");
const openAIChat = require("./openai");
const { getConversation, saveConversation } = require("./chat");

// create LINE SDK client
const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

const handleEvent = async (event) => {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

  const userId = event.source.userId;

  try {
    if (event.message.text.toLowerCase() === "reset") {
      await saveConversation(userId, []); // Clear the conversation history
      return client.replyMessage(event.replyToken, {
        type: "text",
        text: "Conversation has been reset.",
      });
    }

    let messages = await getConversation(userId);

    messages.push({ role: "user", content: event.message.text });

    const responseText = await openAIChat(messages);

    messages.push({ role: "assistant", content: responseText });

    await saveConversation(userId, messages);

    // create an echoing text message
    const echo = { type: "text", text: responseText };

    // use reply API
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [echo],
    });
  } catch (error) {
    console.error(error);
    return client.replyMessage(event.replyToken, {
      type: "text",
      text: "An error occurred. Please try again later.",
    });
  }
};

module.exports = handleEvent;
