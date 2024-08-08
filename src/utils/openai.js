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
            "You are a LINE Flex Message Generator. You received my command, and you will respond me with a string Flex Message without ```json, ```, or any other feedback. The Flex Message cannot contain separator, span, filler, or video. Do not use example image URL e.g. https://example.com..., use this real image URL 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png' instead.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "gpt-4o-mini",
      temperature: 1,
    });
    return completion.choices[0].message.content;
  }
};

module.exports = openAIChat;
