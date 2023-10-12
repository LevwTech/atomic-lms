import * as React from 'react';

interface CountLogicProps {
  children: (
    count: number,
    increment: () => void,
    decrement: () => void
  ) => JSX.Element;
}

export const CountLogic: React.FC<CountLogicProps> = ({ children }) => {
  const [count, setCount] = React.useState(0);

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };

  return children(count, increment, decrement);
};
