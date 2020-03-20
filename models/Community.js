const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema(
  {
    details: { type: String, required: true },
    image: { type: String, default: "" },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

const Community = mongoose.model("Community", communitySchema);

module.exports = Community;
