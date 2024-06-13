import Announcements from "@atomic/web-ui/Announcements/Announcements";
import Sidebar from "@atomic/web-ui/SideBar/sideBar";
import ModuleContent from "@atomic/web-ui/ModuleContent/ModuleContent";
import ReactLoading from "react-loading";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ModuleContentPage() {
  const { courseId, sectionId: sId } = useParams();

  const [sectionId, setSectionId] = useState(sId!);

  useEffect(() => {
    const newUrl = `/courses/${courseId}/${sectionId}`;
    window.history.pushState(null, "", newUrl);
    refetch();
  }, [sectionId]);

  const {
    isLoading,
    data: sectionData,
    refetch,
  } = useQuery({
    queryKey: ["users", courseId, sectionId],
    queryFn: () =>
      fetch(
        `http://localhost:3000/course-marerial/${courseId}/section/${sectionId}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      ).then((res) => res.json()),
  });

  const { isLoading: isLoadingSections, data: courseContent } = useQuery({
    queryKey: ["users", { id: courseId }],
    queryFn: () =>
      fetch(`http://localhost:3000/course-marerial/${courseId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  const changeSection = (sectionTitle: string) => {
    const section = courseContent.material.sections.find(
      (section: any) => section.title === sectionTitle,
    )?._id;

    console.log(section);

    setSectionId(section);
  };

  if (isLoading || isLoadingSections) {
    return (
      <div className="h-screen p-[40px] flex justify-center items-center gap-[40px]">
        <ReactLoading type="spinningBubbles" color="#11664F" />
      </div>
    );
  }
  return (
    <div className="h-screen p-[40px] flex justify-between gap-[40px]">
      <Sidebar
        primaryLogo="/BUE_Logo.svg"
        secondaryLogo="/miniUniLogo.svg"
        user={{ name: "Abdelrahman", id: "Abdelrahman192222" }}
      />
      <div className=" h-full w-[55vw] bg-[var(--White)]  rounded-[13.6px] ">
        <ModuleContent
          type={sectionData.title}
          files={sectionData.content}
          changeSection={changeSection}
        />
      </div>
      <div className="bg-[var(--White)] h-full w-[30vw] rounded-[13.6px]">
        <Announcements />
      </div>
    </div>
  );
}

export default ModuleContentPage;
