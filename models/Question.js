const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, unique: true },
    code: { type: String },
    error: { type: String },
    moreInfo: { type: String },
    tags: [{ type: String, unique: true }],
    open: { type: Boolean, default: true },
    upVote: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    downVote: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    responseList: [{ type: String, unique: true, ref: "Response" }],
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

const Question = mongoose.model("question", questionSchema);

module.exports = Question;
