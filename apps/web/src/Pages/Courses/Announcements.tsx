import { SectionsHeader } from "@atomic/web-ui"; // Import the SectionsHeader component
import { AnnouncementsGrid } from "@atomic/web-ui"; // Import the AnnouncementsGrid component

export default function Announcements() {
  return (
    <div className="h-screen p-[30px] flex justify-between gap-[30px]">
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