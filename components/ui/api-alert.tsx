"use client";

import { FC } from "react";
import { CopyIcon, ServerIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const badgeTextMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const badgeVariantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> =
  {
    public: "secondary",
    admin: "destructive",
  };

export const ApiAlert: FC<ApiAlertProps> = ({
  title,
  description,
  variant,
}) => {
  const onCopy = () => {
    window.navigator.clipboard.writeText(description);
    toast.success("API Route copied to clipboard.");
  };

  return (
    <Alert>
      <ServerIcon size={16} />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={badgeVariantMap[variant]}>
          {badgeTextMap[variant]}
        </Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button variant="outline" size="icon">
          <CopyIcon size={16} onClick={onCopy} />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
