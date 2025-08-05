const express = require('express');
const blogRouter = require('./Routes/api/v1/blogRouter');
const passport = require('passport');
const auth = require('./Controllers/authController');
auth.setupLocalStrategy();

const app = express();

app.use(passport.initialize());
const PORT = process.env.PORT ||3000;

app.get('/', (req, res) => res.json({message: 'homepage'}));
app.use('/api/v1/blog/', blogRouter);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));