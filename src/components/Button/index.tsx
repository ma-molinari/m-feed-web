interface Props {
  label: string;
  onClick: () => void;
}

const Button = ({ label, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="text-white bg-blue-600 rounded hover:bg-blue-700 h-11"
    >
      {label}
    </button>
  );
};

export default Button;
