import * as React from 'react';

interface ButtonProps {
  onPress: () => void;
  title: string;
}

export function Button({ onPress, title }: ButtonProps): JSX.Element {
  return (
    <button onClick={onPress} type="button">
      {title}
    </button>
  );
}
