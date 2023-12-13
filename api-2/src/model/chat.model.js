import mongoose from "mongoose";
import { CHAT_MODEL_NAME } from "../fixtures/chat.fixtures";
import { MESSAGE_MODEL_NAME } from "../fixtures/message.fixtures";

const ChatSchema = new mongoose.Schema({
  users: { type: Array, required: true },
  message: [{ type: mongoose.Schema.Types.ObjectId, ref: MESSAGE_MODEL_NAME }]
}, {
  timestamps: true
})

const ChatModel = mongoose.model(CHAT_MODEL_NAME, ChatSchema)
export default ChatModel


