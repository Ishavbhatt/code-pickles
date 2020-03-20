const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require("../models/User")

module.exports = {
  signup: async (req, res, next) => {
    try {
      if (!req.body.username || !req.body.email || !req.body.password) {
        res.status(400).json({ success: false, msg: "All fields required" })
      }
      if (req.body.password.length < 8) {
        res
          .status(400)
          .json({ success: false, msg: "Password is minimum 8 char" })
      }
      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
      if (newUser) {
        res.json({ success: true, msg: "User successfully registered" })
      }
    } catch (err) {
      next(err)
    }
  },

  login: async (req, res, next) => {
    try {
      if (!req.body.email || !req.body.password) {
        res.status(400).json({
          success: false,
          msg: "Email and password required to login"
        })
      }
      const existUser = await User.findOne({ email: req.body.email })
      if (existUser) {
        const match = await existUser.verifyPassword(req.body.password, next)
        if (match) {
          const token = await jwt.sign(
            { id: existUser._id },
            process.env.PRIMARY_JWT_SECRET
          )
          res.json({ success: true, token })
        } else {
          res.status(401).json({ success: false, msg: "Wrong password" })
        }
      } else {
        res.status(401).json({ success: false, msg: "User not found" })
      }
    } catch (err) {
      next(err)
    }
  },

  about: async (req, res, next) => {
    try {
      const existUser = await User.findById(req.userId)
      if (existUser) {
        res.json({
          success: true,
          user: {
            name: existUser.username,
            email: existUser.email,
            karma: existUser.karma,
            avatar: existUser.avatar
          }
        })
      }
    } catch (err) {
      next(err)
    }
  },

  questionList: async (req, res, next) => {
    try {
      const questions = await User.findById(req.userId)
        .select("questions")
        .populate("questions")
      if (questions) {
        res.json({ success: true, questions })
      }
    } catch (err) {
      next(err)
    }
  },

  communityPost: async (req, res, next) => {
    try {
      const communityPost = await User.findById(req.userId, "community")
      if (communityPost) {
        res.json({ success: true, communityPost: communityPost.community })
      }
    } catch (err) {
      next(err)
    }
  },

  updPass: async (req, res, next) => {
    try {
      if (req.body.password) {
        const hashedPass = await bcrypt.hash(
          req.body.password,
          Number(process.env.SALT)
        )
        if (hashedPass) {
          const updatedUser = await User.findByIdAndUpdate(req.userId, {
            password: hashedPass
          })
          if (updatedUser) {
            res.json({ success: true, msg: "Password successfully updated" })
          }
        }
      } else {
        res.status(400).json({ success: false, msg: "Password field required" })
      }
    } catch (err) {
      next(err)
    }
  },

  deleteAccount: async (req, res, next) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.userId)
      if (deletedUser) {
        res.json({ success: true, msg: "Account successfully deleted" })
      }
    } catch (err) {
      next(err)
    }
  }
}
