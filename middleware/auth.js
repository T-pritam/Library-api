const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  var token = req.header('authorization')
  if (!token) return res.status(401).send('Access denied. No token provided.');
  token = token.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, "secretpassword");
    req.user = decoded;
    console.log(req.user)
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};
