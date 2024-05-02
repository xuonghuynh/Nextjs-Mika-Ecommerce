"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ImageIcon, MoreHorizontal, Pencil, Trash } from "lucide-react";


import { Collection } from "@prisma/client";
import AlertRemoveCollection from "@/app/(dashboard)/dashboard/(routes)/collections/_components/AlertRemoveCollection";
import RowAction from "@/app/(dashboard)/dashboard/(routes)/collections/_components/RowAction";
import Image from "next/image";
import TableTitle from "@/components/TableTitle";

type CollumnsProps = Collection[];

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
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-x-5">
                    {row.original.image ? (
                        <div className="flex h-10 w-10 items-center justify-center">
                            <Image
                                src={row.original.image}
                                alt={row.original.name}
                                width={50}
                                height={50}
                            />
                        </div>
                    ) : (
                        <div className="flex h-10 w-10 items-center justify-center">
                            <ImageIcon className="h-5 w-5" />
                        </div>
                    )}

                    <TableTitle
                        name={row.original.name}
                        href={`/dashboard/collections/${row.original.id}`}
                    />
                </div>
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
