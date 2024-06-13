import Announcements from "@atomic/web-ui/Announcements/Announcements";
import Sidebar from "@atomic/web-ui/SideBar/sideBar";
import Courses from "./Courses";
import ReactLoading from "react-loading";
import { useQuery } from "@tanstack/react-query";

function CoursesPage() {
  const { isLoading, data: courses } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch(`http://localhost:3000/course/course?option=ENROLLED`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
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
      <div className=" h-full w-[55vw]  rounded-[13.6px] relative">
        <Courses courses={courses} />
      </div>
      <div className="bg-[var(--White)] h-full w-[30vw] rounded-[13.6px]">
        <Announcements />
      </div>
    </div>
  );
}

export default CoursesPage;
