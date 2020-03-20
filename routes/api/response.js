const router = require("express").Router();

const responseCon = require("../../controllers/response");
const jwtAuth = require("../../middlewares/jwtAuth");

// add a response
router.post("/:questionId", jwtAuth.verifyToken, responseCon.addResponse);

// delete a response
router.delete("/:id", jwtAuth.verifyToken, responseCon.deleteResponse);

// update a response
router.put("/:id", jwtAuth.verifyToken, responseCon.updateResponse);

// mark isCorrect true or false
router.post("/mark/:id", jwtAuth.verifyToken, responseCon.markIsCorrect);

module.exports = router;
