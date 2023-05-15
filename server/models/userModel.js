import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'must enter user name'],
    maxlength: [12, 'name cant be more then 12 letters'],
    trim: true,
  },
  email: {
    type: String,
    require: [true, 'enter email'],
    trim: true,
  },
  password: {
    type: String,
    require: [true, 'pelase enter password'],
  },
})

export default mongoose.model('User', userSchema)
