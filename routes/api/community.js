const router = require('express').Router();

const jwtAuth = require('../../middlewares/jwtAuth');
const comCon = require('../../controllers/community');

// get the list of post
router.get('/list', comCon.getPost); 

// create a post
router.post('/new', jwtAuth.verifyToken, comCon.createPost);

// update a post
router.put('/:id', jwtAuth.verifyToken, comCon.updatePost);

// delete a post
router.delete('/:id', jwtAuth.verifyToken, comCon.deletePost);

module.exports = router;
