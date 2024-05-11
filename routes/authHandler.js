const express = require('express');
const { registerAccount, loginAccount, verifyAccount } = require('../Controller/auth');


const authRouter = express.Router();

authRouter.post('/register', registerAccount);
authRouter.post('/signin', loginAccount);
authRouter.get('/verify/:id/:token', verifyAccount);

module.exports = authRouter;