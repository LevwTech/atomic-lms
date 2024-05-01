import Announcements from "@atomic/web-ui/Announcements/Announcements";
import Sidebar from "@atomic/web-ui/SideBar/sideBar";
import ModuleContent from "@atomic/web-ui/ModuleContent/ModuleContent";
function ModuleContentPage() {
  return (
    <div className="h-screen p-[40px] flex justify-between gap-[40px]">
      <Sidebar
        primaryLogo="/BUE_Logo.svg"
        secondaryLogo="/miniUniLogo.svg"
        user={{ name: "Abdelrahman", id: "Abdelrahman192222" }}
      />
      <div className=" h-full w-[55vw] bg-[var(--White)]  rounded-[13.6px] ">
        <ModuleContent />
      </div>
      <div className="bg-[var(--White)] h-full w-[30vw] rounded-[13.6px]">
        <Announcements />
      </div>
    </div>
  );
}

export default ModuleContentPage;
