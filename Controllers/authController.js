const dbAuth = require('../db/auth/auth');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const setupLocalStrategy = () => {
    passport.use(new LocalStrategy( async (username, password, done) => {
    const user = await dbAuth.getUserByUsername(username);
    if(!user) return done(null, false, {message: "Auth failed"});
    if(await bcrypt.compare(password, user.hashed_password)) return done(null, false, {message: "Auth failed"});
    return done(null, user);
}))
}

module.exports = {setupLocalStrategy}