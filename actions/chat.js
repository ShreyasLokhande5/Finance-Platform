"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateAIResponse(message) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();
    
    return { success: true, data: text };
  } catch (error) {
    console.error("Error generating AI response:", error);
    // Log full error details for debugging
    if (error.response) {
      console.error("Error response:", JSON.stringify(error.response, null, 2));
    }
    return { success: false, error: "Failed to generate response. Please try again." };
  }
}
