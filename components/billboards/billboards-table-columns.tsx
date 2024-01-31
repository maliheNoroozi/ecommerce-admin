"use client";

import { ColumnDef } from "@tanstack/react-table";
import { BillboardActionColumn } from "@/components/billboards/billboards-table-action-column";

export type BillboardColumn = {
  id: string;
  label: string;
  createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <BillboardActionColumn billboard={row.original} />;
    },
  },
];
