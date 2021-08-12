import express from 'express';
const router = express.Router();
import { authRoute } from './route/auth.route.js';
import { projectRoute } from './route/projects.route.js';
import { userRoute } from './route/users.route.js';
import { categoryRoute } from './route/categories.route.js';
import { accountRoute } from './route/accounts.route.js';

const auth = authRoute;
const user = userRoute;
const project = projectRoute;
const category = categoryRoute;
const account = accountRoute;

router.use('/auth', auth);
router.use('/projects', project);
router.use('/categories', category);
router.use('/users',user);
router.use('/accounts',account);

export const mainRouter = router;
