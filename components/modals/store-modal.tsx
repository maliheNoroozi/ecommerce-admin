"use client";

import { z } from "zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Store } from "@prisma/client";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FormScheme = z.object({
  name: z.string().min(1).max(30),
});

type FormProps = z.infer<typeof FormScheme>;

export const StoreModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isOpen = useStoreModal((state) => state.isOpen);
  const onClose = useStoreModal((state) => state.onClose);

  const form = useForm<FormProps>({
    resolver: zodResolver(FormScheme),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: FormProps) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/stores", data);
      const store: Store = response.data;
      window.location.assign(`/${store.id}`); // TODO, question
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      onClose();
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories."
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6 py-2">
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
            <div className="flex justify-end items-center gap-2">
              <Button variant="outline" disabled={isLoading} onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                Continue
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
