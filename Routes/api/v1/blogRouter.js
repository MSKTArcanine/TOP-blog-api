const Router = require('express').Router;
const blogController = require('../../../Controllers/api/v1/blogAllController');

const blogRouter = Router();

blogRouter.get('/', (req, res) => res.json({message: 'coucou'}));
blogRouter.get('/posts', blogController.getAllPosts);
blogRouter.get('/posts/:id', blogController.getPostById);
blogRouter.get('/posts/:id/comments', blogController.getAllCommentsByPostId);

module.exports = blogRouter;