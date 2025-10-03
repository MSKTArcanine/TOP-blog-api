const Router = require('express').Router;
const shopController = require('../../../../Controllers/api/shop/v1/shopAllController');
const shopRouter = Router();

shopRouter.get('/', (req, res) => res.json({message: 'Shop !'}));
shopRouter.get('/articles', shopController.getAllArticles);

module.exports = shopRouter;