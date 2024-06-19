import express from "express";
import AIController from "./controllers/ai";
import authMiddleware from "../../common/middlewares/authMiddleware";
import validationMiddleware from "../../common/middlewares/validationMiddleware";
import { AIDto } from "@atomic/dto";

const aiRouter = express.Router();

aiRouter.post(
  "/chat",
  authMiddleware(),
  validationMiddleware(AIDto.chatCourseBot),
  AIController.chatCourseBot,
);

aiRouter.post(
  "/chat/create",
  authMiddleware(),
  validationMiddleware(AIDto.createChat),
  AIController.createChat,
);

aiRouter.post(
  "/flashcards/answer",
  authMiddleware(),
  validationMiddleware(AIDto.answerFlashcard),
  AIController.answerFlashcard,
);

aiRouter.get("/chat/history", authMiddleware(), AIController.getChatsByUserId);

aiRouter.get(
  "/chat/:chatId",
  authMiddleware(),
  validationMiddleware(AIDto.getChat),
  AIController.getChat,
);

export default aiRouter;
