const jwt = require('jsonwebtoken');
const { UnAuthorized } = require('../utils/error');

const seven = 7;
const authenticate = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(seven, token.length);
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        next(new UnAuthorized('auth token is invalid'));
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    next(new UnAuthorized('auth token not supplied'));
  }
};

const generateToken = data => {
  return jwt.sign(data, process.env.SECRET_KEY, {
    expiresIn: process.env.TOKEN_EXPIRY
  });

};

module.exports = {
  authenticate,
  generateToken
};
