const Response = require("../models/Response");
const Question = require("../models/Question");
const User = require("../models/User");

module.exports = {
  addResponse: async (req, res, next) => {
    try {
      const requestedQuestion = await findById(req.params.questionId);
      if (requestedQuestion) {
        // checking requested question is open for new response
        if (!requestedQuestion.open) {
          res.status(409).json({
            success: false,
            msg: "Question is closed for new response"
          });
        }
      } else {
        res.status(422).json({ success: false, msg: "Question not found" });
      }
      // checking both required field
      if (req.body.details && req.body.solution) {
        const createdResponse = await Response.Create({
          details: req.body.details,
          solution: req.body.solution,
          authorId: req.userId
        }).select("-authorId -__v");
        // checking new response is created
        if (createdResponse) {
          const updatedQuestion = await Question.findByIdAndUpdate(
            req.params.questionId,
            {
              $push: { responseList: createdResponse._id }
            }
          );
          // increasing the karma of the user
          const updatedUser = await findByIdAndUpdate(req.userId, {
            $inc: { karma: 2 }
          });
          // checking response id added in question and user karma updated
          if (updatedQuestion && updatedUser) {
            res.status(200).json({
              success: true,
              msg: "Response submitted",
              createdResponse
            });
          }
        }
      } else {
        res
          .status(400)
          .json({ success: false, msg: "Required details and solution" });
      }
    } catch (err) {
      next(err);
    }
  },

  deleteResponse: async (req, res, next) => {
    try {
      const requestedResponse = await Response.findById(req.params.id);
      if (requestedResponse) {
        if (requestedResponse.authorId == req.userId) {
          const deletedResponse = await Response.findByIdAndDelete(
            req.params.id
          );
          if (deletedResponse) {
            const updatedUser = await User.findByIdAndUpdate(req.userId, {
              $inc: { karma: -2 }
            });
            if (updatedQuestion && updatedUser) {
              res.json({
                success: true,
                msg: "Response Successfully deleted",
                karma: updatedUser.karma
              });
            }
          }
        } else {
          res.status(403).json({ success: false, msg: "Forbidden" });
        }
      } else {
        res
          .status(400)
          .json({ success: false, msg: "No response found to delete" });
      }
    } catch (err) {
      next(err);
    }
  },

  updateResponse: async (req, res, next) => {
    try {
      const requestedResponse = await Response.findById(req.params.id);
      if (requestedResponse) {
        if (requestedResponse.authorId == req.userId) {
        } else {
          res.json({ success: true, msg: "Forbidden" });
        }
      } else {
        res.status(400).json({ success: false, msg: "" });
      }
    } catch (err) {
      next(err);
    }
  },

  markIsCorrect: async (req, res, next) => {}
};
