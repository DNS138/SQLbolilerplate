import {db} from './db.helper.js';
let password;

export const getPassword = function getPass(userid) {

    db(`Select password from users where id = '${userid}'`, (err, result) => {
        if(err) {
            password = err;
        }else {
            password = result;
        }
    });
    return password;
};

