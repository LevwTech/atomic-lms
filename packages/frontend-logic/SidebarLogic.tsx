import React, { useState, useEffect } from "react";

interface SidebarLogicProps {
 children: (isSidebarOpen: boolean, toggleSidebar: () => void) => JSX.Element;
}

export const SidebarLogic: React.FC<SidebarLogicProps> = ({ children }) => {
 const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1200);

 const toggleSidebar = () => {
    if (window.innerWidth >= 1200) {
      setIsSidebarOpen((prevState) => !prevState);
    } else {
      setIsSidebarOpen(false);
    }
 };

 useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1200);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
 }, []);

 return children(isSidebarOpen, toggleSidebar);
};