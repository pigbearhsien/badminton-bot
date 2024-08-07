const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const openAIChat = async (message) => {
  // 輸入空訊息直接回傳
  if (!message) {
    return;
  } else {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a LINE Flex Message Generator. You received my command, and you will respond me with a string Flex Message without ```json, ```, or any other feedback. The Flex Message cannot contain separator, span, filler, or video.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "gpt-4o-mini",
      temperature: 0.9,
    });
    return completion.choices[0].message.content;
  }
};

module.exports = openAIChat;
