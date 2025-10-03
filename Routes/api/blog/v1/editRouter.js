const authorController = require('../../../../Controllers/api/blog/v1/blogEditController');
const { verifyAccessToken } = require('../../../../Controllers/api/blog/authController');
const Router = require('express').Router;

const editRouter = Router();

// PAGE LOAD

editRouter.get('/', (req, res) => res.status(200).json({message:'test'}));
editRouter.get('/posts', verifyAccessToken, authorController.getAllPosts) // GET ALL POSTS FROM THAT USER => Need req.user.id
editRouter.get('/comments', verifyAccessToken, authorController.getAllComments) // GET ALL COMMENTS FROM ALL POSTS (modération) => Need req.user.id

// POSTS

editRouter.post('/post', verifyAccessToken, authorController.createPost) // C
editRouter.get('/post/:postid', verifyAccessToken, authorController.getSinglePost) // R GET ONE POST FROM THAT USER => Need req.user.id + req.params.id
editRouter.put('/post/:postid', verifyAccessToken, authorController.updatePost) // U
editRouter.delete('/post/:postid', verifyAccessToken, authorController.deletePost) // D
editRouter.delete('/posts', verifyAccessToken, authorController.deleteAllPosts) //D-All

// COMMENTS

editRouter.get('/post/:postid/comments', verifyAccessToken, authorController.getAllCommentsFromPost) // R
editRouter.delete('/post/:postid/:commentid', verifyAccessToken, authorController.deleteCommentFromPost) // D
editRouter.delete('/post/:postid/comments', verifyAccessToken, authorController.deleteAllCommentsFromPost) // D-ALL

module.exports = editRouter;