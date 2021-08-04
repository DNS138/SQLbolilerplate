const { GeneralResponse } = require("../utils/response");
const { GeneralError, NotFound } = require("../utils/error");
const projectModel = require("../models/projects.model");
const config = require("../utils/config");
const path = require('path')

exports.projectList = async (req, res, next) => {

  try {
    projectModel.getProjects((err, response) => {
      if (err) next(new NotFound('no projects found'));

      else {
        let pathString = "localhost:5000/uploads/"
        for (let i = 0; i < response.length; i++) {
          response[i].image = response[i].image.split(',');
          for (let j = 0; j < response[i].image.length; j++) {
            response[i].image[j] = pathString.concat(`${response[i].image[j]}`);
          }
        }
        next(new GeneralResponse('projects list', response))
      }
    })
  } catch (err) {
    next(new GeneralError('error while getting projects list'))
  }
}

exports.getProjectByProjectId = async (req, res, next) => {
  let { projectid } = req.params;

  try {
    projectModel.getProjectById(projectid, (err, response) => {
      if (err == null && response.length == 0 ) {
        next(new NotFound('project not found', err, 404));
      }
      else {
        let pathString = "localhost:5000/uploads/"
        response[0].image = response[0].image.split(',');
        for (let j = 0; j < response[0].image.length; j++) {
          response[0].image[j] = pathString.concat(`${response[0].image[j]}`);
        }
        next(new GeneralResponse('project detail found', response))
      }
    })
  } catch (err) {
    next(new GeneralError('error while getting project detail'))
  }
}

exports.addProject = async (req, res, next) => {
  let { title, description, categoryId, image } = req.body;

  const arrayString = req.files.map(a => a.filename).toString();

  projectModel.addProject(
    { title, description, categoryId, image },
    arrayString,
    (err, response) => {
      console.log(err);
      if (err != null || response.affectedRows == 0)
        next(new GeneralError("Adding porject failed"));
      else
        next(
          new GeneralResponse(
            "Project successfully added",
            undefined,
            config.HTTP_CREATED
          )
        );
    }
  );
};

exports.updateProject = async (req, res, next) => {

  let { title, description, categoryId, image } = req.body;
  let { projectid } = req.params;

  image = req.files.map(a => a.filename).toString();
  projectModel.updateProject(
    projectid,
    { title, description, categoryId, image },
    (err, response) => {
      console.log(response);
      console.log(err);

      if(typeof response !== 'undefined' && response.affectedRows == 0){
        next(new NotFound('project not found', err, 404))
      }
      else if(err){
        next(new GeneralError("Updating project failed"));
      }
     
      else
        next(
          new GeneralResponse(
            "Project successfully updated",
            undefined,
            config.SUCCESS
          )
        );
    }
  );
};

exports.removeProjectById = async (req, res, next) => {

  let { projectid } = req.params;
  projectModel.removeOneProject(
    projectid,
    (err, response) => {
    
      if (err)
        next(new GeneralError("removing project failed"));
      else if(response && response.affectedRows == 0){
        next(new NotFound('project not found', err, 404))
      }
      else
        next(
          new GeneralResponse(
            "project successfully removed",
            undefined,
            config.SUCCESS
          )
        );
    }
  );
};

