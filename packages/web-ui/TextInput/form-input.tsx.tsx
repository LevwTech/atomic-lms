import type { ComponentProps } from "react";
import * as React from "react";
import styles from "./formInput.module.css";

type TextInputProps = ComponentProps<"input"> & {
  type: string;
  label: string;
  value: string;
  onChange: (e: Event) => void;
  id?: string;
  forgetPassword?: boolean;
};

export function FormInput({
  type,
  label,
  value,
  onChange,
  id,
  forgetPassword,
}: TextInputProps): JSX.Element {
  const generateId = React.useId();
  const appliedId = id || generateId;
  return (
    <>
      {forgetPassword ? (
        <div className="flex w-full justify-between items-center">
          <label className={styles.label} htmlFor={appliedId}>
            {label}
          </label>
          <p className={`${styles.label} text-[#3F7BF0]`}>Forgot Password?</p>
        </div>
      ) : (
        <label className={styles.label} htmlFor={appliedId}>
          {label}
        </label>
      )}

      <input
        className={styles.textInput}
        id={appliedId}
        onChange={onChange}
        type={type}
        value={value}
      />
    </>
  );
}
