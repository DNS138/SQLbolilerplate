import {db} from '../helpers/db.helper.js';
const selectStar = `id as categoryid ,name`;

const addCategory = (category, callback) => {
  db(
    `INSERT INTO categories (name) values ('${category.name}')`,
    (err, response) => {
      if (err != null) {
        callback(err);
      } else {
        callback(null, response);
      }
    }
  );
};

const getCategories = callback => {
  db(`Select ${selectStar} from categories`, (err, response) => {
    if (!err && response) {
      callback(null, response);
    } else {
      callback(err);
    }
  });
};

const getCategoryById = (categoryid, callback) => {
  db(`Select ${selectStar} from categories where id = '${categoryid}'`, (err, response) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, response);
    }
  });
};

const updateCategory = (categoryid, category, callback) => {
  db(`Update categories set name = '${category.name}' where id = '${categoryid}'`, (err, response) => {
    if (err) {
      callback(err);
    } else {
      callback(null, response);
    }
  });
};

const removeOneCategory = (categoryid, callback) => {
  db(`Delete from categories where id = '${categoryid}'`, (err, response) => {

    if (err == null && response && response.length > 0) {
      callback(null, response);
    } else {
      callback(err);
    }
  });
};

export default { addCategory, getCategories, getCategoryById, updateCategory, removeOneCategory };
