const db = require("../helpers/db.helper");

const selectStar = `id as projectid , title, description, categoryId, image`;

exports.addProject = (project, arrayString, callback) => {
  db(
    `INSERT INTO projects (title, description, categoryId, image) values 
        ('${project.title}','${project.description}','${project.categoryId}','${arrayString}')`,
    (err, response) => {
      if (err) callback(err);
      else callback(null, response);
    }
  );
};

exports.getProjects = (callback) => {
  
    db(`Select * from projects`, (err, response) => {
        if (err == null && response != null) {
          console.log("result")
          callback(null, response);
        }
        else callback(err);
    })
}

exports.getProjectById = (projectid, callback) => {
  db(`SELECT projects.id,projects.title,projects.description,categories.name AS category,projects.image FROM projects INNER JOIN categories ON projects.categoryId = categories.id WHERE projects.id = '${projectid}'`, (err, response) => {
     
    if (err){
        callback(err);
    } 
    else callback(null, response);
  });
};

exports.updateProject = (projectid, project, callback) => {
    db(`Update projects set title = '${project.title}',
    categoryId = '${project.categoryId}',
    description = '${project.description}',
    image =  '${project.image}' where id = ${projectid}`, (err, response) => {
      
      if (err) {
        callback(err);
      }
      else callback(null, response);
    });
  };
  

exports.removeOneProject = (projectid, callback) => {
  db(`Delete from projects where id = ${projectid}`, (err, response) => {
    
    if(err) callback(err);
    else callback(null, response);
  });
};

