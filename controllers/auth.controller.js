const jwt = require('jsonwebtoken')
const request = require('request');


function login(req, res) {

    const url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + process.env.APP_ID + '&secret=' + process.env.APP_SECRET + '&js_code=' + req.body.code + '&grant_type=authorization_code'

    console.log(`get openID sucessfully`)

    request(url, (err, response, body) => {
        const session = JSON.parse(body)
        const user = { id: session.openID }

        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        res.json({accessToken: accessToken})
        console.log(`granted access token successfully`)
    })
}


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    
}


module.exports = {
    login: login
}