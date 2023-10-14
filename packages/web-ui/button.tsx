import * as React from "react";

interface ButtonProps {
  style?: React.CSSProperties;
  onPress: () => void;
  title: string;
}

export function Button({ style, onPress, title }: ButtonProps): JSX.Element {
  return (
    <button style={style} onClick={onPress} type="button">
      {title}
    </button>
  );
}
