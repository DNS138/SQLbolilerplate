import { db } from './db.helper.js';


export const isValidMail = function isValid(email, callback) {
    db(`Select * from users where email = '${email}'`, (err, result) => {
        if(err){
            callback(err);
        }else{
            callback(null, result);
        }
    });
  };
