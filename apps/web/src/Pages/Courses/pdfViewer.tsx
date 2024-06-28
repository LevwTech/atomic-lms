import Sidebar from "@atomic/web-ui/SideBar/sideBar";
import ReactLoading from "react-loading";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Page, Document } from "react-pdf";
import React, { useEffect, useRef, useState } from "react";
import FileChatBot from "../../components/fileChatbot";
import AITutor from "../../components/aiTutor";
interface SelectionInfo {
  text: string;
  x: number;
  y: number;
}

function PdfViewerPage() {
  const { courseId, sectionId, attachmentId } = useParams();

  const searchParams = new URLSearchParams(window.location.search);

  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(5);
  const [scale, setScale] = useState<number>(1.0);
  const pageRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState<number>(1);
  const [progress, setProgress] = useState(0);
  const [chatBot, setChatBot] = useState(
    searchParams.get("chatId") ? true : false,
  );
  const [aiTutor, setAiTutor] = useState(
    searchParams.get("aiTutorId") ? true : false,
  );

  const [selectionInfo, setSelectionInfo] = useState<SelectionInfo | null>(
    null,
  );

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    pageRefs.current = Array.from(new Array(numPages), () =>
      React.createRef<HTMLDivElement>(),
    );
  }

  function scrollToPage(page: number) {
    console.log("page:", page);
    console.log("pageRefs", pageRefs);
    const pageRef = pageRefs.current[page - 1];
    console.log("pageRef", pageRef);
    if (pageRef.current) {
      console.log("pageRef.current", pageRef.current);
      console.log("here");
      console.log(pageRef.current.scrollIntoView);
      pageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  function handleScroll() {
    const container = containerRef.current;
    if (container) {
      const scrollTop = container.scrollTop;
      const clientHeight = container.clientHeight;
      const scrollHeight = container.scrollHeight;
      const pageHeight = scrollHeight / numPages;
      const newPageNumber = Math.min(
        numPages,
        Math.max(1, Math.ceil((scrollTop + clientHeight / 3) / pageHeight)),
      );
      if (newPageNumber !== pageNumber) {
        setPageNumber(newPageNumber);
        setInputValue(newPageNumber);
      }
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);
    setInputValue(value);
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const page = Math.min(Math.max(1, inputValue), numPages);
      setPageNumber(page);
      scrollToPage(page);
    }
  }

  const handleDownload = async () => {
    const response = await fetch(attachment.url);
    const contentLength = response.headers.get("content-length");
    const total = parseInt(contentLength!, 10);
    const reader = response!.body!.getReader();
    const chunks = [];
    let receivedLength = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      receivedLength += value.length;
      setProgress(Math.round((receivedLength / total) * 100));
    }

    const blob = new Blob(chunks);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = attachment.fileName;
    link.click();
  };

  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      const container = containerRef.current;

      if (
        container &&
        container.contains(range.commonAncestorContainer) &&
        selectedText
      ) {
        const rect = range.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        setSelectionInfo({
          text: selectedText,
          x: rect.left - containerRect.left + container.scrollLeft,
          y: rect.bottom - containerRect.top + container.scrollTop,
        });
      } else {
        setSelectionInfo(null);
      }
    }
  };

  const handleDocumentClick = (event: MouseEvent) => {
    const container = containerRef.current;
    if (container && !container.contains(event.target as Node)) {
      return;
    }
    handleMouseUp();
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      document.addEventListener("mouseup", handleDocumentClick);
      return () => {
        container.removeEventListener("scroll", handleScroll);
        document.removeEventListener("mouseup", handleDocumentClick);
      };
    }
  }, [numPages, pageNumber]);

  const { isLoading, data: attachment } = useQuery({
    queryKey: ["attachments", { courseId, sectionId, attachmentId }],
    queryFn: () =>
      fetch(
        `http://localhost:3000/course-marerial/${courseId}/section/${sectionId}/attachment/${attachmentId}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      ).then((res) => res.json()),
  });

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="h-screen p-[40px] flex justify-center items-center gap-[40px]">
        <ReactLoading type="spinningBubbles" color="#11664F" />
      </div>
    );
  }

  console.log("selectionInfo", selectionInfo);

  return (
    <div className="h-screen p-[40px] flex justify-between gap-[40px]">
      <Sidebar
        primaryLogo="./BUE_Logo.svg"
        secondaryLogo="./miniUniLogo.svg"
        user={{ name: "Abdelrahman", id: "Abdelrahman192222" }}
      />
      <div
        className={`h-full ${chatBot || aiTutor ? "w-[42vw]" : "w-[85vw]"} rounded-[14px] items-center flex flex-col bg-[#f9f9f9]  gap-[30px] relative`}
      >
        <div
          className={`w-full h-full relative rounded-[14px] overflow-scroll flex flex-col p-[30px] pb-20 items-center bg-[#f9f9f9] ${aiTutor ? "justify-center" : ""}`}
          ref={containerRef}
        >
          <Document
            file={
              attachment.url.startsWith("https")
                ? attachment.url
                : "https://" + attachment.url
            }
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <div className="flex flex-col w-full gap-[20px]">
              {!aiTutor &&
                Array.from(new Array(numPages), (_, index) => (
                  <div
                    key={`page_${index + 1}`}
                    className="shadow-md rounded"
                    ref={pageRefs.current[index]}
                  >
                    <Page
                      pageNumber={index + 1}
                      scale={scale}
                      onLoadSuccess={({ pageNumber }) => {
                        if (pageNumber === Number(searchParams.get("page"))) {
                          scrollToPage(pageNumber);
                        }
                      }}
                    />
                  </div>
                ))}
              {aiTutor && (
                <div className="shadow-md rounded">
                  <Page pageNumber={pageNumber} scale={scale} />
                </div>
              )}
            </div>
          </Document>
        </div>
        <div className="bg-white w-full h-16 rounded-b-[14px] absolute bottom-0 left-0 right-0 flex items-center px-4 justify-between border border-[#E4E4E7] z-50">
          <div className="flex gap-4 items-center">
            <div className="bg-[#EFF2FB] py-1 px-2 rounded-lg flex items-center gap-2">
              <input
                value={aiTutor ? pageNumber : inputValue}
                disabled={aiTutor}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                className="w-10 flex text-center border-none rounded h-8 text-sm p-0"
              />
              <p className="text-[#71717A] text-sm">/ {numPages}</p>
            </div>
            <button
              className="bg-[#EFF2FB] p-3 rounded-lg"
              onClick={() => setScale(scale - 0.2)}
            >
              <img src="/zoomout.svg" />
            </button>
            <button
              className="bg-[#EFF2FB] p-3 rounded-lg"
              onClick={() => setScale(scale + 0.2)}
            >
              <img src="/zoomin.svg" />
            </button>
          </div>
          <div className="flex gap-4 items-center">
            <button
              className="flex gap-2 px-4 py-2 bg-[#EFF2FB] rounded-lg items-center text-sm"
              onClick={handleDownload}
            >
              <img src="/downloadicon.svg" />
              {progress > 0 && progress + "%"}
            </button>
            {attachment.isSummarized && !chatBot && (
              <button
                className="flex gap-2 px-4 py-2 bg-[#EFF2FB] rounded-lg items-center text-sm"
                onClick={() =>
                  navigate(
                    `/courses/${courseId}/${sectionId}/${attachmentId}/summary`,
                  )
                }
              >
                <img src="/summary.svg" />
                Summary
              </button>
            )}
            {attachment.doesHaveFlashCards && !chatBot && (
              <button
                className="flex gap-2 px-4 py-2 bg-[#EFF2FB] rounded-lg items-center text-sm"
                onClick={() =>
                  navigate(
                    `/courses/${courseId}/${sectionId}/${attachmentId}/flashcards`,
                  )
                }
              >
                <img src="/flashcards.svg" />
                Flash Cards
              </button>
            )}
            {attachment.doesHaveChatBot && !chatBot && (
              <button
                className="flex gap-2 px-4 py-2 bg-[#EFF2FB] rounded-lg items-center text-sm"
                onClick={() => {
                  setAiTutor(!aiTutor);
                  setPageNumber(1);
                }}
              >
                <img src="/filechat.svg" />
                AI Tutor
              </button>
            )}
            {attachment.doesHaveChatBot && !aiTutor && (
              <button
                className="flex gap-2 px-4 py-2 bg-[#EFF2FB] rounded-lg items-center text-sm"
                onClick={() => setChatBot(!chatBot)}
              >
                <img src="/filechat.svg" />
                Chat with File
              </button>
            )}
          </div>
        </div>
      </div>
      {chatBot && (
        <FileChatBot
          courseId={courseId!}
          sectionId={sectionId!}
          attachmentId={attachmentId!}
          scrollToPage={scrollToPage}
          selectedText={selectionInfo ? selectionInfo.text : ""}
          setSelectedText={setSelectionInfo}
        />
      )}
      {aiTutor && (
        <AITutor
          courseId={courseId!}
          sectionId={sectionId!}
          attachmentId={attachmentId!}
          scrollToPage={setPageNumber}
        />
      )}
    </div>
  );
}

export default PdfViewerPage;
