const router = require("express").Router();

const userCon = require("../../controllers/user");
const jwtAuth = require("../../middlewares/jwtAuth");

// signup user
router.post("/signup", userCon.signup);

// login user
router.post("/login", userCon.login);

// about user
router.get("/me", jwtAuth.verifyToken, userCon.about);

// get the list of question created by user
router.get("/questions", jwtAuth.verifyToken, userCon.questionList);

// get the list of community post
router.get("/community", jwtAuth.verifyToken, userCon.communityPost);

// update the password
router.patch("/password", jwtAuth.verifyToken, userCon.updPass);

// delete the user
router.delete("/account", jwtAuth.verifyToken, userCon.deleteAccount);

module.exports = router;
