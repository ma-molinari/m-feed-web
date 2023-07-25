import Link from "next/link";

import RegisterForm from "./components/RegisterForm";

export const metadata = {
  title: "Register - M-Feed",
  description: "Let's get create an account",
};

const Register = () => {
  return (
    <main className="flex items-center justify-center w-full h-full p-4 text-black">
      <div className="w-[450px]">
        <h3 className="text-lg font-bold">Sign Up.</h3>
        <h1 className="mt-3 text-2xl font-extrabold">Welcome to M-Feed</h1>
        <p className="text-stone-600">Let's get create an account.</p>
        <RegisterForm />
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
