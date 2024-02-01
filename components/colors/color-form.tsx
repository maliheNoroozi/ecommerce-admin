"use client";

import { z } from "zod";
import axios from "axios";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { TrashIcon } from "lucide-react";
import { Color } from "@prisma/client";
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

const FormScheme = z.object({
  name: z.string().min(1),
  value: z
    .string()
    .min(4)
    .regex(/^#/, { message: "String must be a valid hex color" }),
});

type FormProps = z.infer<typeof FormScheme>;

interface ColorFormProps {
  color: Color | null;
}

export const ColorForm: FC<ColorFormProps> = ({ color }) => {
  const router = useRouter();
  const params = useParams();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormProps>({
    resolver: zodResolver(FormScheme),
    defaultValues: {
      name: color?.name || "",
      value: color?.value || "",
    },
  });

  const title = color ? "Edit color" : "Create color";
  const description = color ? "Edit a color" : "Add a new color";
  const toastMessage = color
    ? "Color updated successfully."
    : "Color created successfully.";
  const action = color ? "Save changes" : "Create";

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
      router.refresh(); // TODO
      router.push(`/${params.storeId}/colors`);
      toast.success("Color deleted successfully.");
    } catch (error) {
      toast.error("Make sure you removed all products using this color first.");
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const onSubmit = async (data: FormProps) => {
    try {
      setIsLoading(true);
      if (color) {
        await axios.patch(
          `/api/${params.storeId}/colors/${params.colorId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/colors`, data);
      }
      router.refresh(); //TODO
      router.push(`/${params.storeId}/colors`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onConfirm={onDelete}
        onClose={() => setIsOpen(false)}
        isLoading={isLoading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {color && (
          <Button
            color="icon"
            variant="destructive"
            disabled={isLoading}
            onClick={() => setIsOpen(true)}
          >
            <TrashIcon size={20} />
          </Button>
        )}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Color name"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="value"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        {...field}
                        placeholder="Color value"
                        disabled={isLoading}
                      />
                      <div
                        className="p-4 rounded-full border"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isLoading} className="ml-auto">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
