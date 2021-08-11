import { db } from '../helpers/db.helper.js';
const selectAll =  `id as userid ,name, email, password`;
const selectStar = `id as userid ,name, email`;

const addUser = (user, callback) => {
  db(
    `INSERT INTO users (name,email,password) values ('${user.name}','${user.email}','${user.password}')`,
    (err, response) => {
      if(err != null){
         callback(err);
      } else {
        callback(null, response);
      }
    }
  );
};
const isUserExistByEmailId = (email, callback) => {

  db(`Select ${selectAll} from users where email = '${email}'`, (err, response) => {
    if (!err && response) {
      callback(null, response);
    } else {
      callback(err);
    }
  });
};
const getUsers = callback => {
    db(`Select ${selectStar} from users`, (err, response) => {
        if(!err && response.length >= 1){
          callback(null, response);
        } else{
          callback(err);
        }
    });
};
const getUserById = (userid, callback) => {
  db(`Select ${selectStar} from users where id = '${userid}'`, (err, response) => {
    if (!err && response && response.length > 0) {
      callback(null, response);
    }else {
      callback(err);
    }
  });
};

export const usersModel = { addUser, isUserExistByEmailId, getUserById, getUsers };
