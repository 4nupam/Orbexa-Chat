import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/askOrbexa", async (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: "No question provided" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a mystical astrologer who gives warm, kind, and spiritual astrology advice." },
        { role: "user", content: question }
      ]
    });

    res.json({ answer: completion.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API error:", error);

    // Detect OpenAI API error with status code
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }

    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
