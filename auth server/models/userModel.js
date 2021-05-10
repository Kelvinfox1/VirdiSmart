import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import randtoken from 'rand-token'

const userSchema = mongoose.Schema(
  {
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
      type: String,
      required: true,
      default: function () {
        return randtoken.generate(10)
      },
    },
    utype: {
      type: String,
      required: true,
      default: 'user',
    },
    downloaded: {
      type: Boolean,
      required: true,
      default: false,
    },
    CardId: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
