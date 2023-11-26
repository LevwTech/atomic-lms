import { Carousal, LoginForm } from "@atomic/web-ui";

function App() {
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

  return (
    <div className="flex items-center justify-end h-screen bg-[#EFF2FB]">
      <img
        src="./logo-banner.svg"
        className="absolute top-0 left-[7.5%] w-16 "
      />
      {/* <img src="./LogoBackground.svg" alt="" className=" z-100" /> */}
      <LoginForm logo="./BUE_Logo.svg" />
      <div className="w-[50%] h-full py-[70px] pr-[70px]">
        <Carousal images={images} />
      </div>
    </div>
  );
}

export default App;
