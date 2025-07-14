// /api/chat.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: message }]
    });

    res.status(200).json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("GPT error:", error);
    res.status(500).json({ reply: "Произошла ошибка." });
  }
}
