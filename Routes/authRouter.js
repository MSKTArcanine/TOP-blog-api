const Router = require('express').Router;
const authController = require('../Controllers/authController');
const express = require('express');

const loginRouter = Router();
loginRouter.post('/login', authController.loginMW);
loginRouter.post('/signup/post', express.json(),authController.signupMW);

module.exports = loginRouter;