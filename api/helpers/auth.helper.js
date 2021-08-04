const jwt = require("jsonwebtoken");
const { UnAuthorized } = require("../utils/error");


const authenticate = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length); // Remove Bearer from string
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log(err);
        next(new UnAuthorized("auth token is invalid"));
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    next(new UnAuthorized("auth token not supplied"));
  }
};

/**
 * Middeware for Generating a new JWT Token
 */
const generateToken = (data) => {
  let token = jwt.sign(data, process.env.SECRET_KEY, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
  return token;
};

module.exports = {
  authenticate,
  generateToken
};
