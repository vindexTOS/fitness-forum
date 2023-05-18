import Forum from '../models/forumModel.js'
import User from '../models/userModel.js'
import Post from '../models/postModel.js'
const createThread = async (req, res) => {
  const { name, avatar, description, forumID, adminID } = req.body
  const user = await User.findOne({ _id: adminID })

  try {
    if (name && description && forumID) {
      console.log('here')
      const forumObj = { name, avatar, description, forumID, adminID }
      if (user.adminStatus) {
        const forum = await Forum.create(forumObj)
        console.log('201')
        return res.status(201).json(forum)
      } else {
        console.log('400')
        return res.status(400).json({
          msg: 'Your roal does not have premision to create new forum',
        })
      }
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: error })
  }
}

const getThread = async (req, res) => {
  try {
    const { forumID } = req.params

    const forum = await Forum.findOne({ forumID })

    if (!forum) {
      return res.status(404).json({ msg: 'Thread not found' })
    }

    const posts = await Post.find({ forumID })

    return res.json({ posts: posts, forumData: forum })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Server Error' })
  }
}

const getForum = async (req, res) => {
  try {
    const forum = await Forum.find({})

    return res.status(200).json(forum)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: 'server error' })
  }
}

export { createThread, getThread, getForum }
