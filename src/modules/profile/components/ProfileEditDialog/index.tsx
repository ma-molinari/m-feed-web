import { ReactNode, useRef } from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@global-components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@global-components/ui/dialog";
import { Input } from "@global-components/ui/input";
import { Label } from "@global-components/ui/label";
import { Textarea } from "@global-components/ui/textarea";
import { Separator } from "@global-components/ui/separator";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@global-components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@global-components/ui/form";
import { useCurrentUser, useUpdate } from "@services/users";
import { IMAGE_URL } from "@configs/environment";
import { useUpload } from "@services/post";

const ProfileSchema = z.object({
  fullName: z.string().min(1, { message: "Name is required" }),
  bio: z.string().optional(),
  avatar: z.string().optional(),
  avatarSrc: z.string().optional(),
  file: z.any().optional(),
});
type IProfileSchema = z.infer<typeof ProfileSchema>;

interface Props {
  children: ReactNode;
}

const ProfileEditDialog = ({ children }: Props) => {
  const { data: me } = useCurrentUser();
  const dialogTriggerRef = useRef<HTMLButtonElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const form = useForm<IProfileSchema>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      fullName: "",
    },
  });
  const avatarSrc = form.watch("avatarSrc");

  const onOpenChange = (open?: boolean) => {
    if (!open) return;

    form.reset({
      fullName: me?.fullName,
      bio: me?.bio,
      avatar: me?.avatar,
      avatarSrc: me?.avatar ? `${IMAGE_URL}/${me?.avatar}` : "",
      file: undefined,
    });
  };

  const { mutateAsync: onUpload } = useUpload();
  const { mutate: onUpdate } = useUpdate({
    onSuccess: () => dialogTriggerRef?.current?.click(),
  });

  const onSubmit: SubmitHandler<IProfileSchema> = async (data) => {
    const payload = {
      fullName: data.fullName,
      bio: data.bio,
      avatar: data.avatar,
    };

    if (data.file) {
      const form = new FormData();
      form.append("file", data.file);
      const file = await onUpload(form);
      payload.avatar = file.filename;
    }

    onUpdate(payload);
  };

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger ref={dialogTriggerRef} asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
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
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator className="mt-4" />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Bio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator className="mt-4" />
            <div className="">
              <Label htmlFor="username" className="text-muted-foreground">
                Avatar
              </Label>
              <div className="flex items-center gap-4 mt-2">
                <Avatar className="w-[100px] h-[100px]">
                  <AvatarImage
                    src={avatarSrc}
                    alt={me?.username}
                    height={100}
                    width={100}
                  />
                  <AvatarFallback>{me?.fullName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    inputFileRef?.current?.click();
                  }}
                >
                  Click to replace
                </Button>
                <input
                  ref={inputFileRef}
                  type="file"
                  className="hidden"
                  onChange={(event) => {
                    if (event.target.files && event.target.files[0]) {
                      const file = event.target.files[0];
                      form.setValue("avatarSrc", URL.createObjectURL(file));
                      form.setValue("file", file);
                    }
                  }}
                />
              </div>
            </div>
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

export default ProfileEditDialog;
