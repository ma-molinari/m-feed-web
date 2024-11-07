import { MouseEvent, useRef } from "react";
import Image from "next/image";
import { ArrowUpFromLine } from "lucide-react";
import { Button } from "@global-components/ui/button";
import { cn } from "libs/utils";

interface Props {
  file?: File;
  className?: string;
  type?: "create" | "edit";
  imageURL?: string;
  onFileChange: (file: File) => void;
}

const UploadFile = ({
  file,
  className,
  type = "create",
  imageURL = "",
  onFileChange,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFilesList = (
    event: MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    if (type === "edit") return;

    event.stopPropagation();
    fileInputRef.current?.click();
  };

  return (
    <div
      className={cn(
        `border rounded-md shadow-sm bg-zinc-900 flex flex-col items-center justify-center w-full h-[450px] cursor-pointer`,
        className
      )}
      onClick={openFilesList}
    >
      {file || imageURL ? (
        <Image
          src={file ? URL.createObjectURL(file) : imageURL}
          alt={`Image uploaded`}
          height={250}
          width={250}
          draggable={false}
          priority
          style={{
            maxWidth: "250px",
            maxHeight: "250px",
            objectFit: "contain",
          }}
        />
      ) : (
        <ArrowUpFromLine strokeWidth={1.5} color="#ffffff" size={32} />
      )}
      <p className="mt-4">
        {file
          ? `Click here to upload a new file.`
          : `Click here to upload your file.`}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">PNG, JPEG (Max 5 MB)</p>
      <input
        ref={fileInputRef}
        type="file"
        id="post-image"
        name="post-image"
        accept="image/png, image/jpeg"
        onChange={(event) => {
          if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            onFileChange(file);
          }
        }}
        className="hidden"
      />
      <Button
        className="mt-4 w-[100px]"
        disabled={type === "edit"}
        onClick={openFilesList}
      >
        Choose
      </Button>
    </div>
  );
};

export default UploadFile;
