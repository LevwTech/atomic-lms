import React from "react";
import { NavLink, NavLinkProps, useLocation } from "react-router-dom";
import styles from "./SidebarItem.module.css";

interface SidebarItemProps extends NavLinkProps {
  icon: string;
  label: string;
  isSidebarOpen: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  to,
  icon,
  label,
  isSidebarOpen,
  ...props
}) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || location.pathname.includes(path);
  

  console.log(isActive(to.toString()));
  return (
    <div className="m-[5px] p-[2px]">
      <NavLink
        to={to}
        className={({ isActive }) =>
          ` mb-2 ${isActive ? styles.navLink__active : styles.navLink} ${
            isSidebarOpen ? "pr-2" : "justify-center aspect-square"
          }`
        }
        {...props}
      >
        <li className="flex items-center ">
          <img
            className={isActive(to.toString()) ? "" : styles.sidebar__logos}
            src={icon}
            alt={label}
          />
          <p
            className={
              isActive(to.toString())
                ? styles.NavLinkLabelSelected
                : `${styles.NavLinkLabel} `
            }
          >
            {isSidebarOpen ? label : ""}
          </p>
        </li>
      </NavLink>
    </div>
  );
};
