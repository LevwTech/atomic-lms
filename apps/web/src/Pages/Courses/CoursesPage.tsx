import Announcements from "@atomic/web-ui/Announcements/Announcements";
import { SidebarLogic } from "@atomic/frontend-logic/SidebarLogic";
import Sidebar from "@atomic/web-ui/SideBar/sideBar";
import Courses from "./Courses";
import ModuleContent from "@atomic/web-ui/ModuleContent/ModuleContent";
function CoursesPage() {
  return (
    <SidebarLogic>
      {(isSidebarOpen, toggleSidebar) => (
        <div className="h-screen p-[40px] flex justify-between gap-[40px]">
          <Sidebar
            primaryLogo="./BUE_Logo.svg"
            secondaryLogo="./miniUniLogo.svg"
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            user={{ name: "Abdelrahman", id: "Abdelrahman192222" }}
          />
          <div className="bg-[var(--White)] h-full w-[55vw] px-[20px] rounded-[13.6px] relative">
            <ModuleContent />
          </div>
          <div className="bg-[var(--White)] h-full w-[30vw] rounded-[13.6px]">
            <Announcements />
          </div>
        </div>
      )}
    </SidebarLogic>
  );
}

export default CoursesPage;
