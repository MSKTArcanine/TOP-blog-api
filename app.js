const express = require('express');
const blogRouter = require('./Routes/api/v1/blogRouter');
const passport = require('passport');
const auth = require('./Controllers/authController');
auth.setupLocalStrategy();

const app = express();

app.use(passport.initialize());


app.get('/', (req, res) => res.json({message: 'homepage'}));
app.use('/api/v1/blog/', blogRouter);

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));