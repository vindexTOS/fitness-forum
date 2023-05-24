import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    require: [true, 'Comment fealed is emptiy'],
  },
  date: {
    type: Date,
    default: new Date(),
  },
  postID: {
    type: String,
    require: true,
  },
  userID: {
    type: String,
    require: true,
  },
})

export default mongoose.model('forum-comments', commentSchema)
