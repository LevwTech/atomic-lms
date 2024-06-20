import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";

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
    <div className="flex gap-3 w-[90%]">
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
  goToCitation: (pageNumber: number) => void;
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
              onClick={() => goToCitation(citation.pageNumber)}
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
  goToCitation: (pageNumber: number) => void;
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
    <div className="flex flex-col gap-2 items-center">
      <img src="/chatbotLogo.svg" className="w-36" />
      <p className="font-bold text-4xl">Hey there! I'm Atomic.</p>
      <p className="font-normal text-xl text-center w-[70%]">
        Simplify your college studies with summaries, notes, and assignment
        guidance.
      </p>
    </div>
  );
}

type Props = {
  courseId: string;
  sectionId: string;
  attachmentId: string;
  scrollToPage: (pageNumber: number) => void;
};

function FileChatBot({
  courseId,
  sectionId,
  attachmentId,
  scrollToPage,
}: Props) {
  const searchParams = new URLSearchParams(window.location.search);

  const [inputValue, setInputValue] = useState("");
  const [chatId, setChatId] = useState<string | null>(
    searchParams.get("chatId") || "",
  );
  const [messages, setMessages] = useState<message[]>([]);
  const [chatTitle, setChatTitle] = useState<string>("");
  const [sendingMessage, setSendingMessage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const goToCitation = (pageNumber: number) => {
    scrollToPage(pageNumber);
  };

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
            sectionId: sectionId,
            attachmentId: attachmentId,
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

  const handleChangeChat = async (newChatId: string) => {
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

  useEffect(() => {
    if (chatId) {
      handleChangeChat(chatId);
    }
  }, []);

  useEffect(() => {
    const newUrl = chatId
      ? `${window.location.pathname}?chatId=${chatId}`
      : window.location.pathname;
    window.history.pushState({}, "", newUrl);
  }, [chatId]);

  return (
    <div className="h-full w-[39vw] rounded-[14px] pt-10 items-center justify-center flex flex-col bg-[#f9f9f9]  gap-[30px] relative">
      <div className="absolute top-0 left-0 rounded-t-[14px] w-full h-14 bg-white flex items-center justify-center px-8">
        <p className="font-semibold text-lg">
          {chatTitle || "Chat With Atomic"}
        </p>
      </div>
      {chatId && messages.length > 0 ? (
        <ChatHistory
          loading={sendingMessage}
          messages={messages}
          goToCitation={goToCitation}
        />
      ) : (
        <EmptyChat />
      )}
      <div className="absolute flex flex-col bottom-4 left-1/2 transform border rounded-[10px] w-[95%] -translate-x-1/2 bg-white border-[#11664F]">
        <div className="flex">
          <textarea
            placeholder="Ask me anything you want..."
            className="w-[93%] p-[10px] focus:ring-transparent border-none bg-transparent resize-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="w-[7%] group flex items-center justify-center"
            onClick={handleSendMessage}
            disabled={sendingMessage}
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
  );
}

export default FileChatBot;
