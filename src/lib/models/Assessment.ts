import mongoose, { Schema } from 'mongoose'

const assessmentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
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
    type: {
      categoryScores: [{
        _id: false,
        category: String,
        score: Number
      }],
      emotionDistribution: [{
        _id: false,
        emotion: String,
        value: Number,
        color: String
      }]
    },
    required: true,
    default: () => ({
      categoryScores: [],
      emotionDistribution: []
    })
  }
}, {
  timestamps: true
})

// Add a pre-save middleware to ensure analytics is calculated
assessmentSchema.pre('save', function(next) {
  if (!this.analytics || !this.analytics.categoryScores.length) {
    const analytics = calculateAnalytics(this.responses)
    this.analytics = analytics
  }
  next()
})

export const Assessment = mongoose.models.Assessment || mongoose.model('Assessment', assessmentSchema) 