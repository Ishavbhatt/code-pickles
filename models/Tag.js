const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  questionList: [{ type: mongoose.Schema.Types.ObjectId, unique: true }]
});

const Tag = mongoose.model("Tag", tagSchema);

exports.default = Tag;
