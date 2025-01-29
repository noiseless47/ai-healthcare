import mongoose from 'mongoose'

const JournalEntrySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  content: {
    type: String,
    required: true
  },
  mood: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  aiAnalysis: {
    emotions: [String],
    insights: [String],
    suggestions: [String]
  }
}, {
  timestamps: true
})

export default mongoose.models.JournalEntry || mongoose.model('JournalEntry', JournalEntrySchema) 