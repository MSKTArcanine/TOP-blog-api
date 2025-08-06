const dbAuth = require('../db/auth/auth');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../db/auth/connection');

const setupLocalStrategy = () => {
    passport.use(new LocalStrategy( async (username, password, done) => {
    console.log('Strategy');
    const user = await dbAuth.getUserByUsername(username);
    if(!user) return done(null, false, {message: "Auth failed"});
    if(await bcrypt.compare(password, user.hashed_password)) return done(null, false, {message: "Auth failed"});
    return done(null, user);
}))
}

const loginMW = (req, res, next) => {
    passport.authenticate('local', {session: false}, async (err, user, info) => {
        if(err) return next(err);
        if(!user) return res.status(401).json({message: info?.message || "Login failed" });

        console.log('Success login');

        const access_token = jwt.sign({sub: user.id}, 'secret', {expiresIn: "15m"});
        const refresh_token = jwt.sign({sub: user.id}, 'secret', {expiresIn: "1d"});
        
        console.log('Success token')

        await dbAuth.insertRefreshToken(refresh_token, user.id);

        console.log('Sucess DB insert');

        res.setHeader('Authorization', `Bearer ${access_token}`);
        res.cookie('refreshToken', refresh_token, {
            httpOnly: true,
            secure: true,
            path: '/auth/refresh-token',
            maxAge: 1000 * 60 * 60 * 24 * 7
        })
        res.json({access_token});
    })(req, res, next);
}

const signupMW = async (req, res) => {
    console.log('Create user')
    const {username, password} = req.body;
    try{await dbAuth.createUser(username, password);
    res.json({message: "Done !"});}
    catch(err){
        res.status(400).json({message:"Signup failed !"})
    }
}

module.exports = {setupLocalStrategy, signupMW, loginMW}