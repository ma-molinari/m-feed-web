"use client";

import Link from "next/link";
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

const Login = () => {
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
    <main className="flex items-center justify-center w-full h-full p-4 text-black">
      <div className="w-[450px]">
        <h3 className="text-lg font-bold">Log in.</h3>
        <h1 className="mt-3 text-2xl font-extrabold">Welcome back to M-Feed</h1>
        <p className="text-stone-600">
          Enter your credentials to access your account.
        </p>
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
        <p className="mt-8 text-stone-600">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-blue-600 underline hover:text-blue-700"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
