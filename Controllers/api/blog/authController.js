const dbAuth = require('../../../db/auth/auth');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../../../db/auth/connection');

const setupLocalStrategy = () => {
    passport.use(new LocalStrategy( async (username, password, done) => {
    console.log('Strategy', `username : ${username}, password : ${password}`);
    const user = await dbAuth.getUserByUsername(username);
    console.log(`user : ${user.username}, ${user.hashed_password}`)
    if(!user) return done(null, false, {message: "Auth failed"});
    if(!(await bcrypt.compare(password, user.hashed_password))) return done(null, false, {message: "Auth failed"});
    return done(null, user);
}))
}

const loginMW = (req, res, next) => {
    passport.authenticate('local', {session: false}, async (err, user, info) => {
        if(err) return next(err);
        if(!user) return res.status(401).json({message: info?.message || "Login failed" });

        console.log('Success login');

        const access_token = jwt.sign({sub: user.id, username: user.username}, 'secret', {expiresIn: "15m"});
        const refresh_token = jwt.sign({sub: user.id}, 'secret', {expiresIn: "1d"});
        
        console.log('Success token')

        await dbAuth.insertRefreshToken(refresh_token, user.id);

        console.log('Sucess DB insert');

        res.setHeader('Authorization', `Bearer ${access_token}`);
        res.setHeader("Access-Control-Expose-Headers", "Authorization");
        res.cookie('refreshToken', refresh_token, {
            httpOnly: true,
            secure: false, // A REMETTRE EN PROD
            path: '/api/auth/refresh',
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

const verifyAccessToken = (req, res, next) => {
    console.log('Verification du token');
    const accesstoken = req.header('Authorization').split(' ')[1];
    console.log(accesstoken);
    try{
        const payload = jwt.verify(accesstoken, "secret");
        console.log("PAYLOAD : ", payload.sub);
        req.user = {};
        req.user.id = payload.sub;
        req.user.username = payload.username;
        console.log('Token valide, next()');
        return next();
    }catch(err){
        console.log('Token invalide, redirection');
        res.redirect('/api/auth/refresh');
        // Faut pas finir la route en fait. C'est le client qui gère la redirection en API.
    }
}

const refreshToken = async (req, res) => {
    console.log('Refreshing token...');
    const refreshToken = req.cookies.refreshToken;
    console.log('Cookie : ', refreshToken);
    try{
        const userid = jwt.verify(refreshToken, "secret");
        const dbResult = await dbAuth.getRefreshToken(userid.sub);
        if(!await bcrypt.compare(refreshToken, dbResult.hashed_token))
            return res.status(403).json('RefreshToken falsifié');
        const access_token = jwt.sign({sub: userid.sub}, "secret", {
            expiresIn: "15m"
        });
        res.json({message:"Renouvellement :", access_token: access_token});
    }catch(err){
        console.error(err);
        res.status(401).json({err:err});
    }
}
module.exports = {setupLocalStrategy, signupMW, loginMW, verifyAccessToken, refreshToken}