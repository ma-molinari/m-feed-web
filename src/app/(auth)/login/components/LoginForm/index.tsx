"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import Button from "@global-components/Button";
import TextField from "@global-components/TextField";
import { useLogin } from "@services/auth";
import useAuth, { selectSetAuth } from "@global-stores/useAuth";

const LoginSchema = z.object({
  email: z.string().min(1, { message: "Email or Username is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});
type ILoginSchema = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const { push } = useRouter();
  const setAuth = useAuth(selectSetAuth);

  const { mutate } = useLogin({
    onSuccess: (data) => {
      setAuth(data);
      push("/");
    },
  });

  const onSubmit: SubmitHandler<ILoginSchema> = (data) => {
    mutate(data);
  };

  return (
    <form
      className="flex flex-col w-full mt-8 space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        name="email"
        placeholder="E-mail or Username"
        register={register}
        message={errors.email?.message}
      />
      <TextField
        name="password"
        placeholder="Password"
        type="password"
        register={register}
        message={errors.password?.message}
      />
      <Button label="Log in" type="submit" />
    </form>
  );
};

export default LoginForm;
