import bcrypt from 'bcrypt';
import { generateToken } from '../helpers/auth.helper.js';
import { GeneralResponse } from '../utils/response.js';
import { GeneralError, UnAuthorized } from '../utils/error.js';
import {usersModel} from '../models/users.model.js';
import {config} from '../utils/config.js';

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    usersModel.isUserExistByEmailId(email, async (err, response) => {
      if (err || response.length === 0){
        next(new GeneralError('user not found', undefined, config.HTTP_ACCEPTED));
      } else {
        const comparision = await bcrypt.compare(password, response[0].password);
        if (comparision){
          const userdata = {
            username: response[0].email,
            name: response[0].name,
            userid: response[0].userid};
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

export default { login };
