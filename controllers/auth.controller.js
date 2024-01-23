const jwt = require("jsonwebtoken");
const request = require("request");
const User = require("../models/users.model");

function login(req, res) {
  const url =
    "https://api.weixin.qq.com/sns/jscode2session?appid=" +
    process.env.APP_ID +
    "&secret=" +
    process.env.APP_SECRET +
    "&js_code=" +
    req.body.code +
    "&grant_type=authorization_code";

  request(url, (err, response, body) => {
    console.log(`get openID sucessfully`);
    const session = JSON.parse(body);
    const wxUser = { openID: session.openid };
    // const accessToken = jwt.sign(wxUser, process.env.ACCESS_TOKEN_SECRET)
    // console.log(`cteated access token successfully`)

    User.findOne({ openID: wxUser.openID }).then((user) => {
      if (user == null) {
        try {
          User.create({ openID: wxUser.openID });
          console.log(`cteated user successfully`);

          res.status(201).json({ openID: wxUser.openID });
        } catch (e) {
          console.log(e.message);
          res.status(400).json({ message: e.message });
        }
      } else {
        res.status(200).json(user);
        console.log(`granted access token successfully`);
      }
    });
  });
}

function authenticateToken(req, res, next) {
  console.log("validate access token");
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(403);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (e, user) => {
    if (e) return res.sendStatus(403);
    console.log("access token valid");
    req.wxUser = user;
    next();
  });
}

module.exports = {
  login: login,
  authenticateToken: authenticateToken,
};
