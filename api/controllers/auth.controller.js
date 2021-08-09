const bcrypt = require('bcrypt');
const { generateToken } = require('../helpers/auth.helper');
const { GeneralResponse } = require('../utils/response');
const { GeneralError, UnAuthorized } = require('../utils/error');
const usersModel = require('../models/users.model');
const config = require('../utils/config');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    usersModel.isUserExistByEmailId(email, async (err, response) => {
      if (err || response.length === 0){
        next(new GeneralError('user not found', undefined, config.HTTP_ACCEPTED));
      } else {
        const comparision = await bcrypt.compare(password, response[0].password);
        if (comparision) {
          const userdata = {
            username: response[0].email,
            name: response[0].name,
            userid: response[0].userid
          };
          const token = generateToken(userdata);
          next(
            new GeneralResponse('user successfully login', { token }, config.HTTP_SUCCESS)
          );
        } else {
          next(new UnAuthorized('email and password does not match'));
        }
      }
    });
  } catch (err) {
    next(new GeneralError('user login failure'));
  }
};
