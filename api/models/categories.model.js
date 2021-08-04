const db = require("../helpers/db.helper");
const selectStar = `id as categoryid ,name`;

exports.addCategory = (category, callback) => {
  db(
    `INSERT INTO categories (name) values ('${category.name}')`,
    (err, response) => {
      if (err != null) callback(err);
      else callback(null, response);
    }
  );
};

exports.getCategories = (callback) => {
    db(`Select ${selectStar} from categories`, (err, response) => {
        if (!err && response) {
          callback(null, response);
        }
        else callback(err);
    })
}

exports.getCategoryById = (categoryid, callback) => {
  
  db(`Select ${selectStar} from categories where id = '${categoryid}'`, (err, response) => {
    
    if (err){ 
      callback(err);
    }
    else {
      callback(null, response);
  }});
};

exports.updateCategory = (categoryid, category, callback) => {
    
    db(`Update categories set name = '${category.name}' where id = '${categoryid}'`, (err, response) => {
      
      if(err) callback(err);
      else callback(null, response);
    });
  };
  

exports.removeOneCategory = (categoryid, callback) => {
  db(`Delete from categories where id = '${categoryid}'`, (err, response) => {

    if (err == null && response && response.length > 0) callback(null, response);
    else callback(err);
  });
};

