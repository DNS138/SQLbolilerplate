const express = require('express');
const router = express.Router();
const { validator } = require('../../helpers/validator.helper');
const { authenticate } = require('../../helpers/auth.helper');
const projectsController = require('../../controllers/projects.controller');
const projectValidation = require('../../validations/project.validation');

const upload = require('../../service/imageUpload.service');

const pathString = 'projectid';
const maxImg = 5;

router.get('/', projectsController.projectList);
router.get(`/:${pathString}`, projectsController.getProjectByProjectId);
router.post('/',[ authenticate, upload.array('image', maxImg), validator.body( projectValidation.validateProject ) ], projectsController.addProject);
router.put(`/:${pathString}`,[ authenticate, upload.array('image', maxImg), validator.body( projectValidation.validateProject ) ], projectsController.updateProject);
router.delete(`/:${pathString}`, authenticate, projectsController.removeProjectById);

module.exports = router;
