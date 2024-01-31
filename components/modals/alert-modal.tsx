"use client";

import { FC, useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "../ui/button";
import { boolean } from "zod";

interface AlertModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  isLoading: boolean;
}

export const AlertModal: FC<AlertModalProps> = ({
  isOpen,
  onConfirm,
  onClose,
  isLoading,
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Are you sure"
      description="This action can not be undone."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end">
        <Button variant="outline" disabled={isLoading} onClick={onClose}>
          Cancel
        </Button>
        <Button variant="destructive" disabled={isLoading} onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};
