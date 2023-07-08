import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Add title to your post'],
  },
  post: {
    type: String,
    required: [true, 'Add post content'],

    trim: true,
  },
  photo: {
    type: String,
    default: 'No Photo',
  },

  forumID: {
    type: String,
    required: [true, 'Forum should be specified'],
    default: 'general',
  },

  userID: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  upvote: {
    type: Number,
    default: 1,
  },
})

export default mongoose.model('forum-post', postSchema)
