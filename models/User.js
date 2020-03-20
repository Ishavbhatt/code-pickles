const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address"
    ]
  },
  password: { type: String, required: true, minlength: 8 },
  karma: { type: Number, default: 0 },
  community: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Community", unique: true }
  ],
  questions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Question", unique: true }
  ],
  likedQuestions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Question", unique: true }
  ],
  avatar: { type: String, default: "" }
});

// pre save hook for hash password
userSchema.pre("save", async function(next) {
  if (this.password && this.isModified("password")) {
    const encryptedPassword = await bcrypt.hash(
      this.password,
      Number(process.env.SALT)
    );
    if (encryptedPassword) this.password = encryptedPassword;
  }
  next();
});

// method for verify password
userSchema.methods.verifyPassword = async function(password, next) {
  try {
    const match = await bcrypt.compare(password, this.password);
    return match;
  } catch (err) {
    next(err);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
