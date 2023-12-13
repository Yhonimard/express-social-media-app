import mongoose from "mongoose";
import { CHAT_MODEL_NAME } from "../fixtures/chat.fixtures";
import { MESSAGE_MODEL_NAME } from "../fixtures/message.fixtures";

const MessageSchema = new mongoose.Schema({
  from: { type: String, required: true },
  text: { type: String, required: true },
  chat: { type: mongoose.Schema.ObjectId, ref: CHAT_MODEL_NAME }
}, {
  timestamps: true
})

const MessageModel = mongoose.model(MESSAGE_MODEL_NAME, MessageSchema)
export default MessageModel


