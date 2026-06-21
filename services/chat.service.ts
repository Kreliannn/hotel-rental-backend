import ChatModel from "../model/chat.model";

export class ChatService {

  static async getAll() {
    return await ChatModel.find().sort({ createdAt: -1 });
  }

  static async get(id: string) {
    return await ChatModel.findById(id);
  }

  static async sendMessage(id: string, user: string, message: string) {
    return await ChatModel.findByIdAndUpdate(
      id,
      { $push: { convo: { user, message } } },
      { new: true }
    );
  }

  static async create(clientName: string) {
    return await ChatModel.create({ clientName, convo: [] });
  }
}
