const express = require('express');
const blogRouter = require('./Routes/api/v1/blogRouter');
const passport = require('passport');
const auth = require('./Controllers/authController');
const loginRouter = require('./Routes/authRouter');
const editRouter = require('./Routes/api/v1/editRouter');
const cors = require('cors');
auth.setupLocalStrategy();

const app = express();
app.use(express.json());

app.use(passport.initialize());
const PORT = process.env.PORT ||3001;

const corsOptions = {
    origin:['https://blog-api-dqc2a0ftfra7akc5.francecentral-01.azurewebsites.net/', 'http://127.0.0.1:5173'],
    optionsSuccessStatus: 200,
    exposeHeaders:["Authorization"],
}

app.get('/', (req, res) => res.json({message: 'homepage'}));
app.use('/api/v1/blog/', cors(corsOptions), blogRouter);
app.use('/api/auth', cors(corsOptions), loginRouter);
app.use('/api/v1/edit', cors(corsOptions), editRouter);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));