require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const session = require('express-session');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionConfig = session({
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    resave: false,
    maxAge: 1000 * 60 * 60
});

app.use(sessionConfig);

app.use('/api/auth', require('./controllers/auth'));


module.exports = app;
