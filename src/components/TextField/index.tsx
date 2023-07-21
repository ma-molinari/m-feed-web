import { ChangeEventHandler, FocusEventHandler } from "react";

interface Props {
  placeholder: string;
  type?: "text" | "password";
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

const TextField = ({ placeholder, type = "text", onChange, onBlur }: Props) => {
  return (
    <input
      className="w-full border-2 border-gray-200 border-solid rounded h-14 indent-4 focus-visible:border-blue-600"
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default TextField;
