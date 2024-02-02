"use client";

import { z } from "zod";
import axios from "axios";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { TrashIcon } from "lucide-react";
import { Store } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";

interface SettingsFormProps {
  store: Store;
}

const FormScheme = z.object({
  name: z.string().min(1),
});

type FormProps = z.infer<typeof FormScheme>;

export const SettingsForm: FC<SettingsFormProps> = ({ store }) => {
  const router = useRouter();
  const origin = useOrigin();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormProps>({
    resolver: zodResolver(FormScheme),
    defaultValues: {
      name: store.name,
    },
  });

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/stores/${store.id}`);
      router.refresh();
      toast.success("Store deleted successfully.");
    } catch (error) {
      toast.error("Make sure you removed products and categories first.");
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const onSubmit = async (data: FormProps) => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/stores/${store.id}`, data);
      router.refresh();
      toast.success("Store updated successfully.");
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
        <Heading title="Settings" description="Manage store preferences" />
        <Button
          size="icon"
          variant="destructive"
          disabled={isLoading}
          onClick={() => setIsOpen(true)}
        >
          <TrashIcon size={20} />
        </Button>
      </div>
      <Separator />
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
                      placeholder="E-Commerce"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isLoading} className="ml-auto">
            Save changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${store.id}`}
        variant="admin"
      />
    </>
  );
};
