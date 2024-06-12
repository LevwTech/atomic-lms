import { SidebarItem } from "../SidebarItem/SidebarItem";
import styles from "./sideBar.module.css";
import { SidebarLogic } from "@atomic/frontend-logic/SidebarLogic";
import { Link } from "react-router-dom";
interface User {
  img?: string;
  name: string;
  id: string;
}

interface SideBarProps {
  primaryLogo: string;
  secondaryLogo: string;
  user: User;
}

const sidebarItems = [
  { href: "/courses", icon: "/Courses.svg", label: "Courses" },
  { href: "/schedule", icon: "/Schedule.svg", label: "Schedule" },
  { href: "/exams", icon: "/ExamTime.svg", label: "Exams Time Table" },
  { href: "/grades", icon: "/Grades.svg", label: "Grades" },
  { href: "/evaluation", icon: "/Evaluation.svg", label: "Evaluation" },
  { href: "/finance", icon: "/Financial.svg", label: "Finance" },
  { href: "/live", icon: "/Live.svg", label: "Live Sessions" },
];

function SideBar({ primaryLogo, secondaryLogo, user }: SideBarProps) {
  return (
    <SidebarLogic>
      {(isSidebarOpen, toggleSidebar) => (
        <div
          className={` ${
            isSidebarOpen ? "w-[15vw] p-[20px] " : "w-[5.5vw]  p-[10px]"
          } bg-[var(--White)] h-full relative rounded-[13.6px] duration-300 justify-between flex flex-col `}
        >
          <div className="mx-auto">
            <div
              className={
                isSidebarOpen
                  ? " mb-20 mt-4"
                  : "flex justify-center mb-20 mt-4  "
              }
            >
              <Link to="/">
                <img
                  className={
                    isSidebarOpen
                      ? `mx-2 ${styles.logo} ${styles.navLink}  `
                      : styles.navLink
                  }
                  src={isSidebarOpen ? primaryLogo : secondaryLogo}
                  alt="University Logo"
                />
              </Link>
            </div>
            {/* <img
          className={
            isSidebarOpen ? styles.logo : "flex justify-center mb-20 mt-4"
          }
          src={isSidebarOpen ? primaryLogo : secondaryLogo}
          alt="University Logo"
        /> */}
            <div>
              {sidebarItems.map((item, index) => (
                <SidebarItem
                  key={index}
                  to={item.href}
                  icon={item.icon}
                  label={item.label}
                  isSidebarOpen={isSidebarOpen}
                />
              ))}
            </div>

            <button
              className={`${styles.toggle_button} ${styles.hideOnSmallScreens}`}
              onClick={toggleSidebar}
            >
              <img
                className={` ${!isSidebarOpen && "rotate-180"} ${
                  styles.hideOnSmallScreens
                }`}
                src="/Switch.svg"
                alt="Switch button"
              />
            </button>
          </div>

          <div className="w-full">
            <div
              className={`flex items-center mb-3 w-full break-all ${
                !isSidebarOpen ? "justify-center" : ""
              }`}
            >
              <img
                className=" rounded-full w-[3vw] h-[3vw]"
                src={user.img ? user.img : "/DefaultPP.svg"}
                alt="User profile picture"
              />
              {isSidebarOpen && (
                <div className="ml-3 w-full">
                  <h4 className={styles.username}>{user.name}</h4>
                  <p className={styles.userID}>{user.id}</p>
                </div>
              )}
            </div>

            {isSidebarOpen ? (
              <button className={styles.custom_button}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="none"
                  className={styles.AIButton}
                  viewBox="0 0 200 60"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path d="M170.637 0H24.557A17.124 17.124 0 0 0 9.73 8.562L2.294 21.438a17.128 17.128 0 0 0 0 17.124l7.435 12.876A17.123 17.123 0 0 0 24.558 60h146.079a17.125 17.125 0 0 0 14.83-8.562l7.434-12.876a17.123 17.123 0 0 0 0-17.124l-7.434-12.876A17.127 17.127 0 0 0 170.637 0Z" />
                  <image
                    href="/Atomic Logo.svg"
                    x="10%"
                    y="25%"
                    width="50%"
                    height="50%"
                    className=""
                  />
                  <foreignObject x="20%" y="30%" width="150" height="40">
                    <p
                      style={{
                        color: "var(--White, #F9F9F9)",
                        fontFamily: "Poppins",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 700,
                        lineHeight: "normal",
                      }}
                    >
                      AI Bot
                    </p>
                  </foreignObject>
                </svg>
              </button>
            ) : (
              <button
                className={`rounded-full w-[3vw] h-[3vw] bg-[var(--Primary)] hover:bg-[#1919dd] ${styles.custom_button}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  className="mx-auto w-[1.5vw] h-[1.5vw]  object-contain"
                  src="/Atomic Logo.svg"
                  alt="AI button"
                />
              </button>
            )}
          </div>
        </div>
      )}
    </SidebarLogic>
  );
}

export default SideBar;
