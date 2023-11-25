import * as React from "react";
import styles from "./button.module.css";
import { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> &{
  onPress: () => void;
  title: string;
};


export function Button({ onPress, title }: ButtonProps): JSX.Element {
  return (
    <button className={styles.button} onClick={onPress} type="button">
      {title}
    </button>
  );
}
