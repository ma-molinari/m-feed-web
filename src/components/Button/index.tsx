interface Props {
  label: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

const Button = ({ label, type = "button", onClick }: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="text-white bg-blue-600 rounded hover:bg-blue-700 h-11"
    >
      {label}
    </button>
  );
};

export default Button;
