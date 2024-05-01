import { SectionsHeader } from "@atomic/web-ui"; // Import the SectionsHeader component
import { AnnouncementsGrid } from "@atomic/web-ui"; // Import the AnnouncementsGrid component
import Sidebar from "@atomic/web-ui/SideBar/sideBar";
export default function Announcements() {
  return (
    <div className="h-screen p-[30px] flex gap-[30px]">
      <Sidebar
        primaryLogo="./BUE_Logo.svg"
        secondaryLogo="./miniUniLogo.svg"
        user={{ name: "Abdelrahman", id: "Abdelrahman192222" }}
      />
      <div className="h-full w-[80vw] rounded-[14px] flex flex-col bg-white p-[30px] gap-[25px] overflow-y-auto">
        <SectionsHeader
          icon={"/annoucment.svg"}
          sectionName={"ANNOUNCEMENTS"}
        />
        <AnnouncementsGrid />
      </div>
    </div>
  );
}
