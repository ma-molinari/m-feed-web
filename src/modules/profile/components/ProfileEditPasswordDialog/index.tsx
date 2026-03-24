import { ReactNode, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@global-components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@global-components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@global-components/ui/form";
import { Input } from "@global-components/ui/input";
import { Separator } from "@global-components/ui/separator";
import { useUpdatePassword } from "@services/users";

const UpdatePasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: `Password must be at least 6 characters` }),
  newPassword: z
    .string()
    .min(6, { message: `New Password must be at least 6 characters` }),
});
type IUpdatePasswordSchema = z.infer<typeof UpdatePasswordSchema>;

interface Props {
  children: ReactNode;
}

const ProfileEditPasswordDialog = ({ children }: Props) => {
  const dialogTriggerRef = useRef<HTMLButtonElement>(null);

  const form = useForm<IUpdatePasswordSchema>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      password: ``,
      newPassword: ``,
    },
  });

  const onOpenChange = (open?: boolean) => {
    if (!open) return;

    form.reset({
      password: ``,
      newPassword: ``,
    });
  };

  const { mutateAsync: onUpdatePass } = useUpdatePassword({
    onSuccess: () => dialogTriggerRef?.current?.click(),
  });

  const onSubmit: SubmitHandler<IUpdatePasswordSchema> = async (data) => {
    await onUpdatePass(data);
  };

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger ref={dialogTriggerRef} asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit password</DialogTitle>
          <DialogDescription>
            Update your password. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Separator className="my-4" />
        <Form {...form}>
          <form
            className="grid space-y-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator className="mt-4" />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">
                    New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="new password"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator className="mt-4" />
            <div className="ml-auto">
              <Button type="submit">Save changes</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditPasswordDialog;
