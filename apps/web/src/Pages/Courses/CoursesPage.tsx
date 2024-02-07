// import React from 'react'
import styles from "./CoursesPage.module.css";
// Import the logo image
import { useState } from "react";
import  Sidebar  from "@atomic/web-ui/SideBar/sideBar"; // Import the sideBar component


function CoursesPage() {
  const [isSidebarOpen,toggleSidebar] = useState(true);
  return (
    <>
      <Sidebar logo="./BUE_Logo.svg" isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}  /> 
    </>
  )
}

export default CoursesPage
