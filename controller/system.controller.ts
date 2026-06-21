import { Response } from "express";
import { AuthRequest } from "../types/request.type";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Paymentservice } from "../services/payment.service";
import { ChatService } from "../services/chat.service";

import { SystemService } from "../services/system.service";
import { uploadToCloudinary } from "../utils/cloudinaryUpload";
import { RoomService } from "../services/room.service";

export class SystemController {

   static getAllPayments = async (request : AuthRequest , response : Response) => {
      const payments = await Paymentservice.getAll()
      response.send(payments)
    }

    static getSystemInfo = async (request : AuthRequest , response : Response) => {
      const systemInfo = await SystemService.get()
      response.send(systemInfo)
    }

   static updateSystemInfo = async (request: AuthRequest, response: Response) => {
    try {
      const { systemInfo, paymentMin, systemName, header, description } = request.body
      const system = await SystemService.update({ systemInfo, paymentMin, systemName, header, description })
      response.send(system)
    } catch (error) {
      console.log("Failed to update system info: " + (error as Error).message)
      response.status(500).send("Failed to update system info: " + (error as Error).message)
    }
  }

  static uploadLogo = async (request: AuthRequest, response: Response) => {
    try {
      if (!request.file) {
        response.status(400).send("No logo image provided")
        return
      }

      const logoUrl = await uploadToCloudinary(request.file.path, "system")
      const system = await SystemService.updateLogo(logoUrl)

      response.send(system)
    } catch (error) {
      console.log("Failed to upload logo: " + (error as Error).message)
      response.status(500).send("Failed to upload logo: " + (error as Error).message)
    }
  }

  static aiChatBot = async (request: AuthRequest, response: Response) => {
    try {
      const { input, convo } = request.body;

      const systeminfo = await SystemService.get()

      const genAI = new GoogleGenerativeAI("AIzaSyDFT-V5HfM3oye1Y_jXroTN3wYm3IVXoqU");

      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });


     
      
  
      const prompt = `
            ${systeminfo?.systemInfo}

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

  static getAllChats = async (request: AuthRequest, response: Response) => {
    try {
      const chats = await ChatService.getAll()
      response.send(chats)
    } catch (error) {
      console.log("Failed to get chats: " + (error as Error).message)
      response.status(500).send("Failed to get chats: " + (error as Error).message)
    }
  }

  static getChat = async (request: AuthRequest, response: Response) => {
    try {
      const { id } = request.params
      const chat = await ChatService.get(id)
      if (!chat) {
        response.status(404).send("Chat not found")
        return
      }
      response.send(chat)
    } catch (error) {
      console.log("Failed to get chat: " + (error as Error).message)
      response.status(500).send("Failed to get chat: " + (error as Error).message)
    }
  }

  static createChat = async (request: AuthRequest, response: Response) => {
    try {
      const { clientName } = request.body
      const chat = await ChatService.create(clientName)
      response.send(chat)
    } catch (error) {
      console.log("Failed to create chat: " + (error as Error).message)
      response.status(500).send("Failed to create chat: " + (error as Error).message)
    }
  }

  static sendChatMessage = async (request: AuthRequest, response: Response) => {
    try {
      const { id, user, message } = request.body
      const chat = await ChatService.sendMessage(id, user, message)
      if (!chat) {
        response.status(404).send("Chat not found")
        return
      }
      response.send(chat)
    } catch (error) {
      console.log("Failed to send message: " + (error as Error).message)
      response.status(500).send("Failed to send message: " + (error as Error).message)
    }
  }
}