import { memo } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  label: string;
  type?: "default" | "danger";
  className?: string;
  onClick: () => void;
}

const DEFAULT_STYLE = "text-neutral-100 font-medium";
const DANGER_STYLE = "text-red-500 font-semibold";

const Item = ({ label, type = "default", className, onClick }: Props) => {
  const typeStyle = type === "danger" ? DANGER_STYLE : DEFAULT_STYLE;

  return (
    <button
      onClick={onClick}
      className={twMerge(
        `w-full p-4 text-sm font-medium text-center border-b border-neutral-600 ${typeStyle} ${className}`
      )}
    >
      {label}
    </button>
  );
};

export default memo(Item);
