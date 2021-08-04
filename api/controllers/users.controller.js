const { GeneralResponse } = require("../utils/response");
const { GeneralError, NotFound } = require("../utils/error");
const usersModel = require("../models/users.model");
const config = require("../utils/config");
const bcrypt = require('bcrypt')
const saltRounds = 10;

exports.userList = async (req, res, next) => {
    try {
        usersModel.getUsers((err, response) => {
            if (err) next(new NotFound('no users found'));
            else next(new GeneralResponse('users list',response))
        })
    } catch (err) {
        next(new GeneralError('error while getting users list'))
    }
}

exports.getUserByUserId = async (req, res, next) => {
    let { userid } = req.query;
    try {
        usersModel.getUserById(userid, (err, response) => {
            if (err) next(new NotFound('user not found'));
            else next(new GeneralResponse('user detail found',response))
        })
    } catch (err) {
        next(new GeneralError('error while getting user detail'))
    }
}

exports.register = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    usersModel.isUserExistByEmailId(email, async (err, response) => {

      if (!err && response.length > 0)
        next(
          new GeneralError(
            "user already exist",
            undefined,
            config.HTTP_ACCEPTED
          )
        );
      else {
        usersModel.addUser(
          { name, email, password: encryptedPassword },
          (err, response) => {
            
            if (err || response.affectedRows == 0)
              next(new GeneralError("user registeration failed"));
            else
              next(
                new GeneralResponse(
                  "user successfully registered",
                  undefined,
                  config.HTTP_CREATED
                )
              );
          }
        );
      }
    });
  } catch (err) {
    next(new GeneralError("user registeration failed"));
  }
};
  