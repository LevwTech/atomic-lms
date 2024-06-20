import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import axios from "axios";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { v4 as uuidv4 } from "uuid";
import CourseMaterialService from "../../courses-material/services/course-material";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  PromptTemplate,
} from "@langchain/core/prompts";
import AIPrompts from "../prompts";
import { createRetrievalChain } from "langchain/chains/retrieval";
import ChatModel from "../models/chat/chat.model";
import { API_ERROR } from "../../../common/helpers/throwApiError";
import { API_MESSAGES } from "../../../common/helpers/apiMessages";
import { MongoDBChatMessageHistory } from "@langchain/mongodb";
import mongoose, { Types } from "mongoose";
import { RunnableLambda, RunnableSequence } from "@langchain/core/runnables";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { z } from "zod";
import { Document } from "@langchain/core/documents";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { CohereRerank } from "@langchain/cohere";
import { loadSummarizationChain } from "langchain/chains";
import path from "path";
import { PPTXLoader } from "@langchain/community/document_loaders/fs/pptx";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import {
  FlashCardSchema,
  MCQOptionSchema,
  MCQQuestionSchema,
  QuestionTypes,
  TFQuestionAnswer,
  TFQuestionSchema,
} from "../../courses-material/models/course-material/course-material.schema";

export default class AIService {
  static textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1500,
    chunkOverlap: 100,
  });

  public static async ingestPDF(blob: Blob) {
    const loader = new PDFLoader(blob, { parsedItemSeparator: "" });

    return loader.load();
  }

  public static async ingestPPTX(blob: Blob) {
    const loader = new PPTXLoader(blob);

    const docs = await loader.load();

    return this.textSplitter.splitDocuments(docs);
  }

  public static async ingestDOCX(blob: Blob) {
    const loader = new DocxLoader(blob);

    const docs = await loader.load();

    return this.textSplitter.splitDocuments(docs);
  }

  public static async ingestFile(
    file: Express.MulterS3.File,
    courseId: string,
    sectionId: string,
    attachmentId: string,
    title?: string,
  ) {
    const supportedFileExtensions = ["pdf", "pptx", "docx"];

    const fileExtension = path.extname(file.originalname).slice(1);

    if (!supportedFileExtensions.includes(fileExtension)) {
      console.log("AISERVICE: File extension not supported");
      return;
    }

    const fileUrl = file.location.startsWith("http")
      ? file.location
      : "http://" + file.location;
    const response = await axios.get(fileUrl, {
      responseType: "arraybuffer",
    });

    const buffer = Buffer.from(response.data, "binary");

    const blob = new Blob([buffer], { type: file.mimetype });

    let docs: Array<Document> = [];

    switch (fileExtension) {
      case "pdf":
        docs = await this.ingestPDF(blob);
        break;
      case "pptx":
        docs = await this.ingestPPTX(blob);
        break;
      case "docx":
        docs = await this.ingestDOCX(blob);
        break;
    }

    docs.forEach((doc) => {
      doc.metadata.docId = uuidv4();
      doc.metadata.attachmentId = attachmentId;
      doc.metadata.courseId = courseId;
      doc.metadata.fileName = title || file.originalname;
      doc.metadata.pageNumber = doc.metadata.loc.pageNumber || 0;
    });

    this.embedFile(courseId, sectionId, attachmentId, docs);

    this.generateMCQQuestions(courseId, sectionId, attachmentId, docs);

    this.generateTFQuestions(courseId, sectionId, attachmentId, docs);

    this.generateFlashCards(courseId, sectionId, attachmentId, docs);

    this.summarizeDocument(courseId, sectionId, attachmentId, docs);
  }

  public static async embedFile(
    courseId: string,
    sectionId: string,
    attachmentId: string,
    docs: Array<Document>,
  ) {
    const docIds = docs.map((doc) => doc.metadata.docId);

    const embeddings = new OpenAIEmbeddings({
      model: "text-embedding-3-large",
    });

    const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });

    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

    // await pineconeIndex.deleteAll();

    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex,
      maxConcurrency: 5,
      onFailedAttempt: (error) => {
        console.error(error);
      },
      namespace: courseId,
    });

    await CourseMaterialService.addAttachmentDocIds(
      courseId,
      sectionId,
      attachmentId,
      docIds,
    );

    console.log("Embedded documents with length: ", docs.length);
  }

  public static async createChat(
    userId: string,
    courseId: string,
    sectionId?: string,
    attachmentId?: string,
  ) {
    return ChatModel.createChat(userId, courseId, sectionId, attachmentId);
  }

  public static async getChat(chatId: string) {
    return ChatModel.getChat(chatId);
  }

  public static async getChatsByUserId(userId: string) {
    return ChatModel.getChatsByUserId(userId);
  }

  public static async sendMessageToChatbot(chatId: string, question: string) {
    const chat = await ChatModel.getChat(chatId);

    if (!chat) {
      throw new API_ERROR(API_MESSAGES.DOESNT_EXIST);
    }

    const { courseId, sectionId, attachmentId } = chat;

    const embeddings = new OpenAIEmbeddings({
      model: "text-embedding-3-large",
    });

    const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });

    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

    const filter: any = { namespace: courseId };

    if (sectionId && attachmentId) {
      const docIds = await CourseMaterialService.getAttachmentDocIds(
        courseId,
        sectionId,
        attachmentId,
      );

      filter.docId = { $in: docIds };
    }

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      filter,
      pineconeIndex,
      namespace: courseId,
    });

    const retriever = vectorStore.asRetriever(40);

    const llm = new ChatOpenAI({
      model: "gpt-4o",
      modelName: "gpt-4o",
      temperature: 0.5,
    });

    const outputFormat = z
      .object({
        answer: z
          .string()
          .describe(
            "The answer to the user question in markdown format with a h3 header, which is based only on the given sources.",
          ),
        newChatTitle: z
          .string()
          .describe(
            "updated chat title if needed based on the context of the chat",
          ),
        citations: z
          .array(
            z.object({
              fileName: z
                .string()
                .describe(
                  "The file name of the SPECIFIC sources which justify the answer.",
                ),
              pageNumber: z
                .number()
                .describe(
                  "The page number of the SPECIFIC sources which justify the answer.",
                ),
            }),
          )
          .describe(
            "The file name and page number of the SPECIFIC sources which justify the answer.",
          ),
      })
      .describe("A cited source from the given text");

    const llmWithCitationTool = llm.withStructuredOutput(outputFormat, {
      name: "cited_answers",
    });

    const rephrasePrompt = ChatPromptTemplate.fromMessages([
      ["system", AIPrompts.contextualizeQSystemPrompt],
      new MessagesPlaceholder("chat_history"),
      ["human", "{input}"],
    ]);

    const historyAwarRetriever = await createHistoryAwareRetriever({
      llm,
      retriever,
      rephrasePrompt: rephrasePrompt as any,
    });

    const collection = mongoose.connection.db.collection("chats");

    const chatHistory = new MongoDBChatMessageHistory({
      collection: collection as any,
      sessionId: chatId,
    });

    const chatbotQPrompt = ChatPromptTemplate.fromMessages([
      ["system", AIPrompts.chatbotQSystemPrompt],
      new MessagesPlaceholder("chat_history"),
      ["user", "{input}"],
    ]);

    const formatDocsForCitation = (docs: Array<Document>): string => {
      return (
        "\n\n" +
        docs
          .map(
            (doc: Document) =>
              `File Name: ${doc.metadata.attachmentId}\n Page Number: ${doc.metadata["loc.pageNumber"] || 0}\nPage Content: ${doc.pageContent}`,
          )
          .join("\n\n")
      );
    };

    const cohereRerank = new CohereRerank({
      apiKey: process.env.COHERE_API_KEY,
      topN: 10,
      model: "rerank-multilingual-v3.0",
    });

    const questionAnswerChain = RunnableSequence.from([
      new RunnableLambda({
        func: async (input: any) => {
          input.context = await cohereRerank.compressDocuments(
            input.context,
            input.input,
          );
          return input;
        },
      }),
      new RunnableLambda({
        func: (input: any) => {
          input.context = formatDocsForCitation(input.context);
          return input;
        },
      }),
      chatbotQPrompt,
      llmWithCitationTool as any,
    ]).withConfig({
      runName: "Bot Answer Generation",
    });

    const ragChain = await createRetrievalChain({
      retriever: historyAwarRetriever,
      combineDocsChain: questionAnswerChain as any,
    });

    const response: any = await ragChain.invoke({
      chat_history: await chatHistory.getMessages(),
      input: question,
      chat_title: chat.title,
    });

    const course =
      await CourseMaterialService.getCourseMaterialWithContent(courseId);

    const citationsWithFileName: {
      fileName: string;
      pageNumber: number;
      sectionId: string;
      attachmentId: string;
      courseId: string;
    }[] = [];

    response.answer.citations.forEach((citation: any) => {
      course.sections.forEach((section) => {
        const doc = section.content.find((doc) => {
          return doc._id.toString() === citation.fileName;
        });
        if (doc) {
          citationsWithFileName.push({
            fileName: doc.title,
            pageNumber: citation.pageNumber,
            sectionId: (section as any)._id,
            attachmentId: doc._id,
            courseId,
          });
        }
      });
    });

    const updateChatHistory = chatHistory.addMessages([
      new HumanMessage(question),
      new AIMessage({
        content: response.answer.answer,
        additional_kwargs: {
          citations: citationsWithFileName,
        },
      }),
    ]);

    const updateTitle = ChatModel.updateChatTitle(
      chatId,
      response.answer.newChatTitle,
    );

    await Promise.all([updateChatHistory, updateTitle]);

    return {
      answer: response.answer.answer,
      citations: citationsWithFileName,
      newChatTitle: response.answer.newChatTitle,
    };
  }

  public static async summarizeDocument(
    courseId: string,
    sectionId: string,
    attachmentId: string,
    docs: Array<Document>,
  ) {
    const llm = new ChatOpenAI({
      model: "gpt-4o",
      modelName: "gpt-4o",
      temperature: 0.5,
    });

    const largeDocs: Document[] = [];

    let currentDoc = { ...docs[0] };
    const numTokensPerDoc = 10000;

    for (let i = 1; i < docs.length; i++) {
      const nextDoc = { ...docs[i] };

      const tokensCount = await llm.getNumTokens(
        currentDoc.pageContent + nextDoc.pageContent,
      );

      if (tokensCount < numTokensPerDoc) {
        currentDoc.pageContent += nextDoc.pageContent;
      } else {
        largeDocs.push(currentDoc);
        currentDoc = nextDoc;
      }
    }

    largeDocs.push(currentDoc);

    const summarizationPrompt = new PromptTemplate({
      template: AIPrompts.summarizeDocumentQSystemPrompt,
      inputVariables: ["text"],
    });

    const summarizeChain = loadSummarizationChain(llm, {
      type: "map_reduce",
      combineMapPrompt: summarizationPrompt as any,
      combinePrompt: summarizationPrompt as any,
      returnIntermediateSteps: true,
      // prompt: summarizationPrompt,
    }).withConfig({
      runName: "Summarization Generation",
    });

    const response = await summarizeChain.invoke({
      input_documents: largeDocs,
    });

    await CourseMaterialService.addAttachmentSummary(
      courseId,
      sectionId,
      attachmentId,
      response.text,
    );

    console.log("Summarized document with id: ", attachmentId);
  }

  public static async generateFlashCards(
    courseId: string,
    sectionId: string,
    attachmentId: string,
    docs: Array<Document>,
  ) {
    const llm = new ChatOpenAI({
      model: "gpt-4o",
      modelName: "gpt-4o",
      temperature: 0,
      maxTokens: -1,
    });

    const outputFormat = z
      .object({
        questions: z
          .array(
            z
              .object({
                question: z
                  .string()
                  .optional()
                  .describe("the generated flash card question"),
                answer: z.string().describe("the generated flash card answer"),
                explanation: z
                  .string()
                  .optional()
                  .describe(
                    "an explanation why the answer is correct based on the learning material",
                  ),
                pageNumber: z
                  .number()
                  .optional()
                  .describe(
                    "the page number of the SPICIFIC page the question was generated from",
                  ),
                docId: z
                  .string()
                  .optional()
                  .describe(
                    "the docId of the SPICIFIC page the question was generated from",
                  ),
              })
              .describe(
                "a flash card question with question, answer and page number",
              ),
          )
          .describe(
            "a list of all unique flash cards questions that can be generated from the provided learning material with answers and citation",
          ),
      })
      .describe("an object with flash card questions");

    const llmWithFlashCardTool = llm.withStructuredOutput(outputFormat, {
      name: "cited_flash_cards",
    });

    const formatDocsForCitation = (docs: Array<Document>): string => {
      return (
        "\n\n" +
        docs
          .map(
            (doc: Document) =>
              `docId: ${doc.metadata.docId}\nPage Number: ${doc.metadata.pageNumber || 0}\nArticle Snippet: ${doc.pageContent}`,
          )
          .join("\n\n")
      );
    };

    const flashCardsPrompt = new PromptTemplate({
      template: AIPrompts.generateFlashCardsQSystemPrompt,
      inputVariables: ["context"],
    });

    const generateFlashCardsChain = RunnableSequence.from([
      (input) => {
        input.context = formatDocsForCitation(input.context);
        return input;
      },
      flashCardsPrompt,
      llmWithFlashCardTool as any,
    ]).withConfig({
      runName: "Flash Cards Generation",
    });

    const response = await generateFlashCardsChain.invoke({
      context: docs,
    });

    const filteredQuestions: FlashCardSchema[] = [];

    for (const question of response.questions) {
      if (
        question.question &&
        question.answer &&
        question.explanation &&
        question.pageNumber &&
        question.docId
      ) {
        filteredQuestions.push({
          _id: new Types.ObjectId(),
          question: question.question,
          answer: question.answer,
          pageNumber: question.pageNumber,
          docId: question.docId,
          explanation: question.explanation,
          type: QuestionTypes.FLASHCARD,
        });
      }
    }

    await CourseMaterialService.addAttachmentFlashCards(
      courseId,
      sectionId,
      attachmentId,
      filteredQuestions,
    );

    console.log("Generated flash cards for document with id: ", attachmentId);
  }

  public static async answerFlashCard(
    courseId: string,
    sectionId: string,
    attachmentId: string,
    questionId: string,
    studentAnswer: string,
  ) {
    const llm = new ChatOpenAI({
      model: "gpt-4o",
      modelName: "gpt-4o",
      temperature: 0,
      maxTokens: -1,
    });

    const outputFormat = z
      .object({
        isCorrect: z
          .enum(["correct", "partially_correct", "incorrect"])
          .describe(
            'stating the student answer is "correct", "partially_correct" or "incorrect"',
          ),
        explaination: z
          .string()
          .describe(
            "an explaination why the answer is correct, partially correct or incorrect",
          ),
        correctAnswer: z
          .string()
          .describe("the correct answer to the flash card question"),
        advise: z
          .string()
          .describe("an advise to the student on how to improve their answer"),
      })
      .describe(
        "an object stating if the student answer is correct, partially correct or incorrect",
      );

    const llmWithFlashCardTool = llm.withStructuredOutput(outputFormat, {
      name: "cited_flash_cards",
    });

    const flashCardsPrompt = new PromptTemplate({
      template: AIPrompts.answerFlashCardQSystemPrompt,
      inputVariables: [
        "question",
        "correctAnswer",
        "studentAnswer",
        "explanation",
        "pageNumber",
      ],
    });

    const generateFlashCardsChain = RunnableSequence.from([
      flashCardsPrompt,
      llmWithFlashCardTool as any,
    ]).withConfig({
      runName: "Flash Card Answering",
    });

    const flashCard = await CourseMaterialService.getAttachmentFlashCards(
      courseId,
      sectionId,
      attachmentId,
      questionId,
    );

    if (!flashCard || Array.isArray(flashCard)) {
      throw new API_ERROR(API_MESSAGES.DOESNT_EXIST);
    }

    const response = await generateFlashCardsChain.invoke({
      question: flashCard.question,
      correctAnswer: flashCard.answer,
      studentAnswer,
      explanation: flashCard.explanation,
      pageNumber: flashCard.pageNumber,
    });

    return response;
  }

  public static async generateMCQQuestions(
    courseId: string,
    sectionId: string,
    attachmentId: string,
    docs: Array<Document>,
  ) {
    const llm = new ChatOpenAI({
      model: "gpt-4o",
      modelName: "gpt-4o",
      temperature: 0,
      maxTokens: -1,
    });

    const outputFormat = z
      .object({
        questions: z
          .array(
            z
              .object({
                question: z
                  .string()
                  .optional()
                  .describe("the generated MCQ question itself"),
                options: z
                  .array(
                    z.object({
                      letter: z
                        .enum(["A", "B", "C", "D"])
                        .describe("the letter of the option A, B, C, or D"),
                      text: z.string().describe("the text of the option"),
                      isCorrect: z
                        .boolean()
                        .describe("if the option is the correct answer"),
                    }),
                  )
                  .optional()
                  .describe("the options for the MCQ question"),
                explanation: z
                  .string()
                  .optional()
                  .describe(
                    "an explanation why the answer is correct based on the learning material",
                  ),
                pageNumber: z
                  .number()
                  .optional()
                  .describe(
                    "the page number of the SPICIFIC page the question was generated from",
                  ),
                docId: z
                  .string()
                  .optional()
                  .describe(
                    "the docId of the SPICIFIC page the question was generated from",
                  ),
              })
              .describe(
                "a MCQ question with question, option, answer, docId and page number",
              ),
          )
          .describe(
            "a list of all unique True and False questions that can be generated from the provided learning material with answers and citation",
          ),
      })
      .describe("an object with flash card questions");

    const llmWithMCQTool = llm.withStructuredOutput(outputFormat, {
      name: "cited_MCQ_questions",
    });

    const formatDocsForCitation = (docs: Array<Document>): string => {
      return (
        "\n\n" +
        docs
          .map(
            (doc: Document) =>
              `docId: ${doc.metadata.docId}\nPage Number: ${doc.metadata.pageNumber || 0}\nArticle Snippet: ${doc.pageContent}`,
          )
          .join("\n\n")
      );
    };

    const MCQQuestionsPrompt = new PromptTemplate({
      template: AIPrompts.generateMCQQuestionsQSystemPrompt,
      inputVariables: ["context"],
    });

    const generateMCQQuestionsChain = RunnableSequence.from([
      (input) => {
        input.context = formatDocsForCitation(input.context);
        return input;
      },
      MCQQuestionsPrompt,
      llmWithMCQTool as any,
    ]).withConfig({
      runName: "MCQ Questions Generation",
    });

    const response = await generateMCQQuestionsChain.invoke({
      context: docs,
    });

    const filteredQuestions: MCQQuestionSchema[] = [];

    for (const question of response.questions) {
      if (
        question.question &&
        question.options &&
        question.explanation &&
        question.pageNumber &&
        question.docId
      ) {
        if (question.options.length === 4)
          filteredQuestions.push({
            _id: new Types.ObjectId(),
            question: question.question,
            options: question.options,
            pageNumber: question.pageNumber,
            docId: question.docId,
            explanation: question.explanation,
            type: QuestionTypes.MCQ,
          });
      }
    }

    await CourseMaterialService.addAttachmentMCQs(
      courseId,
      sectionId,
      attachmentId,
      filteredQuestions,
    );

    console.log("Generated MCQ Questions for document with id: ", attachmentId);
  }

  public static async generateTFQuestions(
    courseId: string,
    sectionId: string,
    attachmentId: string,
    docs: Array<Document>,
  ) {
    const llm = new ChatOpenAI({
      model: "gpt-4o",
      modelName: "gpt-4o",
      temperature: 0,
      maxTokens: -1,
    });

    const outputFormat = z
      .object({
        questions: z
          .array(
            z
              .object({
                question: z
                  .string()
                  .optional()
                  .describe("the generated True and False question itself"),
                answer: z
                  .enum([TFQuestionAnswer.TRUE, TFQuestionAnswer.FALSE])
                  .optional()
                  .describe(
                    "the generated True and False question answer being either true or false",
                  ),
                explanation: z
                  .string()
                  .optional()
                  .describe(
                    "an explanation why the answer is correct based on the learning material",
                  ),
                pageNumber: z
                  .number()
                  .optional()
                  .describe(
                    "the page number of the SPICIFIC page the question was generated from",
                  ),
                docId: z
                  .string()
                  .optional()
                  .describe(
                    "the docId of the SPICIFIC page the question was generated from",
                  ),
              })
              .describe(
                "a True and False question with question, answer, docId and page number",
              ),
          )
          .describe(
            "a list of all unique True and False questions that can be generated from the provided learning material with answers and citation",
          ),
      })
      .describe("an object with True and False questions");

    const llmWithMCQTool = llm.withStructuredOutput(outputFormat, {
      name: "cited_TF_questions",
    });

    const formatDocsForCitation = (docs: Array<Document>): string => {
      return (
        "\n\n" +
        docs
          .map(
            (doc: Document) =>
              `docId: ${doc.metadata.docId}\nPage Number: ${doc.metadata.pageNumber || 0}\nArticle Snippet: ${doc.pageContent}`,
          )
          .join("\n\n")
      );
    };

    const TFQuestionsPrompt = new PromptTemplate({
      template: AIPrompts.generateTFQuestionQSystemPrompt,
      inputVariables: ["context"],
    });

    const generateTFQuestionsChain = RunnableSequence.from([
      (input) => {
        input.context = formatDocsForCitation(input.context);
        return input;
      },
      TFQuestionsPrompt,
      llmWithMCQTool as any,
    ]).withConfig({
      runName: "True and False Questions Generation",
    });

    const response = await generateTFQuestionsChain.invoke({
      context: docs,
    });

    const filteredQuestions: TFQuestionSchema[] = [];

    for (const question of response.questions) {
      if (
        question.question &&
        question.answer &&
        question.explanation &&
        question.pageNumber &&
        question.docId
      ) {
        filteredQuestions.push({
          _id: new Types.ObjectId(),
          question: question.question,
          answer: question.answer,
          pageNumber: question.pageNumber,
          docId: question.docId,
          explanation: question.explanation,
          type: QuestionTypes.TF,
        });
      }
    }

    await CourseMaterialService.addAttachmentTFs(
      courseId,
      sectionId,
      attachmentId,
      filteredQuestions,
    );

    console.log("Generated TF Questions for document with id: ", attachmentId);
  }

  public static async getExamQuestions(
    courseId: string,
    numMCQ: number,
    numTF: number,
    numFlashCards: number,
  ) {
    const course =
      await CourseMaterialService.getCourseMaterialWithContent(courseId);

    const mcqs: {
      courseId: string;
      sectionId: string;
      attachmentId: string;
      fileName: string;
      _id?: Types.ObjectId | undefined;
      type: QuestionTypes;
      question: string;
      options: MCQOptionSchema[];
      explanation: string;
      pageNumber: number;
      docId: string;
    }[] = [];

    const tfs: {
      courseId: string;
      sectionId: string;
      attachmentId: string;
      fileName: string;
      _id?: Types.ObjectId | undefined;
      type: QuestionTypes;
      question: string;
      answer: TFQuestionAnswer;
      explanation: string;
      pageNumber: number;
      docId: string;
    }[] = [];

    const flashCards: {
      courseId: string;
      sectionId: string;
      attachmentId: string;
      fileName: string;
      _id?: Types.ObjectId | undefined;
      type: QuestionTypes;
      question: string;
      answer: string;
      explanation: string;
      pageNumber: number;
      docId: string;
    }[] = [];

    for (const section of course.sections) {
      for (const attachment of section.content) {
        if (attachment.doesHaveMCQs) {
          mcqs.push(
            ...attachment.mcqQuestions.map((question) => ({
              courseId,
              sectionId: (section as any)._id as string,
              attachmentId: attachment._id,
              fileName: attachment.title,
              type: question.type,
              question: question.question,
              options: question.options,
              explanation: question.explanation,
              pageNumber: question.pageNumber,
              docId: question.docId,
              _id: question._id,
            })),
          );
        }

        if (attachment.doesHaveTFs) {
          tfs.push(
            ...attachment.tfQuestions.map((question) => ({
              courseId,
              sectionId: (section as any)._id as string,
              attachmentId: attachment._id,
              fileName: attachment.title,
              type: question.type,
              question: question.question,
              answer: question.answer,
              explanation: question.explanation,
              pageNumber: question.pageNumber,
              docId: question.docId,
              _id: question._id,
            })),
          );
        }

        if (attachment.doesHaveFlashCards) {
          flashCards.push(
            ...attachment.flashCards.map((question) => ({
              courseId,
              sectionId: (section as any)._id as string,
              attachmentId: attachment._id,
              fileName: attachment.title,
              type: question.type,
              question: question.question,
              answer: question.answer,
              explanation: question.explanation,
              pageNumber: question.pageNumber,
              docId: question.docId,
              _id: question._id,
            })),
          );
        }
      }
    }

    const mcqQuestions = mcqs
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(numMCQ, mcqs.length));

    const tfQuestions = tfs
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(numTF, tfs.length));

    const flashCardQuestions = flashCards
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(numFlashCards, flashCards.length));

    return {
      mcqQuestions,
      tfQuestions,
      flashCardQuestions,
    };
  }

  public static async answerExamQuestions(
    questions: {
      questionId: string;
      studentAnswer: string;
    }[],
    courseId: string,
  ) {
    const llm = new ChatOpenAI({
      model: "gpt-4o",
      modelName: "gpt-4o",
      temperature: 0,
      maxTokens: -1,
    });

    const outputFormat = z
      .object({
        answers: z
          .array(
            z
              .object({
                questionId: z.string().describe("the question id"),
                isCorrect: z
                  .enum(["correct", "partially_correct", "incorrect"])
                  .describe(
                    'stating the student answer is "correct", "partially_correct" or "incorrect"',
                  ),
                explaination: z
                  .string()
                  .describe(
                    "an explaination why the answer is correct, partially correct or incorrect",
                  ),
                correctAnswer: z
                  .string()
                  .describe("the correct answer to the flash card question"),
                advise: z
                  .string()
                  .describe(
                    "an advise to the student on how to improve their answer",
                  ),
              })
              .describe(
                "an object stating if the student answer is correct, partially correct or incorrect",
              ),
          )
          .describe("an array of answers to the exam questions"),
      })
      .describe("an object with answers to the exam questions");

    const llmWithFlashCardTool = llm.withStructuredOutput(outputFormat, {
      name: "cited_flash_cards",
    });

    const flashCardsPrompt = new PromptTemplate({
      template: AIPrompts.answerExamQuestionsQSystemPrompt,
      inputVariables: ["questions"],
    });

    const formatFlashCardsForAnswer = (
      cards: {
        sectionId: string;
        attachmentId: string;
        courseId: string;
        studentAnswer: string;
        _id: Types.ObjectId;
        type: QuestionTypes;
        question: string;
        answer: string;
        explanation: string;
        pageNumber: number;
        docId: string;
      }[],
    ): string => {
      return (
        "\n\n" +
        cards
          .map(
            (card) =>
              `questionId:${card._id.toString()}\nquestion: ${card.question}\nPage Number: ${card.pageNumber || 0}\nCorrect Answer: ${card.answer}\nexplanation: ${card.explanation}\nStudent Answer: ${card.studentAnswer}`,
          )
          .join("\n\n")
      );
    };

    const generateFlashCardsChain = RunnableSequence.from([
      (input) => {
        input.questions = formatFlashCardsForAnswer(input.questions);
        return input;
      },
      flashCardsPrompt,
      llmWithFlashCardTool as any,
    ]).withConfig({
      runName: "exam Answering",
    });

    const course =
      await CourseMaterialService.getCourseMaterialWithContent(courseId);

    const questionsIds = questions.map((question) => question.questionId);

    const flashCards: {
      sectionId: string;
      attachmentId: string;
      courseId: string;
      studentAnswer: string;
      _id: Types.ObjectId;
      type: QuestionTypes;
      question: string;
      answer: string;
      explanation: string;
      pageNumber: number;
      docId: string;
    }[] = [];

    for (const section of course.sections) {
      for (const attachment of section.content) {
        attachment.flashCards.forEach((question) => {
          if (questionsIds.includes(question._id!.toString())) {
            const studentAnswer = questions.find(
              (q) => q.questionId === question._id!.toString(),
            )!.studentAnswer;
            flashCards.push({
              type: question.type,
              question: question.question,
              answer: question.answer,
              explanation: question.explanation,
              pageNumber: question.pageNumber,
              docId: question.docId,
              sectionId: (section as any)._id as string,
              attachmentId: attachment._id,
              courseId,
              studentAnswer,
              _id: question._id!,
            });
          }
        });
      }
    }

    const response = await generateFlashCardsChain.invoke({
      questions: flashCards,
    });

    const orderedAnswers = questions
      .map((question) =>
        response.answers.find(
          (answer: any) => answer.questionId === question.questionId,
        ),
      )
      .map((answer) => {
        const card = flashCards.find(
          (card) => card._id.toString() === answer.questionId,
        );

        return {
          ...answer,
          question: card?.question,
          pageNumber: card?.pageNumber,
          correctAnswer: card?.answer,
          docId: card?.docId,
          courseId: card?.courseId,
          sectionId: card?.sectionId,
          attachmentId: card?.attachmentId,
        };
      });

    return orderedAnswers;
  }
}
