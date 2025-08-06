const Router = require('express').Router;
const authController = require('../Controllers/authController');

const loginRouter = Router();
loginRouter.post('/login', authController.loginMW);

module.exports = loginRouter;