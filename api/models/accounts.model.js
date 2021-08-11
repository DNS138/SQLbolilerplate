import {db} from '../helpers/db.helper.js';

const resetPassword = (newPassword, userid, callback) => {
  db(
    `Update users set password = '${newPassword}' where id = '${userid}'`,
    (err, response) => {
      if (err) {
        callback(err);
      } else {
        callback(null, response);
      }
    }
  );
};

const verifyOTP = (enteredOTP, sentOTP, callback) => {
  if(enteredOTP !== sentOTP) {
    callback(1);
  } else {
    callback(null, 1);
  }
};

const setNewPassword = (newPassword, email, callback) => {
  db(
    `Update users set password = '${newPassword}' where email = '${email}'`,
    (err, response) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, response);
      }
    }
  );
};

export const accountsModel = { resetPassword, verifyOTP, setNewPassword };
