// import React from 'react'
// Import the logo image
import { SectionsHeader } from "@atomic/web-ui"; // Import the SectionsHeader component
import { SingleCourseGrid } from "@atomic/web-ui"; // Import the SectionsHeader component
import { useQuery } from "@tanstack/react-query";
import Announcements from "@atomic/web-ui/Announcements/Announcements";
import SideBar from "@atomic/web-ui/SideBar/sideBar";
import { useParams } from "react-router-dom";
// import Sidebar from "@atomic/web-ui/SideBar/sideBar";
export default function SingleCoursePage() {
  const { id } = useParams();

  const { isLoading, data: courseContent } = useQuery({
    queryKey: ["users", { id }],
    queryFn: () =>
      fetch(`http://localhost:3000/course-marerial/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen p-[40px] flex justify-between gap-[40px]">
      <SideBar
        primaryLogo="/BUE_Logo.svg"
        secondaryLogo="/miniUniLogo.svg"
        user={{ name: "Abdelrahman", id: "Abdelrahman192222" }}
      />
      {/* <div className=" h-full w-[55vw]  rounded-[13.6px] relative"></div> */}
      <div className="h-full w-[50vw] rounded-[14px] items-center justify-between flex flex-col bg-white p-[30px]">
        <SectionsHeader sectionName={courseContent.course.name} />
        <SingleCourseGrid courseContent={courseContent.material.sections} />
      </div>
      <div className="bg-[var(--White)] h-full w-[30vw] rounded-[14px]">
        <Announcements />
      </div>
    </div>
  );
}
