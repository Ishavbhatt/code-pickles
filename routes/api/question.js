const router = require("express").Router()

const jwtAuth = require("../../middlewares/jwtAuth")
const qusCon = require("../../controllers/question")

// get a single question
router.get("/:id", qusCon.getSingle)

// get the list of question
router.get("/list", qusCon.getList)

// create a question
router.post("/create", jwtAuth.verifyToken, qusCon.createNew)

// up vote a question
router.post("/upvote/:id", jwtAuth.verifyToken, qusCon.upvoteQus)

// down vote question
router.post("/downvote/:id", jwtAuth.verifyToken, qusCon.downvoteQus)

// open the question for new response
router.patch("/open/:id", jwtAuth.verifyToken, qusCon.openIt)

// close the question for new response
router.patch("/close/:id", jwtAuth.verifyToken, qusCon.closeIt)

// update the questions
router.put("/:id", jwtAuth.verifyToken, qusCon.updQus)

// delete a question
router.delete("/:id", jwtAuth.verifyToken, qusCon.delQus)

module.exports = router
