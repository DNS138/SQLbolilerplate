import { GeneralResponse } from '../utils/response.js';
import { GeneralError, NotFound } from '../utils/error.js';
import { usersModel } from '../models/users.model.js';
import { config } from '../utils/config.js';
import bcrypt from 'bcrypt';
const saltRounds = 10;

const userList = async (req, res, next) => {
    try {
        usersModel.getUsers((err, response) => {
            if (err) {
              next(new NotFound('no users found'));
            } else {
              next(new GeneralResponse('users list',response));
            }
        });
    } catch (err) {
        next(new GeneralError('error while getting users list'));
    }
};

const getUserByUserId = async (req, res, next) => {
    const { userid } = req.query;
    try {
        usersModel.getUserById(userid, (err, response) => {
            if (err) {
              next(new NotFound('user not found'));
            } else {
              next(new GeneralResponse('user detail found',response));
            }
        });
    } catch (err) {
        next(new GeneralError('error while getting user detail'));
    }
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    usersModel.isUserExistByEmailId(email, async (err, response) => {

      if (!err && response.length > 0){
        next(
          new GeneralError(
            'user already exist',
            undefined,
            config.HTTP_ACCEPTED
          )
        );
      } else {
        usersModel.addUser(
          { name, email, password: encryptedPassword },
          (error, _response) => {
            if (error || _response.affectedRows === 0){
              next(new GeneralError('user registeration failed'));
            } else {
              next(
                new GeneralResponse(
                  'user successfully registered',
                  undefined,
                  config.HTTP_CREATED
                )
              );
            }
          }
        );
      }
    });
  } catch (err) {
    next(new GeneralError('user registeration failed'));
  }
};

export default{ userList, getUserByUserId, register };
