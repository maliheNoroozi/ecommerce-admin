"use client";

import { FC } from "react";
import { useParams } from "next/navigation";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

export const ApiList: FC<ApiListProps> = ({ entityName, entityIdName }) => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert
        variant="public"
        title="GET"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        variant="public"
        title="GET"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        variant="admin"
        title="POST"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        variant="admin"
        title="PATCH"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        variant="admin"
        title="DELETE"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </>
  );
};
