import * as React from "react";
import styles from "./formInput.module.css";
import { ComponentProps } from "react";

type TextInputProps = ComponentProps<"input"> & {
  type: string;
  label: string;
  value: string;
  onChange: (e: Event) => void;
  id?: string;
};

export function TextInput({
  type,
  label,
  value,
  onChange,
  id,
}: TextInputProps) {
  const generateId = React.useId();
  const appliedId = id || generateId;
  return (
    <>
      <label className={styles.label} htmlFor={appliedId}>
        {label}
      </label>
      <input
        className={styles.textInput}
        id={appliedId}
        type={type}
        value={value}
        onChange={onChange}
      />
    </>
  );
}
