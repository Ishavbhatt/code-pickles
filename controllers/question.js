const Question = require("../models/Question")
const User = require("../models/User")

module.exports = {
  getList: async (req, res, next) => {
    try {
      if (req.query.skip && req.query.limit <= 50) {
        const questionList = await Question.find(
          {
            skip: req.query.skip,
            limit: req.query.limit
          },
          "-authorId"
        )
        if (questionList) {
          res.json({ success: true, questionList })
        }
      } else {
        res.status(400).json({ success: false, msg: "Wrong query parameter" })
      }
    } catch (err) {
      next(err)
    }
  },

  getSingle: async (req, res, next) => {
    try {
      const requestedQuestion = await Question.findById(
        req.params.id,
        "-_v -authorId"
      )
      if (requestedQuestion) {
        res.json({ success: true, question: requestedQuestion })
      } else {
        res.status(400).json({ success: false, msg: "Question not found!" })
      }
    } catch (err) {
      next(err)
    }
  },

  createNew: async (req, res, next) => {
    try {
      if (req.body.question) {
        const newQuestion = await Question.create({
          question: req.body.question,
          code: req.body.code,
          error: req.body.error,
          moreInfo: req.body.moreInfo,
          tags: req.body.tags,
          authorId: req.userId
        })
        if (newQuestion) {
          const updatedUser = await findByIdAndUpdate(req.userId, {
            $push: { question: newQuestion._id },
            $inc: { karma: +5 }
          })
          if (updatedUser) {
            res
              .status(200)
              .json({ success: true, msg: "Question Successfully created" })
          }
        }
      } else {
        res.status(400).json({ success: false, msg: "Question name required" })
      }
    } catch (err) {
      next(err)
    }
  },

  upvoteQus: async (req, res, next) => {
    try {
      
    } catch (err) {
      next(err)
    }
  },

  downvoteQus: async (req, res, next) => {
    try {
      
    } catch (err) {
      next(err)
    }
  },

  delQus: async (req, res, next) => {
    try {
      const requestedQuestion = await Question.findById(req.params.id)
      if (requestedQuestion) {
        if (requestedQuestion.authorId == userId) {
          const deletedQuestion = await findByIdAndDelete(req.params.id)
          if (deletedQuestion) {
            const updatedUser = await findByIdAndUpdate(req.userId, {
              $pull: { question: req.params.id },
              $inc: { karma: -7 }
            })
            if (updatedUser) {
              res
                .status(200)
                .json({ success: true, msg: "Question successfully deleted" })
            }
          }
        } else {
          res.status(401).json({ success: false, msg: "Forbidden" })
        }
      } else {
        res.status(400).json({ success: false, msg: "Question not found!" })
      }
    } catch (err) {
      next(err)
    }
  },

  openIt: async (req, res, next) => {
    try {
      const requestedQuestion = await Question.findById(req.params.id)
      if (req.userId == requestedQuestion.authorId) {
        const updatedQuestion = await Question.findByIdAndUpdate(
          req.params.id,
          { open: true }
        )
        if (updatedQuestion) {
          res.json({
            success: true,
            msg: "The question is opened for new response"
          })
        }
      } else {
        res.status(403).json({ success: false, msg: "Forbidden" })
      }
    } catch (err) {
      next(err)
    }
  },

  closeIt: async (req, res, next) => {
    try {
      const requestedQuestion = await Question.findById(req.params.id)
      if (req.userId == requestedQuestion.authorId) {
        const updatedQuestion = await Question.findByIdAndUpdate(
          req.params.id,
          { open: false }
        )
        if (updatedQuestion) {
          res.json({
            success: true,
            msg: "The question is closed for new response"
          })
        }
      } else {
        res.status(403).json({ success: false, msg: "Forbidden" })
      }
    } catch (err) {
      next(err)
    }
  },

  updQus: async (req, res, next) => {
    try {
      const requestedQuestion = await findById(req.params.id)
      if (requestedQuestion) {
        if (requestedQuestion == req.userId) {
        }
      } else {
        res.status()
      }
    } catch (err) {
      next(err)
    }
  }
}
