"use client";

import { Button as ShadButton } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ImageIcon } from "lucide-react";

import { Collection, Product, ProductImage } from "@prisma/client";
import Image from "next/image";
import TableTitle from "@/components/TableTitle";
import ProductRowActions from "@/app/(dashboard)/dashboard/(routes)/products/_components/ProductRowActions";
import { formatPrice } from "@/ultils/formats";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type CollumnsProps = Product & {
    images: ProductImage[];
    collections: Collection[];
};

export const ProductColumns: ColumnDef<CollumnsProps>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <ShadButton
                    className="p-0 hover:bg-transparent"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </ShadButton>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-x-5">
                    {row.original.images.length > 0 ? (
                        <div className="flex h-10 w-10 items-center justify-center">
                            <Image
                                src={row.original.images[0].imageUrl}
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
                        href={`/dashboard/products/${row.original.id}`}
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <ShadButton
                    className="p-0 hover:bg-transparent"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </ShadButton>
            );
        },
        cell: ({ row }) => {
            return <div>{formatPrice(row.original.price)}</div>;
        },
    },
    {
        accessorKey: "stock",
        header: ({ column }) => {
            return (
                <ShadButton
                    className="p-0 hover:bg-transparent"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Stock
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </ShadButton>
            );
        },
        cell: ({ row }) => {
            const stock = row.original.stock || 0;
            return (
                <div>
                    {stock > 0 ? <div>{stock} in stock</div> : <div className="text-red-500">Out of stock</div>}
                </div>
            )
        },
    },
    {
        accessorKey: "isPublished",
        header: ({ column }) => {
            return (
                <ShadButton
                    className="p-0 hover:bg-transparent"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Published
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </ShadButton>
            );
        },
        cell: ({ row }) => {
            const isPublished = row.getValue("isPublished") || false;
            return (
                <Badge
                    className={cn("bg-slate-500", isPublished && "bg-sky-700")}
                >
                    {isPublished ? "Published" : "Draft"}
                </Badge>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const { id } = row.original;
            return <ProductRowActions id={id} />;
        },
    },
];
