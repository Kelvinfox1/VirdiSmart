const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { jwtkey } = require('../keys')
const router = express.Router()
const User = mongoose.model('User')
const requireToken = require('../middleware/requireToken')

router.post('/signup', async (req, res) => {
  const { email, password, fname, lname, phone } = req.body
  console.log(email)
  if (!email || !password) {
    return res.status(422).send({ error: 'must provide email or password' })
  }
  if (!fname || !lname) {
    return res
      .status(422)
      .send({ error: 'must provide both first and last name' })
  }
  if (!phone) {
    return res.status(422).send({ error: 'must provide a valid phone number ' })
  }

  try {
    const user = new User({ email, password, fname, lname, phone })
    await user.save()
    const token = jwt.sign({ userId: user._id }, jwtkey)
    res.send({ token })
  } catch (err) {
    return res.status(422).send(err.message)
  }
})

router.post('/signin', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(422).send({ error: 'must provide email or password' })
  }
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(422).send({ error: 'Invalid Email or Password' })
  }
  try {
    await user.comparePassword(password)
    const token = jwt.sign({ userId: user._id }, jwtkey)
    res.send({ token })
  } catch (err) {
    return res.status(422).send({ error: 'must provide email or password' })
  }
})

router.get('/profile', requireToken, async (req, res) => {
  const user = await User.findOne({ email: req.user.email })
  if (user) {
    res.json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      Phone: user.phone,
      qrId: user.qrId,
      CardId: user.CardId,
      points: user.points,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

module.exports = router
