import express from 'express';
const router = express.Router();
import { validator } from '../../helpers/validator.helper.js';
import { authenticate } from '../../helpers/auth.helper.js';
import projectsController from '../../controllers/projects.controller.js';
import projectValidation from '../../validations/project.validation.js';

import { uploadImg } from '../../service/imageUpload.service.js';

const pathString = 'projectid';
const maxImg = 5;

router.get('/', projectsController.projectList);
router.get(`/:${pathString}`, projectsController.getProjectByProjectId);
router.post('/',[ authenticate, uploadImg.array('image', maxImg), validator.body( projectValidation.validateProject ) ], projectsController.addProject);
router.put(`/:${pathString}`,[ authenticate, uploadImg.array('image', maxImg), validator.body( projectValidation.validateProject ) ], projectsController.updateProject);
router.delete(`/:${pathString}`, authenticate, projectsController.removeProjectById);

export const projectRoute = router;
