import Forum from '../models/forumModel.js'
import User from '../models/userModel.js'

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

export { createThread }
