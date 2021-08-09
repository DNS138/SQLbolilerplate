const express = require('express');
const router = express.Router();

const auth = require('./route/auth.route');
const user = require('./route/users.route');
const project = require('./route/projects.route');
const category = require('./route/categories.route');
const account = require('./route/accounts.route');

router.use('/auth', auth);
router.use('/projects', project);
router.use('/categories', category);
router.use('/users',user);
router.use('/accounts',account);

module.exports = router;
