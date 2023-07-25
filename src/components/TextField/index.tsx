import { UseFormRegister } from "react-hook-form";

interface Props {
  name: string;
  placeholder: string;
  type?: "text" | "password";
  message?: string;
  register: UseFormRegister<any>;
}

const TextField = ({
  name,
  placeholder,
  type = "text",
  message,
  register,
}: Props) => {
  return (
    <div>
      <input
        className="w-full border-2 border-gray-200 border-solid rounded h-14 indent-4 focus-visible:border-blue-600"
        placeholder={placeholder}
        type={type}
        {...register?.(name)}
      />
      {message && (
        <div className="mt-1 ml-1">
          <span className="text-sm text-red-600">{message}</span>
        </div>
      )}
    </div>
  );
};

export default TextField;
