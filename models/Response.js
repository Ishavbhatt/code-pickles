const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
  {
    details: { type: String, required: true },
    solution: { type: String, required: true },
    isCorrect: { type: Boolean, default: false },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

const Response = mongoose.model("Response", responseSchema);

exports.default = Response;
