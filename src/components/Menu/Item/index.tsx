import { twMerge } from "tailwind-merge";

interface Props {
  label: string;
  type?: "default" | "danger";
  className?: string;
  onClick: () => void;
}

const DEFAULT_STYLE = "text-neutral-100";
const DANGER_STYLE = "text-red-400";

const Item = ({ label, type = "default", className = ``, onClick }: Props) => {
  const typeStyle = type === "danger" ? DANGER_STYLE : DEFAULT_STYLE;

  return (
    <button
      onClick={onClick}
      className={twMerge(
        `w-full p-4 text-sm border-b font-medium border-input ${typeStyle} ${className}`
      )}
    >
      <span>{label}</span>
    </button>
  );
};

export default Item;
