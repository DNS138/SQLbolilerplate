const db = require('./db.helper');
let flag;

const isValidMail = function isValidEmail(email) {

    db(`Select id from users where email = '${email}'`, (err, result) => {
        if(result.length > 0) {
            flag = 1;
        } else {
            flag = 0;
        }
    });
    return flag;
};

module.exports.isValidEmail = isValidMail;
