require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const wxToken = require("./utils/wxToken");
const schedule = require('node-schedule');

main()

async function main() {
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.DATA_BASE_URL, {
        authSource: "admin",
        user: process.env.DATA_BASE_USERNAME,
        pass: process.env.DATA_BASE_PASSWORD,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    const db = mongoose.connection 
    db.on('error', (error) => {console.log(error)})
    db.once('open', () => {
        console.log('Connected to database');
        wxToken.refreshToken();

        schedule.scheduleJob('0 */90 * * * *', () => {
            wxToken.refreshToken();
        });
    })

    app.use(express.json())

    const usersRouter = require('./routes/users.route')
    app.use('/api/mtm/users', usersRouter)

    const authRouter = require('./routes/auth.route')
    app.use('/api/mtm/auth', authRouter)

    const wordsRouter = require('./routes/words.route')
    app.use('/api/mtm/words', wordsRouter)
    
    app.listen(3000, () => console.log('listening on port 3000...'))
}