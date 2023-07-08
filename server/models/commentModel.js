import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, 'Comment fealed is emptiy'],
  },
  date: {
    type: Date,
    default: new Date(),
  },
  postID: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  reply: [
    {
      comment: {
        type: String,
        required: false,
      },
      date: {
        type: Date,
        default: new Date(),
      },
      userID: {
        type: String,
        required: false,
      },
    },
  ],
})

export default mongoose.model('forum-comments', commentSchema)
