import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, 'Add title to your post'],
  },
  post: {
    type: String,
    require: [true, 'Add post content'],

    trim: true,
  },
  photo: {
    type: String,
  },

  forumID: {
    type: String,
    require: [true, 'Forum should be specified'],
    default: 'general',
  },

  userID: {
    type: String,
    require: true,
  },
})

export default mongoose.model('forum-post', postSchema)
