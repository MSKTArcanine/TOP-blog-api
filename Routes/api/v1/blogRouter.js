const Router = require('express').Router;
const blogController = require('../../../Controllers/api/v1/blogAllController');

const blogRouter = Router();

blogRouter.get('/', (req, res) => res.json({message: 'coucou'}))
blogRouter.get('/home', blogController.getHomePageJson);

module.exports = blogRouter;