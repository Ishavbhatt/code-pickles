const router = require("express").Router()

const tagCon = require("../../controllers/tag");

// get list of tags
router.get("/list", tagCon.list)

// get list of questions of the tag
router.get("/:tagName", tagCon.single)

module.exports = router;