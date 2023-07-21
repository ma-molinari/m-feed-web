"use client";

import Link from "next/link";

import Button from "@global-components/Button";
import TextField from "@global-components/TextField";

const Register = () => {
  return (
    <main className="flex items-center justify-center w-full h-full p-4 text-black">
      <div className="w-[450px]">
        <h3 className="text-lg font-bold">Sign Up.</h3>
        <h1 className="mt-3 text-2xl font-extrabold">Welcome to M-Feed</h1>
        <p className="text-stone-600">Let's get create an account.</p>
        <form
          className="flex flex-col w-full mt-8 space-y-6"
          onSubmit={() => false}
        >
          <TextField placeholder="Nome Completo" />
          <TextField placeholder="Nickname" />
          <TextField placeholder="E-mail" />
          <TextField placeholder="Password" type="password" />
          <Button label="Sign Up" onClick={() => false} />
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
