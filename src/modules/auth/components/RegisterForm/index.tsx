"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
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
  const form = useForm<IRegisterSchema>({
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
        email: form.getValues("email"),
        password: form.getValues("password"),
      });
    },
  });

  const onSubmit: SubmitHandler<IRegisterSchema> = (data) => {
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
          name="fullName"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="E-mail" {...field} />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  {...field}
                />
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

export default RegisterForm;
