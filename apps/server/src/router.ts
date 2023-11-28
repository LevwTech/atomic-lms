import express from 'express';

import usersRouter from './modules/users';

const mainRouter = express.Router();

mainRouter.use('/users', usersRouter);

export default mainRouter;
