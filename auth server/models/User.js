const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  points: {
    type: Number,
    required: true,
    default: 0,
  },
  qrId: {
    type: Number,
    required: true,
    default: 0,
  },
  utype: {
    type: String,
    required: true,
    default: 'user',
  },
  downloaded: {
    type: Boolean,
    required: true,
    default: true,
  },
  CardId: {
    type: Number,
    required: true,
    default: 0,
  },
})

userSchema.pre('save', function (next) {
  const user = this
  if (!user.isModified('password')) {
    return next()
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err)
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err)
      }
      user.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = function (candidatePassword) {
  const user = this
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err)
      }
      if (!isMatch) {
        return reject(err)
      }
      resolve(true)
    })
  })
}

mongoose.model('User', userSchema)
