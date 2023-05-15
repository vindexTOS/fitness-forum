import bycript from 'bcrypt'

import jwt from 'jsonwebtoken'
import userSchema from '../models/userModel.js'

const register = async (req, res) => {
  const { password, email, name } = req.body
  let user = {}

  try {
    const userExist = await userSchema.findOne({ email: email })
    if (userExist) {
      return res.status(422).json({ error: 'Email Already exists ' })
    }

    const hashedPassword = await bycript.hash(password, 10)
    user = { password: hashedPassword, email, name }
    if (password && email && name) {
      await userSchema.create(user)
    } else {
      return res.status(201).send({ message: 'Enter all the values' })
    }

    return res.status(201).send({ message: 'User created successfully!' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Internal server error' })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await userSchema.findOne({ email: email })

    if (!user) {
      return res.status(404).json({ msg: 'user not found' })
    }

    const isPasswordValid = await bycript.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ msg: 'Invalid password' })
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_STRING)
    user.password = null

    return res.status(200).json({ token, user })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: 'Intenal server error' })
  }
}

export { register, login }
