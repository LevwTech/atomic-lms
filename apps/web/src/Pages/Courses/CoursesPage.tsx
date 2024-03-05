import styles from "./CoursesPage.module.css";
import { useState, useEffect } from "react"; // Import useEffect
import Sidebar from "@atomic/web-ui/SideBar/sideBar"; // Import the sideBar component

function CoursesPage() {
 // Adjust the initial state based on window's width
 const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1200);

 // Adjust the toggleSidebar function to consider window's width
 const toggleSidebar = () => {
    if (window.innerWidth >= 1200) {
      setIsSidebarOpen((prevState) => !prevState);
    } else {
      setIsSidebarOpen(false);
    }
 };

 // Add a useEffect hook to handle window resize
 useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1200);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
 }, []); // Empty dependency array to run only once on mount

 return (
    <div className="h-screen p-[40px] flex justify-between gap-[40px]">
      <Sidebar
        primaryLogo="./BUE_Logo.svg"
        secondaryLogo="./miniUniLogo.svg"
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        user={{ name: "Abdelrahman", id: "Abdelrahman192222" }}
      />
      <div className="bg-[var(--White)] h-full w-[55vw] rounded-[13.6px]">
        {" "}
      </div>
      <div className="bg-[var(--White)] h-full w-[30vw] rounded-[13.6px]">
        {" "}
      </div>
    </div>
 );
}

export default CoursesPage;
