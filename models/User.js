const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
  },
  email: {
    type: String,
    required: [true, 'email provide name'],
    trim: true,
    maxlength: [20, 'email can not be more than 20 characters'],
  },
  password: {
    type: Number,
    required:[true, 'must have password'],
  },
})

module.exports = mongoose.model('User', UserSchema)
