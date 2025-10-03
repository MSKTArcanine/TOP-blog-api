const express = require('express');
const blogRouter = require('./Routes/api/blog/v1/blogRouter');
const passport = require('passport');
const auth = require('./Controllers/api/blog/authController');
const loginRouter = require('./Routes/blogAuthRouter');
const editRouter = require('./Routes/api/blog/v1/editRouter');
const cors = require('cors');
const shopRouter = require('./Routes/api/shop/v1/shopRouter');
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

const corsOptionsShop = {
    origin:['https://blog-api-dqc2a0ftfra7akc5.francecentral-01.azurewebsites.net/', 'http://127.0.0.1:5173'],
    optionsSuccessStatus: 200,
}

// BLOG ROUTER :

app.get('/', (req, res) => res.json({message: 'homepage'}));
app.use('/api/v1/blog/', cors(corsOptions), blogRouter);
app.use('/api/auth', cors(corsOptions), loginRouter);
app.use('/api/v1/edit', cors(corsOptions), editRouter);

// SHOPWARS ROUTER :

app.use('/api/v1/shopwars/', cors(corsOptionsShop), shopRouter);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));