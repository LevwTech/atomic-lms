// import React from 'react'
// Import the logo image
import { SectionsHeader } from "@atomic/web-ui"; // Import the SectionsHeader component
import { SingleCourseGrid } from "@atomic/web-ui"; // Import the SectionsHeader component
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

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
    <div className="h-screen p-[30px] flex justify-between gap-[30px]">
      <div className="h-full w-[50vw] rounded-[14px] items-center justify-between flex flex-col bg-white p-[30px]">
        <SectionsHeader sectionName={courseContent.course.name} />
        <SingleCourseGrid courseContent={courseContent.material.sections} />
      </div>
      <div className="bg-[var(--White)] h-full w-[30vw] rounded-[14px]"> </div>
    </div>
  );
}
