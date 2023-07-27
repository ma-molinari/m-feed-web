import { twMerge } from "tailwind-merge";

interface Props {
  label: string;
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
}

const Button = ({ label, type = "button", className, onClick }: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={twMerge(
        `text-white bg-blue-600 rounded hover:bg-blue-700 h-11 ${className}`
      )}
    >
      {label}
    </button>
  );
};

export default Button;
