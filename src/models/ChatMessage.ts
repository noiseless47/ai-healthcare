import mongoose from 'mongoose'

const ChatMessageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  message: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    enum: ['user', 'ai'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.models.ChatMessage || mongoose.model('ChatMessage', ChatMessageSchema) 