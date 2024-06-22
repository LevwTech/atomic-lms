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
  "/get-attachment-flashcards",
  authMiddleware(),
  validationMiddleware(AIDto.getAttachmentFlashcards),
  AIController.getAttachmentFlashcards,
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

aiRouter.post(
  "/generate-exam",
  authMiddleware(),
  validationMiddleware(AIDto.getExamQuestions),
  AIController.getExamQuestions,
);

aiRouter.post(
  "/answer-exam",
  authMiddleware(),
  validationMiddleware(AIDto.answerExamQuestions),
  AIController.answerExamQuestions,
);

aiRouter.post(
  "/ai-tutor",
  authMiddleware(),
  validationMiddleware(AIDto.AITutor),
  AIController.AITutor,
);

export default aiRouter;
