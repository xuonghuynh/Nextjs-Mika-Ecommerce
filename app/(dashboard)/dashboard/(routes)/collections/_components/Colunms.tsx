"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from "lucide-react";


import { Collection } from "@prisma/client";
import AlertRemoveCollection from "@/app/(dashboard)/dashboard/(routes)/collections/_components/AlertRemoveCollection";
import RowAction from "@/app/(dashboard)/dashboard/(routes)/collections/_components/RowAction";

export const columns: ColumnDef<Collection>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    className="p-0 hover:bg-transparent"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "products",
        header: ({ column }) => {
            return (
                <Button
                    className="p-0 hover:bg-transparent"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Products
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const allProducts: any[] = row.getValue("products");
            return <div>{allProducts.length}</div>;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const { id } = row.original;
            return <RowAction id={id} />
        },
    },
];
