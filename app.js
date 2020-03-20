const path = require("path");
const logger = require("morgan");
const helmet = require("helmet");
const express = require("express");
const mongoose = require("mongoose");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");

const usersApiRouter = require("./routes/api/user");
const communityApiRouter = require("./routes/api/community");
const questionApiRouter = require("./routes/api/question");
const tagApiRouter = require("./routes/api/tag");

const app = express();

// helmet for security
app.use(helmet());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// connect to local mongo server
mongoose.connect(
  process.env.MONGO,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  },
  err => {
    console.log(err ? err : "MongoDB Connected");
  }
);

app.use("/api/v1/user", usersApiRouter);
app.use("/api/v1/community", communityApiRouter);
app.use("/api/v1/question", questionApiRouter);
app.use("/api/v1/tag", tagApiRouter);
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// catch 404 and forward to error handler
app.use(function(req, res, nex) {
  nex(createError(404));
});

// error handler
app.use((err, req, res, nex) => {
  res.status(500).json({ success: false, msg: "Something went wrong" });
  console.error(err);
});

module.exports = app;
