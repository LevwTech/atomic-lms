import express from 'express';

import usersRouter from './modules/users';
import courseRouter from './modules/course';

const mainRouter = express.Router();

mainRouter.use('/users', usersRouter);
mainRouter.use('/course', courseRouter);

export default mainRouter;
