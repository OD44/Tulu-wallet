require('dotenv').config()
const express = require('express')
const app = express()
const db = require('./Db/Connect')
const route = require('./routes/handler')
const cors = require('cors')

const port = process.env.port || 6000;

app.use(cors());
app.use(express.json());

app.use('/', route)

app.listen(port, () => {
	db();
	console.log(`server started on  ${port}`);
});