const express = require('express');
const blogRouter = require('./Routes/api/v1/blogRouter');
const passport = require('passport');
const auth = require('./Controllers/authController');
const loginRouter = require('./Routes/authRouter');
const editRouter = require('./Routes/api/v1/editRouter');
auth.setupLocalStrategy();

const app = express();
app.use(express.json());

app.use(passport.initialize());
const PORT = process.env.PORT ||3000;

app.get('/', (req, res) => res.json({message: 'homepage'}));
app.use('/api/v1/blog/', blogRouter);
app.use('/api/auth', loginRouter);
app.use('/api/v1/edit', editRouter);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));