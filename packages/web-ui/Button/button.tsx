import type { ComponentProps } from "react";
import styles from "./button.module.css";

type ButtonProps = ComponentProps<"button"> & {
  onPress: () => void;
  children: string;
};

export function Button({ onPress, children }: ButtonProps): JSX.Element {
  return (
    <button className={`${styles.button}`} onClick={onPress} type="button">
      {children}
    </button>
  );
}
