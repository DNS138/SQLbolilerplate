const db = require('./db.helper');
let password;

const getPass = function getPassword(userid) {

    db(`Select password from users where id = '${userid}'`, (err, result) => {
        if(err) {
            password = err;
        } else {
            password = result;
        }
    });
    return password;
};

module.exports.getPassword = getPass;
