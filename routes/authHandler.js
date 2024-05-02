const express = require('express');
const { registerAccount, loginAccount, verifyAccount, Logout } = require('../Controller/auth');


const authRouter = express.Router();

authRouter.post('/register', registerAccount);
authRouter.post('/signin', loginAccount);
authRouter.get('/logout', Logout)
authRouter.get('/verify/:id/:token', verifyAccount);

module.exports = authRouter;