"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@global-components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@global-components/ui/form";
import { Input } from "@global-components/ui/input";

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
  const form = useForm<ILoginSchema>({
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
    <Form {...form}>
      <form
        className="flex flex-col w-full space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormLabel>E-mail or Username</FormLabel>
              <FormControl>
                <Input placeholder="E-mail or Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default LoginForm;
