import Post from '../models/postModel.js'
import User from '../models/userModel.js'
import Forum from '../models/forumModel.js'
const getData = async (req, res) => {
  const post = await Post.find(thread)
}
const postData = async (req, res) => {
  const { title, post, photo, forumID, userID } = req.body
  const forum = await Forum.find({ forumID })
  console.log(userID)
  try {
    if (title && post && photo && forumID && userID) {
      const obj = { title, post, photo, forumID, userID }
      const postObj = await Post.create(obj)
      return res.status(201).json(postObj)
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: error })
  }
}

export { getData, postData }
