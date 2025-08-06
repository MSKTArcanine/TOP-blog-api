const authorController = require('../../../Controllers/api/v1/blogEditController');
const Router = require('express').Router;

const editRouter = Router();

// PAGE LOAD

editRouter.get('/posts') // GET ALL POSTS FROM THAT USER => Need req.user.id
editRouter.get('/comments') // GET ALL COMMENTS FROM ALL POSTS (modération) => Need req.user.id

// POSTS

editRouter.post('/post/;postid') // C
editRouter.get('/post/:postid') // R GET ONE POST FROM THAT USER => Need req.user.id + req.params.id
editRouter.put('/post/:postid') // U
editRouter.delete('/post/:postid') // D
editRouter.delete('/posts') //D-All

// COMMENTS

editRouter.get('/post/:postid/comments') // R
editRouter.delete('/post/:postid/:commentid') // D
editRouter.delete('/post/:postid/comments') // D-ALL

module.exports = editRouter;