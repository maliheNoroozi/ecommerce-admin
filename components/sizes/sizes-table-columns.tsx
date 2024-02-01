"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SizeActionColumn } from "@/components/sizes/sizes-table-action-column";

export type SizeColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <SizeActionColumn size={row.original} />;
    },
  },
];
