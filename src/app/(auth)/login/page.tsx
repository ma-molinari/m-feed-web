"use client";

import Link from "next/link";

import Button from "@global-components/Button";
import TextField from "@global-components/TextField";

const Login = () => {
  return (
    <main className="flex items-center justify-center w-full h-full p-4 text-black">
      <div className="w-[450px]">
        <h3 className="text-lg font-bold">Log in.</h3>
        <h1 className="mt-3 text-2xl font-extrabold">Welcome back to M-Feed</h1>
        <p className="text-stone-600">
          Enter your credentials to access your account.
        </p>

        <form className="flex flex-col w-full mt-8 space-y-6">
          <TextField placeholder="E-mail" />
          <TextField placeholder="Password" type="password" />
          <Button label="Continue" onClick={() => false} />
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
