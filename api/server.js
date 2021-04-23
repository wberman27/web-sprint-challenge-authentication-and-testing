const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const restrict = require('./middleware/restricted.js');

const authRouter = require('./auth/auth-router.js');
const jokesRouter = require('./jokes/jokes-router.js');
const usersRouter = require('./users/users-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);
server.use('/api/jokes', restrict, jokesRouter); // only logged-in users should have access!
//api status check
server.get('/', (req,res)=>{
    res.status(200).json({api: "up and running!"})
})
//fallback error
server.use((err,req,res,next)=>{
    res.status(err.status || 500).json({serverError: "Oh no...", message: err.message, err})
})



module.exports = server;
