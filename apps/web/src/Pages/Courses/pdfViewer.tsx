import Announcements from "@atomic/web-ui/Announcements/Announcements";
import Sidebar from "@atomic/web-ui/SideBar/sideBar";
import Courses from "./Courses";
import ReactLoading from "react-loading";
import { useQuery } from "@tanstack/react-query";
import { USER_TYPES, useUserStore } from "../../store/user.store";
import { useParams } from "react-router-dom";

function PdfViewerPage() {
  const user = useUserStore();
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
      <div className=" h-full w-full rounded-[13.6px] relative bg-[#f9f9f9]"></div>
      {/* <div className="bg-[var(--White)] h-full w-[30vw] rounded-[13.6px]">
        <Announcements />
      </div> */}
    </div>
  );
}

export default PdfViewerPage;
