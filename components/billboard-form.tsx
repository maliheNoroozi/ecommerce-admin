"use client";

import { z } from "zod";
import axios from "axios";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { TrashIcon } from "lucide-react";
import { Billboard } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Heading } from "@/components/ui/heading";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { ImageUpload } from "@/components/ui/image-upload";

const FormScheme = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

type FormProps = z.infer<typeof FormScheme>;

interface BillboardFormProps {
  billboard: Billboard | null;
}

export const BillboardForm: FC<BillboardFormProps> = ({ billboard }) => {
  const router = useRouter();
  const params = useParams();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<FormProps>({
    resolver: zodResolver(FormScheme),
    defaultValues: {
      label: billboard?.label || "",
      imageUrl: billboard?.imageUrl || "",
    },
  });

  const title = billboard ? "Edit billboard" : "Create billboard";
  const description = billboard ? "Edit a billboard" : "Add a new billboard";
  const toastMessage = billboard
    ? "Billboard updated successfully."
    : "Billboard created successfully.";
  const action = billboard ? "Save changes" : "Create";

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/stores/${params.storeId}/billboards/${params.billboardId}`
      );
      router.refresh(); // TODO, question
      toast.success("Store deleted successfully.");
    } catch (error) {
      toast.error(
        "Make sure you removed all categories using the billboard first."
      );
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  const onSubmit = async (data: FormProps) => {
    try {
      setLoading(true);
      if (billboard) {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, data);
      }
      router.refresh(); //TODO
      router.push(`/${params.storeId}/billboards`); // TODO, question
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onConfirm={onDelete}
        onClose={() => setIsOpen(false)}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {billboard && (
          <Button
            size="icon"
            variant="destructive"
            disabled={loading}
            onClick={() => setIsOpen(true)}
          >
            <TrashIcon size={20} />
          </Button>
        )}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            name="imageUrl"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    imageUrls={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onDelete={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              name="label"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Billboard label"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={loading} className="ml-auto">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
