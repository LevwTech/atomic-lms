import express from 'express';

import usersRouter from './modules/users';
import materialsRouter from './modules/courses-material';

const mainRouter = express.Router();

mainRouter.use('/users', usersRouter);
mainRouter.use('/course-marerial', materialsRouter);

export default mainRouter;
