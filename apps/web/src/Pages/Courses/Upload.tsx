// import React from 'react'
// Import the logo image
import { useState } from "react";
import { SectionsHeader } from "@atomic/web-ui"; // Import the SectionsHeader component

export default function Upload() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="h-screen p-[30px] flex justify-between gap-[30px]">
      <div className="h-full w-[50vw] rounded-[14px] items-center justify-between flex flex-col bg-white p-[30px]">
        <SectionsHeader sectionName={"Upload"} />
      </div>
      <div className="bg-[var(--White)] h-full w-[30vw] rounded-[14px]"> </div>
    </div>
  );
}
