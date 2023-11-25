import * as React from "react";

interface CarousalLogicProps {
  children: (current: number) => JSX.Element;
  imagesLength: number;
}

export const CarousalLogic: React.FC<CarousalLogicProps> = ({
  children,
  imagesLength,
}) => {
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(current === imagesLength - 1 ? 0 : current + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [current, imagesLength]);

  return children(current);
};