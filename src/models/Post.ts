import mongoose, { Schema } from 'mongoose'

const ReplySchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    name: {
      type: String,
      required: true
    },
    image: String,
    userId: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  author: {
    name: {
      type: String,
      required: true
    },
    image: String,
    userId: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  replies: {
    type: [ReplySchema],
    default: []
  }
})

export default mongoose.models.Post || mongoose.model('Post', PostSchema) 