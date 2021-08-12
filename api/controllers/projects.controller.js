import { GeneralResponse } from '../utils/response.js';
import { GeneralError, NotFound } from '../utils/error.js';
import { projectsModel } from '../models/projects.model.js';
import { config } from '../utils/config.js';
const err404 = 'Project not found';
const errNotFound = 404;
const forignKeyConstraint = 1452;

let element;
const projectList = async (req, res, next) => {

  try {
    projectsModel.getProjects((err, response) => {
      if (err) {
        next(new NotFound('no projects found'));
      }
      const pathString = 'localhost:5000/uploads/';
      for (element of response) {
        element.image = element.image.split(',');
        for (let j = 0; j < element.image.length; j++) {
          element.image[j] = pathString.concat(`${element.image[j]}`);
        }
      }
      next(new GeneralResponse('projects list', response));
    });
  } catch (err) {
    next(new GeneralError('error while getting projects list'));
  }
};

const getProjectByProjectId = async (req, res, next) => {
  const { projectid } = req.params;

  try {
    projectsModel.getProjectById(projectid, (err, response) => {
      if (err == null && response.length === 0) {
        next(new NotFound(err404, err, errNotFound));
      } else {
        const pathString = 'localhost:5000/uploads/';
        response[0].image = response[0].image.split(',');
        for(let j = 0; j < response[0].image.length && response[0].image[j] !== '' ; j++) {
          response[0].image[j] = pathString.concat(`${response[0].image[j]}`);
        }
        next(new GeneralResponse('project detail found', response));
      }
    });
  } catch (err) {
    next(new GeneralError('error while getting project detail'));
  }
};

const addProject = async (req, res, next) => {
  const { title, description, categoryId, image } = req.body;

  const arrayString = req.files.map(a => a.filename).toString();

  projectsModel.addProject(
    { title, description, categoryId, image },
    arrayString,
    (err, response) => {
      if (err && response && response.affectedRows === 0) {
        if(err.errno === forignKeyConstraint){
          next(new NotFound('Categorty not found. Please enter valid category'));
        }
        if(err.errno !== undefined){
          next(new GeneralError('Adding porject failed'));
        }
      } else {
        next(
          new GeneralResponse(
            'Project successfully added',
            undefined,
            config.HTTP_CREATED
          )
        );
      }
    }
  );
};

const updateProject = async (req, res, next) => {

  const { title, description, categoryId } = req.body;
  const { projectid } = req.params;

  const image = req.files.map(a => a.filename).toString();
  projectsModel.updateProject(
    projectid,
    { title, description, categoryId, image },
    (err, response) => {
      if (typeof response !== 'undefined' && response.affectedRows === 0) {
        next(new NotFound(err404, err, errNotFound));
      } else if (err) {
        next(new GeneralError('Updating project failed'));
      } else {
        next(
          new GeneralResponse(
            'Project successfully updated',
            undefined,
            config.SUCCESS
          )
        );
      }
    }
  );
};

const removeProjectById = async (req, res, next) => {

  const { projectid } = req.params;
  projectsModel.removeOneProject(
    projectid,
    (err, response) => {
      if (err) {
        next(new GeneralError('removing project failed'));
      } else if (response && response.affectedRows === 0) {
        next(new NotFound(err404, err, errNotFound));
      } else {
        next(
          new GeneralResponse(
            'project successfully removed',
            undefined,
            config.SUCCESS
          )
        );
      }
    }
  );
};

export default { projectList, getProjectByProjectId, addProject, updateProject, removeProjectById };

