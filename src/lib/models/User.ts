import mongoose, { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  image: String,
  assessments: [{
    type: Schema.Types.ObjectId,
    ref: 'Assessment'
  }],
  chatHistory: [{
    timestamp: Date,
    message: String,
    sender: String,
  }],
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'system',
    },
    notifications: {
      email: {
        type: Boolean,
        default: true,
      },
    },
  },
}, {
  timestamps: true,
})

export const User = models.User || model('User', userSchema) 