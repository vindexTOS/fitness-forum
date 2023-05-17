import Post from '../models/postModel.js'
import UserSchema from '../models/userModel.js'
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
  const { name, faction, stats, photo, weight, height, userID } = req.body
  try {
    if (name && faction && stats && photo && weight && height && userID) {
      const obj = { name, faction, stats, photo, weight, height, userID }
      const post = await Post.create(obj)
      return res.status(201).json(post)
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: error })
  }
}

export { getData, postData }
