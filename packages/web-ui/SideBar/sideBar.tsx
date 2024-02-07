import styles from "./sideBar.module.css";
import { NavLink, useLocation } from "react-router-dom";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
function SideBar({ logo, isSidebarOpen, toggleSidebar, usr }: any) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  return (
    <div
      className={`${styles.sidebar} ${isSidebarOpen ? "" : styles.collapsed}`}
    >
      <div>
        <img className={styles.logo} src={logo} alt="University Logo" />
        <ul>
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              isActive ? styles.navLink__active : styles.navLink
            }
          >
            <li className="flex items-center">
              <img
                className={isActive("/courses") ? "" : styles.sidebar__logos}
                src="./Courses.svg"
                alt=""
              />
              Courses
            </li>
          </NavLink>
          <NavLink
            to="/schedule"
            className={({ isActive }) =>
              isActive ? styles.navLink__active : styles.navLink
            }
          >
            <li className="flex items-center">
              <img
                className={isActive("/schedule") ? "" : styles.sidebar__logos}
                src="./Courses.svg"
                alt=""
              />
              Schedule
            </li>
          </NavLink>
          <NavLink
            to="/exams"
            className={({ isActive }) =>
              isActive ? styles.navLink__active : styles.navLink
            }
          >
            <li className="flex items-center">
              <img
                className={isActive("/exams") ? "" : styles.sidebar__logos}
                src="./Courses.svg"
                alt=""
              />
              Exams Time Table
            </li>
          </NavLink>
          <NavLink
            to="/grades"
            className={({ isActive }) =>
              isActive ? styles.navLink__active : styles.navLink
            }
          >
            <li className="flex items-center">
              <img
                className={isActive("/grades") ? "" : styles.sidebar__logos}
                src="./Courses.svg"
                alt=""
              />
              Grades
            </li>
          </NavLink>
          <NavLink
            to="/evaluation"
            className={({ isActive }) =>
              isActive ? styles.navLink__active : styles.navLink
            }
          >
            <li className="flex items-center">
              <img
                className={isActive("/evaluation") ? "" : styles.sidebar__logos}
                src="./Courses.svg"
                alt=""
              />
              Evaluation
            </li>
          </NavLink>
          <NavLink
            to="/finance"
            className={({ isActive }) =>
              isActive ? styles.navLink__active : styles.navLink
            }
          >
            <li className="flex items-center">
              <img
                className={isActive("/finance") ? "" : styles.sidebar__logos}
                src="./Courses.svg"
                alt=""
              />
              Finance
            </li>
          </NavLink>
          <NavLink
            to="/live"
            className={({ isActive }) =>
              isActive ? styles.navLink__active : styles.navLink
            }
          >
            <li className="flex items-center">
              <img
                className={isActive("/live") ? "" : styles.sidebar__logos}
                src="./Courses.svg"
                alt=""
              />
              Live Session
            </li>
          </NavLink>
        </ul>

        {/* <button onClick={toggleSidebar}>
                 {isSidebarOpen ? 'Collapse' : 'Extend'}
                </button> */}
      </div>
      <div>
        <div className="flex items-center mb-10">
          <img
            src={usr?.img ? usr.img : "./DefaultPP.svg"}
            alt="User profile picture"
          />
          {/* <Avatar>
            <AvatarImage src="./DefaultPP.svg" />
            <AvatarFallback>{usr[0] || ""}</AvatarFallback>
          </Avatar> */}
          <div className="ml-3">
            <h4 className={styles.username}>Abdelrahman</h4>
            <p className={styles.userID}>Abdelrahman192646</p>
          </div>
        </div>
        <button className={styles.custom_button}>
          <img
            className="mx-auto w-full"
            src="./AI Button.svg"
            alt="AI button"
          />
        </button>
      </div>
    </div>
  );
}

export default SideBar;
