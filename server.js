require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

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
    db.once('open', () => {console.log('Connected to database')})

    app.use(express.json())

    const usersRouter = require('./routes/users.route')
    app.use('/api/mp/users', usersRouter)

    const authRouter = require('./routes/auth.route')
    app.use('/api/mp/auth', authRouter)

    const wordsRouter = require('./routes/words.route')
    app.use('/api/mp/words', wordsRouter)
    
    app.listen(3000, () => console.log('listening on port 3000...'))
}