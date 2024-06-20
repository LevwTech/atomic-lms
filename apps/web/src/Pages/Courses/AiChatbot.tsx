import SideBar from "@atomic/web-ui/SideBar/sideBar";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { USER_TYPES, useUserStore } from "../../store/user.store";
import ReactLoading from "react-loading";
import Markdown from "react-markdown";
import { useNavigate } from "react-router-dom";

type message =
  | {
      type: "human";
      _id: string;
      data: {
        content: string;
      };
    }
  | {
      type: "ai";
      _id: string;
      data: {
        content: string;
        additional_kwargs: {
          citations: {
            fileName: string;
            pageNumber: number;
            sectionId: string;
            courseId: string;
            attachmentId: string;
          }[];
        };
      };
    };

function SentMessage({ message }: { message: message }) {
  return (
    <div className="flex gap-3 w-[80%]">
      <img
        src="/DefaultPP.svg"
        className="w-10 h-10 rounded-full border border-[#E4E4E7] mix-blend-multiply"
      />
      <div className="rounded-lg bg-transparent p-4 border border-[#E4E4E7]">
        {message.data.content}
      </div>
    </div>
  );
}
function ReceivedMessage({
  message,
  goToCitation,
}: {
  message: message;
  goToCitation: (
    courseId: string,
    sectionId: string,
    attachmentId: string,
    pageNumber: number,
  ) => void;
}) {
  if (message.type === "human") return;

  return (
    <div className="flex gap-3 w-[90%]">
      <img src="/chatbotLogo.svg" className="w-10 h-10 rounded-full" />
      <div className="rounded-lg bg-white p-4 border border-[#E4E4E7]">
        <Markdown className="prose m-0 pb-0">{message.data.content}</Markdown>
        <div className="flex gap-4 flex-wrap pt-3">
          {message.data.additional_kwargs.citations.map((citation, index) => (
            <div
              key={index}
              className="flex gap-3 cursor-pointer bg-[#B7ED3F] border border-[#11664F] rounded px-2 py-1"
              onClick={() =>
                goToCitation(
                  citation.courseId,
                  citation.sectionId,
                  citation.attachmentId,
                  citation.pageNumber,
                )
              }
            >
              <img src="/citation.svg" />
              <p className="text-[#11664F]">
                {citation.fileName} - P.{citation.pageNumber}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatHistory({
  messages,
  loading,
  goToCitation,
}: {
  messages: message[];
  loading: boolean;
  goToCitation: (
    courseId: string,
    sectionId: string,
    attachmentId: string,
    pageNumber: number,
  ) => void;
}) {
  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full w-full gap-8 py-10 overflow-y-auto pl-8 pb-36">
      {messages.map((message, index) =>
        message.type === "human" ? (
          <SentMessage message={message} />
        ) : (
          <ReceivedMessage message={message} goToCitation={goToCitation} />
        ),
      )}
      {loading && (
        <ReceivedMessage
          goToCitation={goToCitation}
          message={{
            type: "ai",
            _id: "loading",
            data: { content: "...", additional_kwargs: { citations: [] } },
          }}
        />
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

function EmptyChat() {
  return (
    <>
      <img src="/chatbotLogo.svg" />
      <p className="font-bold text-5xl">Hey there! I'm Atomic.</p>
      <p className="font-normal text-2xl text-center w-[70%]">
        Simplify your college studies with summaries, notes, and assignment
        guidance.
      </p>
    </>
  );
}

function OldChat({
  title,
  selected = false,
}: {
  title: string;
  selected?: boolean;
}) {
  return (
    <div
      className={`flex items-center w-full border border-[#E4E4E7] rounded-lg px-4 py-2 ${selected && "bg-[#0000001c]"}`}
    >
      <p className="font-bold">{title || "Untitled Chat"}</p>
    </div>
  );
}

function Chatbot() {
  const searchParams = new URLSearchParams(window.location.search);

  const [inputValue, setInputValue] = useState("");
  const [chatId, setChatId] = useState<string | null>(
    searchParams.get("chatId") || "",
  );
  const [messages, setMessages] = useState<message[]>([]);
  const [courseId, setCourseId] = useState<string>("");
  const [chatTitle, setChatTitle] = useState<string>("");
  const [sendingMessage, setSendingMessage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const user = useUserStore();

  const { isLoading: isLoadingCourses, data: courses } = useQuery({
    queryKey: ["courses"],
    queryFn: () =>
      fetch(
        `http://localhost:3000/course/${user.type === USER_TYPES.STUDENT ? "course" : "course-teacher"}?option=ENROLLED`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      ).then((res) => res.json()),
  });

  const { isLoading: isLoadingHistory, data: oldChats } = useQuery({
    queryKey: ["oldChats"],
    queryFn: () =>
      fetch(`http://localhost:3000/ai/chat/history`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  useEffect(() => {
    if (!courseId) {
      setCourseId(courses?.courses[0].id);
    }
  }, [courses]);

  useEffect(() => {
    const newUrl = chatId
      ? `${window.location.pathname}?chatId=${chatId}`
      : window.location.pathname;
    window.history.pushState({}, "", newUrl);
  }, [chatId]);

  useEffect(() => {
    console.log(chatId);
    if (chatId) {
      handleChangeChat(chatId, true);
    }
  }, []);

  const handleSendMessage = async () => {
    if (inputValue.length === 0) return;
    setSendingMessage(true);
    let currentChatId = chatId;
    let currentMessage = inputValue;

    if (!currentChatId) {
      const { chatId: newChatId } = await fetch(
        `http://localhost:3000/ai/chat/create`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId: courseId,
          }),
        },
      ).then((res) => res.json());
      currentChatId = newChatId;
      setChatId(newChatId);
      searchParams.set("chatId", newChatId);
    }

    setMessages((prev) => {
      const newMessage: message = {
        type: "human",
        _id: Date.now().toString(),
        data: {
          content: currentMessage,
        },
      };
      return [...prev, newMessage];
    });

    const res = await fetch(`http://localhost:3000/ai/chat`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId: currentChatId,
        message: currentMessage,
      }),
    }).then((res) => res.json());

    setMessages((perv) => {
      const newMessage: message = {
        type: "ai",
        _id: Date.now().toString(),
        data: {
          content: res.answer,
          additional_kwargs: {
            citations: res.citations,
          },
        },
      };
      return [...perv, newMessage];
    });

    setInputValue("");
    setChatTitle(res.newChatTitle);
    setSendingMessage(false);
  };

  const handleChangeChat = async (newChatId: string, force?: boolean) => {
    if (chatId === newChatId && !force) return;
    setLoading(true);
    setChatId(newChatId);
    searchParams.set("chatId", newChatId);
    const res = await fetch(`http://localhost:3000/ai/chat/${newChatId}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json());
    setMessages(res.messages);
    setChatTitle(res.title);
    setLoading(false);
  };

  const handleNewChat = () => {
    setChatId(null);
    setMessages([]);
    setChatTitle("");
    searchParams.delete("chatId");
  };

  const navigate = useNavigate();

  const gotToCitiation = (
    courseId: string,
    sectionId: string,
    attachmentId: string,
    pageNumber: number,
  ) => {
    navigate(
      `/courses/${courseId}/${sectionId}/${attachmentId}/pdf?page=${pageNumber}`,
    );
  };

  if (isLoadingCourses || isLoadingHistory) {
    return (
      <div className="h-screen p-[40px] flex justify-center items-center gap-[40px]">
        <ReactLoading type="spinningBubbles" color="#11664F" />
      </div>
    );
  }

  return (
    <div className=" h-full flex flex-col w-[85vw] bg-[var(--White)] rounded-[13.6px] ">
      <div className="flex items-center h-[10%] border-b">
        <div className="flex justify-between items-center px-[20px] border-r h-full w-[75%] bg-[#f5f5f5]">
          <p className="text-[20px] font-medium">
            {chatTitle || "Chat with Atomic"}
          </p>
          {!chatId && (
            <select
              className={`rounded py-[5px] cursor-pointer`}
              id="type"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
            >
              {courses?.courses.map((course: any) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="flex justify-between items-center w-[25%] px-[20px]">
          <p className="text-[20px] font-medium">Rooms</p>
        </div>
      </div>
      <div className="flex h-[90%]">
        <div className="items-center flex-col relative flex justify-center h-full gap-6 border-r w-[75%] bg-[#f5f5f5]">
          {loading ? (
            <ReactLoading type="spinningBubbles" color="#11664F" />
          ) : chatId && messages.length > 0 ? (
            <ChatHistory
              messages={messages}
              loading={sendingMessage}
              goToCitation={gotToCitiation}
            />
          ) : (
            <EmptyChat />
          )}
          <div className="absolute flex flex-col bottom-4 left-1/2 transform border rounded-[10px] w-[90%] -translate-x-1/2 bg-white border-[#FF3C7D]">
            <div className="flex">
              <textarea
                placeholder="Ask me anything you want..."
                className="w-[93%] p-[20px] focus:ring-transparent border-none bg-transparent resize-none"
                value={inputValue}
                onChange={(e) => handleChange(e)}
              />
              <button
                className="w-[7%] group flex items-center justify-center"
                onClick={handleSendMessage}
              >
                <img
                  className="group-hover:scale-125 transition-all"
                  src="/sendIcon.svg"
                />
              </button>
            </div>
            <div className="flex justify-between px-[20px] py-[10px] bg-[#f5f5f5] rounded-b-[10px] border ">
              <div className="flex items-center gap-1 font-medium">
                <img src="/attach.svg" />
                <p> Attach</p>
              </div>
              <p>{inputValue.length}/3000</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[25%] justify-between">
          <div className="flex flex-col w-full px-[10px] pt-6 gap-4">
            {oldChats.length > 0
              ? oldChats.map((chat: any, index) => (
                  <div
                    key={index}
                    className="cursor-pointer"
                    onClick={() => handleChangeChat(chat._id)}
                  >
                    <OldChat
                      title={chat.title}
                      selected={chatId === chat._id}
                    />
                  </div>
                ))
              : "no chat history"}
          </div>
          <div className="px-4 py-3 w-full flex border border-[#e4e4e7] rounded-b">
            <button
              className="bg-black flex items-center text-white px-4 py-4 justify-center gap-2 rounded w-full"
              onClick={handleNewChat}
            >
              <img src="/addIcon.svg" />
              New Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AiChatbot() {
  return (
    <div className="h-screen p-[40px] flex justify-between gap-[40px]">
      <SideBar
        primaryLogo="/BUE_Logo.svg"
        secondaryLogo="/miniUniLogo.svg"
        user={{ name: "Abdelrahman", id: "Abdelrahman192222" }}
      />
      <Chatbot />
    </div>
  );
}
