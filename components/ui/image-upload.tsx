"use client";

import { FC, useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TrashIcon, UploadIcon } from "lucide-react";

interface ImageUploadProps {
  disabled: boolean;
  onChange: (url: string) => void;
  onDelete: (url: string) => void;
  imageUrls: string[];
}

export const ImageUpload: FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onDelete,
  imageUrls,
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (value: any) => {
    onChange(value.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        {imageUrls.map((imageUrl) => (
          <div
            key={imageUrl}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <Image src={imageUrl} alt="Image" fill className="object-cover" />
            <Button
              variant="destructive"
              size="icon"
              className="z-10 absolute top-2 right-2"
              onClick={() => onDelete(imageUrl)}
            >
              <TrashIcon size={16} />
            </Button>
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="zl6pu7zr" onUpload={onUpload}>
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              variant="secondary"
              disabled={disabled}
              onClick={onClick}
            >
              <UploadIcon size={16} className="mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
