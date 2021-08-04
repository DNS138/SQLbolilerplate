const express = require("express");
const router = express.Router();
const {validator} = require("../../helpers/validator.helper");
const { authenticate } = require('../../helpers/auth.helper');
const projectsController = require("../../controllers/projects.controller");
const projectValidation = require('../../validations/project.validation')

var upload = require('../../service/imageUpload.service')

router.get("/", projectsController.projectList);
router.get("/:projectid", projectsController.getProjectByProjectId);
router.post("/",[ authenticate, upload.array('image', 5), validator.body( projectValidation.validateProject ) ], projectsController.addProject);
router.put("/:projectid",[ authenticate, upload.array('image', 5), validator.body( projectValidation.validateProject ) ], projectsController.updateProject);
router.delete("/:projectid", authenticate, projectsController.removeProjectById);

module.exports = router;