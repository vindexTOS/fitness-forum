import mongoose from 'mongoose'

const wrestlersSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Enter Wrestlers Name'],
  },
  faction: {
    type: String,
    require: [true, 'Enter The Faction'],
  },
  stats: {
    type: Number,
    require: [true, 'Enter The Stats'],
  },
  photo: {
    type: String,
    require: [true, 'Upload The Photo'],
  },
  weight: {
    type: Number,
    require: [true, 'Enter The Weight'],
  },
  height: {
    type: Number,
    require: [true, 'Enter The Height'],
  },
  userID: {
    type: String,
    require: true,
  },
})

export default mongoose.model('Wrestlers', wrestlersSchema)
