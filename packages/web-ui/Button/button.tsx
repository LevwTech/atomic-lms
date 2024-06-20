import type { ComponentProps, CSSProperties } from "react";

type ButtonProps = ComponentProps<"button"> & {
  onPress: () => void;
  children: string;
  style?: CSSProperties;
};

export function Button({ onPress, children, style }: ButtonProps): JSX.Element {
  return (
    <button
      className="mt-[10px] p-[10px] rounded-[10px] text-white bg-[#11664f] text-[32px] font-[700] transition-all hover:bg-[#257962]"
      style={style}
      onClick={onPress}
      type="button"
    >
      {children}
    </button>
  );
}
