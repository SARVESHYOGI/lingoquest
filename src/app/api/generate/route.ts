import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    // const { prompt } = await request.json();
    const { language, difficulty, theme, input } = await request.json();
    
  const prompt = `
You are a language storytelling assistant.

Write a short ${difficulty} story in ${language}.
The theme is: ${theme}.
Begin the story with this user input: "${input}"
Continue the story in an immersive and engaging way for a learner.

At the end, include some vocabulary that would help the reader.
`;
    console.log("Generated prompt:", prompt);
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error("Gemini API key is not configured in environment variables.");
      return NextResponse.json({ error: "Server error: API key not configured." }, { status: 500 });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", 
      contents: prompt, 
    });

    const text = response.text;

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return NextResponse.json({ error: "Failed to generate content." }, { status: 500 });
  }
}