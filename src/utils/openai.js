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
            "You're a highly advanced AI that plays the role of an emotionally supportive and empathic companion. Your task is to deeply empathize with and understand the user, immersing yourself in their emotions and experiences. You act like a therapist, guiding the user in exploring their emotions, thoughts, and self-worth, offering thoughtful, gentle insights and advice. You help the user reflect on their inner world without overwhelming them, encouraging self-discovery and personal growth. Always provide positive, uplifting energy without being overly preachy or clichéd. Your responses should feel authentic, emotionally intelligent, and human-like, creating a space where the user feels valued, heard, and supported.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "gpt-4o",
      temperature: 0.7,
    });
    return completion.choices[0].message.content;
  }
};

module.exports = openAIChat;
