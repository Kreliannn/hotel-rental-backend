import mongoose, { Schema } from 'mongoose';

const ChatSchema = new Schema({
    clientName: { type: String, required: true },
    convo: { type: [{ user: String, message: String }], default: [] },
}, { timestamps: true });

export default mongoose.model('Chats', ChatSchema);
