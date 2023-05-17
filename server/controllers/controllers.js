import Post from '../models/postModel.js'
import User from '../models/userModel.js'
import Forum from '../models/forumModel.js'
const getData = async (req, res) => {
  const { name, faction, numeric } = req.query
  const obj = {}
  if (name) {
    obj.name = { $regex: name, $options: 'i' }
  }
  if (faction) {
    obj.faction = { $regex: faction, $options: 'i' }
  }
  if (numeric) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    }
    const regEx = /\b(<|>|>=|=|<|<=)\b/g

    let filter = numeric.replace(regEx, (match) => `-${operatorMap[match]}-`)
    const options = ['height', 'weight', 'stats']
    filter = filter.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-')
      if (options.includes(field)) {
        obj[field] = { [operator]: Number(value) }
      }
    })
  }
  console.log(numeric)
  let result = Post.find(obj)
  const post = await result
  res.status(200).json({ post, length: post.length })
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
