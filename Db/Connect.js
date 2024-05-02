require('dotenv').config()
const mongoose = require('mongoose')
const connectString = process.env.connectString


const connectDb = async()=>{
    await mongoose.connect(connectString)
    return console.log('db is conected')
}



module.exports = connectDb