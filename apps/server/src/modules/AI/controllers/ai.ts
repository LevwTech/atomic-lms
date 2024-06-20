import { AIDto } from "@atomic/dto";
import { ValidatedRequest } from "../../../common/middlewares/validationMiddleware";
import { Request, Response } from "express";
import AIService from "../services/ai";
import getUserFromRequest from "../../../common/helpers/getUserFromRequest";

export default class AIController {
  public static async createChat(
    req: ValidatedRequest<typeof AIDto.createChat>,
    res: Response,
  ) {
    const { courseId, attachmentId, sectionId } = req.body;

    const user = getUserFromRequest(req);

    const chat = await AIService.createChat(
      user.id,
      courseId,
      sectionId,
      attachmentId,
    );

    res.status(200).json({ chatId: chat._id });
  }

  public static async chatCourseBot(
    req: ValidatedRequest<typeof AIDto.chatCourseBot>,
    res: Response,
  ) {
    const { message, chatId } = req.body;

    const aiResponse = await AIService.sendMessageToChatbot(chatId, message);

    res.status(200).json(aiResponse);
  }

  public static async answerFlashcard(
    req: ValidatedRequest<typeof AIDto.answerFlashcard>,
    res: Response,
  ) {
    const { courseId, sectionId, attachmentId, questionId, answer } = req.body;

    const aiResponse = await AIService.answerFlashCard(
      courseId,
      sectionId,
      attachmentId,
      questionId,
      answer,
    );

    res.status(200).json(aiResponse);
  }

  public static async getChat(
    req: ValidatedRequest<typeof AIDto.getChat>,
    res: Response,
  ) {
    const { chatId } = req.params;

    const chat = await AIService.getChat(chatId);

    res.status(200).json(chat);
  }

  public static async getChatsByUserId(req: Request, res: Response) {
    const user = getUserFromRequest(req);

    const chats = await AIService.getChatsByUserId(user.id);

    res.status(200).json(chats);
  }

  public static async getExamQuestions(
    req: ValidatedRequest<typeof AIDto.getExamQuestions>,
    res: Response,
  ) {
    const { courseId, numMCQ, numTF, numFlashCards } = req.body;

    const questions = await AIService.getExamQuestions(
      courseId,
      numMCQ,
      numTF,
      numFlashCards,
    );

    res.status(200).json(questions);
  }

  public static async answerExamQuestions(
    req: ValidatedRequest<typeof AIDto.answerExamQuestions>,
    res: Response,
  ) {
    const { courseId, answers } = req.body;

    const results = await AIService.answerExamQuestions(answers, courseId);

    res.status(200).json(results);
  }
}
