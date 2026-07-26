import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  const getAi = () => {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY environment variable is missing.");
    }
    return new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", appName: "Physics 2nd Paper Full Note" });
  });

  app.post("/api/ai/solve-physics", async (req, res) => {
    try {
      const { question, context, chapter } = req.body;
      if (!question) {
        return res.status(400).json({ error: "Question is required." });
      }

      const ai = getAi();
      const prompt = `You are a master HSC Physics 2nd Paper tutor in Bangladesh (পদার্থবিজ্ঞান ২য় পত্র শিক্ষক).
Analyze and solve this student's query based on standard NCTB / HSC Board Exam standards.

[Chapter Context]: ${chapter || "Physics 2nd Paper"}
[Additional Context/Formula/Stimulus]: ${context || "None"}
[Student Question]: ${question}

Provide a comprehensive, accurate response in Bengali (বাংলা) covering:
1. Core Physical Concept / Law
2. Exact Formula(s) needed
3. Step-by-step Mathematical Calculation with SI units
4. Exam Tips / Common traps to avoid in HSC Board Exam.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });

      res.json({ answer: response.text });
    } catch (err: any) {
      console.error("AI Solve error:", err);
      res.status(500).json({ error: err.message || "Failed to generate solution." });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
