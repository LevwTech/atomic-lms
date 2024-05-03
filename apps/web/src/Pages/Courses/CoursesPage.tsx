import Announcements from "@atomic/web-ui/Announcements/Announcements";
import Sidebar from "@atomic/web-ui/SideBar/sideBar";
import Courses from "./Courses";
import ModuleContent from "@atomic/web-ui/ModuleContent/ModuleContent";
function CoursesPage() {
  return (
    <div className="h-screen p-[40px] flex justify-between gap-[40px]">
      <Sidebar
        primaryLogo="./BUE_Logo.svg"
        secondaryLogo="./miniUniLogo.svg"
        user={{ name: "Abdelrahman", id: "Abdelrahman192222" }}
      />
      <div className=" h-full w-[55vw]  rounded-[13.6px] relative">
        <Courses />
      </div>
      <div className="bg-[var(--White)] h-full w-[30vw] rounded-[13.6px]">
        <Announcements />
      </div>
    </div>
  );
}

export default CoursesPage;
