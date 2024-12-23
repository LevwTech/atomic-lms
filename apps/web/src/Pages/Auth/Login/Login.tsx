import { Carousal } from "@atomic/web-ui";
import styles from "./Login.module.css";
import { LoginForm } from "../../../components/forms/LoginForm";
import { useNavigate } from "react-router-dom";
import React from "react";
function LoginPage() {
  const images = [
    {
      src: "./BUE.jpg",
      alt: "image1",
    },
    {
      src: "./BUE2.jpg",
      alt: "image2",
    },
    {
      src: "./BUE3.jpg",
      alt: "image3",
    },
  ];

  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/courses");
    }
  }, [navigate]);

  return (
    <div className={styles.LoginPage}>
      <img
        src="./logo-banner.svg"
        className="absolute top-0 left-[7.5%] w-16 "
      />

      <LoginForm logo="./BUE_Logo.svg" />
      <div className="w-[50%] h-full py-[70px] pr-[70px]">
        <Carousal images={images} />
      </div>
    </div>
  );
}

export default LoginPage;
