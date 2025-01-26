import mongoose, { Schema } from 'mongoose'

const assessmentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  score: {
    type: Number,
    required: true
  },
  responses: [{
    question: String,
    answer: String,
    score: Number
  }],
  summary: String,
  recommendations: [String],
  analytics: {
    categoryScores: [{
      category: String,
      score: Number
    }],
    emotionDistribution: [{
      emotion: String,
      value: Number,
      color: String
    }]
  }
}, {
  timestamps: true
})

export const Assessment = mongoose.models.Assessment || mongoose.model('Assessment', assessmentSchema) 