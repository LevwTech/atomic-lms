import * as React from "react";

interface CarousalLogicProps {
  children: (
    current: number,
    setCurrent: (value: number) => void,
  ) => JSX.Element;
  imagesLength: number;
  autoScrollDuration?: number;
}

export const CarousalLogic: React.FC<CarousalLogicProps> = ({
  children,
  imagesLength,
  autoScrollDuration,
}) => {
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(current === imagesLength - 1 ? 0 : current + 1);
    }, autoScrollDuration);
    return () => {
      clearInterval(interval);
    };
  }, [current, imagesLength, autoScrollDuration]);

  return children(current, setCurrent);
};
