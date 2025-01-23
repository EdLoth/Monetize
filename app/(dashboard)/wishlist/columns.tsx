"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

import { InferResponseType } from "hono";
import { client } from "@/lib/hono";
import { Actions } from "./actions";
import { convertAmountFromMiliunits, formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export type ResponseType = InferResponseType<
  typeof client.api.wishlist.$get,
  200
>["data"][0];

export const columns: ColumnDef<ResponseType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      return (
        <span className="text-xs font-medium px-3.5 py-2.5">
          {formatCurrency(convertAmountFromMiliunits(amount))}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      let displayValue = '';
      const getStatusVariant = (status: string): "default" | "destructive" | "outline" | "secondary" | "primary" => {
        switch (status) {
          case "not_started":
            return "default";
          case "in_progress":
            return "secondary";
          case "achieved":
            return "primary";
          case "researching":
            return "outline";
          default:
            return "default";
        }
      };

      if (status === "researching") {
        displayValue = "Researching";
      } else if (status === "in_progress") {
        displayValue = "In Progress";
      } else if (status === "achieved") {
        displayValue = "Achieved";
      } else {
        displayValue = "Not Started";
      }
    
      return (
        <Badge
          variant={getStatusVariant(status)}
          className="text-xs font-medium px-3.5 py-2.5"
        >
          {displayValue}
        </Badge>
      );
    },
  },
  {
    accessorKey: "link",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Link
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const link = row.getValue("link") as string;
      return <button onClick={() => window.open(link, "_blank")}>Link</button>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions id={row.original.id} />,
  },
];
