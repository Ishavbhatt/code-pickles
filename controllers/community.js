const Community = require("../models/Community")
const User = require("../models/User")

module.exports = {
  getPost: async (req, res, next) => {
    try {
      if (req.query.skip && req.query.limit <= 50) {
        const communityPost = await Community.find({}, "-authorId -__v")
          .skip(Number(req.query.skip))
          .limit(Number(req.query.limit))
        if (communityPost) {
          res.json({ success: true, communityPost })
        } else {
          res.status(500).json({ success: false, msg: "Something went wrong" })
        }
      } else {
        res.status(400).json({ success: false, msg: "Wrong query parameter" })
      }
    } catch (err) {
      next(err)
    }
  },

  createPost: async (req, res, next) => {
    try {
      if (!req.body.details) {
        res.status(400).json({ success: false, msg: "details required" })
      }
      const createdPost = await Community.create({
        details: req.body.details,
        authorId: req.userId
      })
      // pushing createdPost._id to user's community array
      const updatedUser = await User.findByIdAndUpdate(req.userId, {
        $push: { community: createdPost._id },
        $inc: { karma: 5 }
      })
      if (createdPost && updatedUser) {
        res.json({ success: true, msg: "You post Successfully created" })
      }
    } catch (err) {
      next(err)
    }
  },

  updatePost: async (req, res, next) => {
    try {
      if (!req.body.details) {
        res.status(400).json({ success: false, msg: "details required" })
      }
      const requestedPost = await Community.findById(req.params.id)
      if (req.userId == requestedPost.authorId) {
        const updatedPost = await Community.findByIdAndUpdate(
          req.params.id,
          {
            details: req.body.details
          },
          { new: true }
        ).select("-authorId  -__v")

        if (updatedPost) {
          res.json({
            success: true,
            msg: "Post successfully updated",
            updatedPost
          })
        } else {
          res.status(500).json({ success: false, msg: "Something went wrong" })
        }
      } else {
        res.status(403).json({ success: false, msg: "Forbidden" })
      }
    } catch (err) {
      next(err)
    }
  },

  deletePost: async (req, res, next) => {
    try {
      const requestedPost = await Community.findById(req.params.id)
      if (!requestedPost) {
        res.status(400).json({ success: false, msg: "Post not found" })
      }
      if (req.userId == requestedPost.authorId) {
        const deletedPost = await Community.findByIdAndDelete(req.params.id)
        const updatedUser = await User.findByIdAndUpdate(req.userId, {
          $pull: { community: [requestedPost._id] },
          $inc: { karma: -5 }
        })
        if (deletedPost && updatedUser) {
          res.json({ success: true, msg: "Post successfully deleted" })
        } else {
          res.status(500).json({ success: false, msg: "Something went wrong" })
        }
      } else {
        res.status(403).json({ success: false, msg: "Forbidden" })
      }
    } catch (err) {
      next(err)
    }
  }
}
