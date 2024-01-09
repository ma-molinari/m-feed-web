import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex h-screen overflow-hidden bg-white light">
      <div className="w-3/5 bg-[url('/assets/auth/background.jpg')] bg-cover bg-center">
        <div className="w-full h-full p-8 backdrop-brightness-75">
          <p className="text-4xl font-extrabold tracking-wider text-white">
            M-FEED
          </p>
          <div className="flex flex-col justify-end w-full h-full">
            <p className="text-3xl font-semibold leading-10 tracking-wide text-white mb-36">
              Join us, share your memories.
              <br /> See, like and comment.
              <br /> Eternize the little things in life with us.
            </p>
          </div>
        </div>
      </div>
      <div className="w-2/5 h-full">{children}</div>
    </section>
  );
};

export default AuthLayout;
