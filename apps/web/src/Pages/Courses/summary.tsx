import Sidebar from "@atomic/web-ui/SideBar/sideBar";
import ReactLoading from "react-loading";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import Markdown from "react-markdown";
import { useEffect } from "react";

function SummaryPage() {
  const { courseId, sectionId, attachmentId } = useParams();

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

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen p-[40px] flex justify-center items-center gap-[40px]">
        <ReactLoading type="spinningBubbles" color="#11664F" />
      </div>
    );
  }

  return (
    <div className="h-screen p-[40px] flex justify-between gap-[40px]">
      <Sidebar
        primaryLogo="./BUE_Logo.svg"
        secondaryLogo="./miniUniLogo.svg"
        user={{ name: "Abdelrahman", id: "Abdelrahman192222" }}
      />
      <div
        className="h-full w-[85vw] rounded-[14px] flex bg-[#f9f9f9] overflow-auto py-10 px-40 "
        id="scrollableDiv"
      >
        <Markdown
          remarkPlugins={[remarkGfm, remarkSlug]}
          className="prose m-0 pb-10"
        >
          {attachment.summary}
        </Markdown>
      </div>
    </div>
  );
}

export default SummaryPage;
