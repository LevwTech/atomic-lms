import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  onPress: () => void;
  children: string;
};

export function Button({ onPress, children }: ButtonProps): JSX.Element {
  return (
    <button
      className="mt-[10px] p-[10px] rounded-[10px] h-[95px] text-white bg-[#11664f] text-[32px] font-[700] transition-all hover:bg-[#257962]"
      onClick={onPress}
      type="button"
    >
      {children}
    </button>
  );
}
