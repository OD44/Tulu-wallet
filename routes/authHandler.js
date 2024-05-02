const express = require('express');
const { registerAccount, loginAccount } = require('../Controller/auth');


const authRouter = express.Router();

authRouter.post('/register', registerAccount);
authRouter.post('/signin', loginAccount);

module.exports = authRouter;