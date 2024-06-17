import { ReturnModelType, getModelForClass } from "@typegoose/typegoose";
import ChatSchema, { MessageSchema } from "./chat.schema";
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
    const newChat = new this({
      _id: id,
      sessionId: id.toHexString(),
      userId,
      courseId,
      sectionId,
      attachmentId,
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
    return this.findOne({ userId });
  }

  public static async addMessage(
    this: ReturnModelType<typeof ChatSchema>,
    chatId: string,
    message: MessageSchema,
  ) {
    return this.updateOne({ _id: chatId }, { $push: { messages: message } });
  }
}

const ChatModel = getModelForClass(ChatMethods, {
  options: {
    customName: "Chat",
  },
});

export default ChatModel;
