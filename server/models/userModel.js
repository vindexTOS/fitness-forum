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
  adminStatus: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    default:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4UmW5FE0dXoSm3h5meecSKpw0oX1Jk3bZvA&usqp=CAU',
  },
})

export default mongoose.model('User', userSchema)
