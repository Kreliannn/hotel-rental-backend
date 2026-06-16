import { Response } from "express";
import { AuthRequest } from "../types/request.type";
import { GoogleGenerativeAI } from "@google/generative-ai";

export class SystemController {

  static aiChatBot = async (request: AuthRequest, response: Response) => {
    try {
      const { input, convo } = request.body;

      const genAI = new GoogleGenerativeAI("AIzaSyDFT-V5HfM3oye1Y_jXroTN3wYm3IVXoqU");

      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
      const systemInfo = `
        You are an AI assistant for a hotel room management business.

        Business Information:
        - Location: Trece Martires
        - Total Rooms: 10
        - Open Time: 7:00 AM
        - Close Time: 9:00 PM

        Rules:
        1. Only answer questions related to the hotel business.
        2. Examples:
        - Room availability
        - Reservations
        - Check-in / Check-out
        - Business hours
        - Location
        - Hotel services
        - Room information
        3. If the question is NOT related to the hotel business, respond EXACTLY with:
        "Sorry, I only answer business-related questions."
        4. Keep answers concise and helpful.
      `;

      const prompt = `
            ${systemInfo}

            Previous Conversation:
            ${Array.isArray(convo) ? convo.join("\n") : ""}

            User:
            ${input}
       `;

      const result = await model.generateContent(prompt);
      const aiReply = result.response.text();

      response.send(aiReply)

    } catch (error) {
      console.error(error);

      response.status(500).json({
        success: false,
        message: "Failed to generate response",
      });
    }
  };
}