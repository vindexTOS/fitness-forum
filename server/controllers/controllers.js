import Post from '../models/postModel.js'
import User from '../models/userModel.js'
import Forum from '../models/forumModel.js'
const getAllPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const totalPosts = await Post.countDocuments()
  const totalPages = Math.ceil(totalPosts / limit)
  try {
    const posts = await Post.find({}).skip(startIndex).limit(limit)
    const AllData = await Post.find({})
    return res
      .status(200)
      .json({ posts, currentPage: page, totalPages, totalPosts, AllData })
  } catch (error) {
    return res.status(400).json({ msg: 'server error' })
  }
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

const getUserData = async (req, res) => {
  try {
    const user = await User.find({}, 'name avatar ')

    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json({ msg: 'server error' })
  }
}

export { postData, getAllPosts, getUserData }
