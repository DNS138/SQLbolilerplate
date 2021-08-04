const db = require("../helpers/db.helper");
const selectAll =  `id as userid ,name, email, password`
const selectStar = `id as userid ,name, email`;
exports.addUser = (user, callback) => {
  db(
    `INSERT INTO users (name,email,password) values ('${user.name}','${user.email}','${user.password}')`,
    (err, response) => {
      if (err != null) callback(err);
      else callback(null, response);
    }
  );
};
exports.isUserExistByEmailId = (email, callback) => {
  
  db(`Select ${selectAll} from users where email = '${email}'`, (err, response) => {
    if (!err && response) callback(null, response);
    else callback(err);
  });
};
exports.getUsers = (callback) => {
    db(`Select ${selectStar} from users`, (err, response) => {
        if (!err && response) {
          callback(null, response);
        }
        else callback(err);
    })
}
exports.getUserById = (userid, callback) => {
  db(`Select ${selectStar} from users where id = '${userid}'`, (err, response) => {
    if (!err && response && response.length > 0) callback(null, response);
    else callback(err);
  });
};