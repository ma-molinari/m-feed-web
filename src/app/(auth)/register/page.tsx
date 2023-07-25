"use client";

import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "@global-components/Button";
import TextField from "@global-components/TextField";
import { useRegister } from "@services/auth";

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

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
  });

  const { mutate } = useRegister();

  const onSubmit: SubmitHandler<IRegisterSchema> = (data) => {
    mutate(data);
  };

  return (
    <main className="flex items-center justify-center w-full h-full p-4 text-black">
      <div className="w-[450px]">
        <h3 className="text-lg font-bold">Sign Up.</h3>
        <h1 className="mt-3 text-2xl font-extrabold">Welcome to M-Feed</h1>
        <p className="text-stone-600">Let's get create an account.</p>
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
        <p className="mt-8 text-stone-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-600 underline hover:text-blue-700"
          >
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
