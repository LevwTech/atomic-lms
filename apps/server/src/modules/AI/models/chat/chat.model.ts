import { ReturnModelType, getModelForClass } from "@typegoose/typegoose";
import ChatSchema, { ChatType, MessageSchema } from "./chat.schema";
import { ObjectId } from "mongodb";

class ChatMethods extends ChatSchema {
  public static async createChat(
    this: ReturnModelType<typeof ChatSchema>,
    userId: string,
    courseId: string,
    sectionId?: string,
    attachmentId?: string,
  ) {
    const id = new ObjectId();

    const type = sectionId && attachmentId ? ChatType.FILE : ChatType.COURSE;

    const newChat = new this({
      _id: id,
      sessionId: id.toHexString(),
      userId,
      courseId,
      sectionId,
      attachmentId,
      type,
      title: "",
    });
    await newChat.save();
    return newChat;
  }

  public static async getChat(
    this: ReturnModelType<typeof ChatSchema>,
    chatId: string,
  ) {
    return this.findOne({ _id: chatId });
  }

  public static async getChatsByUserId(
    this: ReturnModelType<typeof ChatSchema>,
    userId: string,
  ) {
    return this.find({ userId, type: ChatType.COURSE }).select("-messages");
  }

  public static async addMessage(
    this: ReturnModelType<typeof ChatSchema>,
    chatId: string,
    message: MessageSchema,
  ) {
    return this.updateOne({ _id: chatId }, { $push: { messages: message } });
  }

  public static async updateChatTitle(
    this: ReturnModelType<typeof ChatSchema>,
    chatId: string,
    title: string,
  ) {
    return this.updateOne({ _id: chatId }, { title });
  }
}

const ChatModel = getModelForClass(ChatMethods, {
  options: {
    customName: "Chat",
  },
});

export default ChatModel;
