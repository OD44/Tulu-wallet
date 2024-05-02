require('dotenv').config()
const express = require('express')
const app = express()
const db = require('./Db/Connect')
const route = require('./routes/handler')
const authRouter = require('./routes/authHandler');
const cors = require('cors')
const isLoggedIn = require('./middleware/auth')

const port = process.env.port || 6000;

app.use(cors());
app.use(express.json());

app.use('/', route)
app.use('/', authRouter);

app.listen(port, () => {
	db();
	console.log(`server started on  ${port}`);
});

app.use('/user', isLoggedIn, route);
app.use('/auth', authRouter);

app.all('*', (req, res) => {
	res
		.status(404)
		.json(
			`${req.method} - route '${req.originalUrl}' isn't available on Cero api`
		);
});