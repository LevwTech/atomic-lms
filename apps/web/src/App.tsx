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
      <LoginForm />
      <Carousal images={images} />
    </div>
  );
}

export default App;
