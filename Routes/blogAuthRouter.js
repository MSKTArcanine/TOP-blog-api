const Router = require('express').Router;
const cookieParser = require('cookie-parser');
const authController = require('../Controllers/authController');
const express = require('express');

const loginRouter = Router();
loginRouter.post('/login/post', authController.loginMW);
loginRouter.post('/signup/post', authController.signupMW);
loginRouter.get('/protectedRoute', authController.verifyAccessToken);
loginRouter.get('/refresh', cookieParser(), authController.refreshToken);
module.exports = loginRouter;