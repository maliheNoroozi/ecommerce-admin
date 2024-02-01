"use client";

import { FC, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  CopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";
import { CategoryColumn } from "@/components/categories/categories-table-columns";

interface ActionColumnProps {
  category: CategoryColumn;
}

export const CategoryActionColumn: FC<ActionColumnProps> = ({ category }) => {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onCopy = () => {
    window.navigator.clipboard.writeText(category.id);
    toast.success("Category ID copied to clipboard.");
  };

  const onUpdate = () => {
    router.push(`/${params.storeId}/categories/${category.id}`);
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/${params.storeId}/categories/${category.id}`);
      router.refresh();
      toast.success("Store deleted successfully.");
    } catch (error) {
      toast.error(
        "Make sure you removed all categories using the category first."
      );
    } finally {
      setIsLoading(false);
      setIsOpen(false);
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontalIcon size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onCopy}>
            <CopyIcon size={16} className="mr-2" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onUpdate}>
            <EditIcon size={16} className="mr-2" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            <TrashIcon size={16} className="mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
