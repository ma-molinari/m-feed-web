"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Button from "@global-components/Button";
import TextField from "@global-components/TextField";
import { useLogin, useRegister } from "@services/auth";
import useAuth, { selectSetAuth } from "@global-stores/useAuth";

const RegisterSchema = z
  .object({
    fullName: z.string().min(1, { message: "Full Name is required" }),
    username: z.string().min(1, { message: "Username is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });
type IRegisterSchema = z.infer<typeof RegisterSchema>;

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
  });

  const { push } = useRouter();
  const setAuth = useAuth(selectSetAuth);

  const { mutate: mutateLogin } = useLogin({
    onSuccess: (data) => {
      setAuth(data);
      push("/");
    },
  });

  const { mutate } = useRegister({
    onSuccess: () => {
      mutateLogin({
        email: getValues("email"),
        password: getValues("password"),
      });
    },
  });

  const onSubmit: SubmitHandler<IRegisterSchema> = (data) => {
    mutate(data);
  };

  return (
    <form
      className="flex flex-col w-full mt-8 space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        name="fullName"
        placeholder="Full Name"
        register={register}
        message={errors.fullName?.message}
      />
      <TextField
        name="username"
        placeholder="Username"
        register={register}
        message={errors.username?.message}
      />
      <TextField
        name="email"
        placeholder="E-mail"
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
      <TextField
        name="confirmPassword"
        placeholder="Confirm Password"
        type="password"
        register={register}
        message={errors.confirmPassword?.message}
      />
      <Button label="Sign Up" type="submit" />
    </form>
  );
};

export default RegisterForm;
