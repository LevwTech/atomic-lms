import express from "express";

import usersRouter from "./modules/users";
import courseRouter from "./modules/course";
import materialsRouter from "./modules/courses-material";
import aiRouter from "./modules/AI";

const mainRouter = express.Router();

mainRouter.use("/users", usersRouter);
mainRouter.use("/course", courseRouter);
mainRouter.use("/course-marerial", materialsRouter);
mainRouter.use("/ai", aiRouter);

export default mainRouter;
