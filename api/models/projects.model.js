import {db} from '../helpers/db.helper.js';

const addProject = (project, arrayString, callback) => {
  db(
    `INSERT INTO projects (title, description, categoryId, image) values 
        ('${project.title}','${project.description}','${project.categoryId}','${arrayString}')`,
    (err, response) => {
      if (err) {
        callback(err);
      } else {
        callback(null, response);
      }
    }
  );
};

const getProjects = callback => {

  db(`Select * from projects`, (err, response) => {
    if (err == null && response != null) {
      callback(null, response);
    }else{
      callback(err);
    }
  });
};

const select = 'SELECT projects.id,projects.title,projects.description,categories.name ';

const getProjectById = (projectid, callback) => {
  db(`${select} AS category,projects.image FROM projects INNER JOIN categories ON projects.categoryId = categories.id WHERE projects.id = '${projectid}'`, (getErr, response) => {
    if (getErr) {
      callback(getErr);
    }else {
      callback(null, response);
    }
  });
};

const updateProject = (projectid, project, callback) => {
  db(`Update projects set title = '${project.title}',
    categoryId = '${project.categoryId}',
    description = '${project.description}',
    image =  '${project.image}' where id = ${projectid}`, (updateErr, response) => {

    if (updateErr) {
      callback(updateErr);
    }else {
      callback(null, response);
    }
  });
};

const removeOneProject = (projectid, callback) => {
  db(`Delete from projects where id = ${projectid}`, (removeErr, response) => {

    if (removeErr){
      callback(removeErr);
    }else{
      callback(null, response);
    }
  });
};

export const projectsModel = { addProject, getProjects, getProjectById, updateProject, removeOneProject };
